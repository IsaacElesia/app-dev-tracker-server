const path = require('path');
const express = require('express');
const xss = require('xss');
const AppService = require('../AppService');
const auth = require('../middleware/auth');

const taskRouter = express.Router();
const jsonParser = express.json();

const serializeTask = (task) => ({
	taskId: task.id,
	createdBy: task.created_by,
	startDate: xss(task.start_date),
	dueDate: xss(task.due_date),
	completed: task.completed,
	description: xss(task.description),
	sectionId: task.section_id,
});

taskRouter
	.route('/')
	//@route   GET api/tasks
	//@desc    Get all task
	//@access  private
	.get(auth, (req, res, next) => {
		const knexInstance = req.app.get('db');
		const { id } = req.user;

		AppService.tasksInSection(knexInstance, id)
			.then((tasks) => {
				res.json(tasks.map(serializeTask));
			})
			.catch(next);
	})
	//@route   POST api/tasks
	//@desc    Create new task
	//@access  private
	.post(auth, jsonParser, (req, res, next) => {
		const {
			createdBy,
			startDate,
			dueDate,
			completed,
			description,
			sectionId,
		} = req.body;

		const newTask = {
			created_by: createdBy,
			due_date: dueDate,
			section_id: sectionId,
			description,
		};

		for (const [key, value] of Object.entries(newTask)) {
			if (value == null) {
				return res.status(400).json({
					error: { message: `Missing '${key}' in request body` },
				});
			}
		}

		newTask.start_date = startDate;
		newTask.completed = completed;

		AppService.insertItem(req.app.get('db'), 'task', newTask)
			.then((task) => {
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${task.id}`))
					.json(serializeTask(task));
			})
			.catch(next);
	});

taskRouter
	.route('/:task_id')
	.all((req, res, next) => {
		AppService.getById(req.app.get('db'), 'task', req.params.task_id)
			.then((task) => {
				if (!task) {
					return res.status(404).json({
						error: { message: "Task doesn't exist" },
					});
				}
				res.task = task;
				next();
			})
			.catch(next);
	})
	//@route   GET api/tasks/task_id
	//@desc    Get task Info
	//@access  private
	.get(auth, (req, res, next) => {
		res.json(serializeTask(res.task));
	})
	//@route   DELETE api/tasks/task_id
	//@desc    DELETE task
	//@access  private
	.delete(auth, (req, res, next) => {
		AppService.deleteItem(req.app.get('db'), 'task', req.params.task_id)
			.then((numRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	})
	//@route   PATCH api/tasks/task_id
	//@desc    Update task Info
	//@access  private
	.patch(auth, jsonParser, (req, res, next) => {
		const { startDate, dueDate, completed, description, sectionId } = req.body;
		console.log('body =', req.body);

		const taskToUpdate = {
			start_date: startDate,
			due_date: dueDate,
			section_id: sectionId,
			description,
			completed,
		};

		const numberOfValues = Object.values(taskToUpdate).filter((x) => x !== '')
			.length;
		if (numberOfValues === 0)
			return res.status(400).json({
				error: {
					message:
						"Request body must contain either 'start-date', 'due-date',  'section id', 'completed' or 'task description'",
				},
			});

		AppService.updateItem(
			req.app.get('db'),
			'task',
			req.params.task_id,
			taskToUpdate
		)
			.then((numRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	});

module.exports = taskRouter;
