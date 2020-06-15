const path = require('path');
const express = require('express');
const AppService = require('../AppService');
const auth = require('../middleware/auth');

const taskTeamRouter = express.Router();
const jsonParser = express.json();

const serializeTaskTeamMember = (taskTeam) => ({
	taskTeamId: taskTeam.id,
	taskId: taskTeam.task_id,
	sectionId: taskTeam.section_id,
	name: taskTeam.full_name,
	email: taskTeam.email,
	avatar: taskTeam.avatar_url,
});

taskTeamRouter
	.route('/')
	//@route   GET api/task/team
	//@desc    Get all task team members
	//@access  private
	.get(auth, (req, res, next) => {
		const taskId = req.query.taskid;
		const knexInstance = req.app.get('db');
		AppService.taskTeamMembers(knexInstance, taskId)
			.then((taskTeam) => {
				res.json(taskTeam.map(serializeTaskTeamMember));
			})
			.catch(next);

		/* 	AppService.getAllItems(knexInstance, 'task_team')
			.then((taskTeam) => {
				res.json(taskTeam.map(serializeTaskTeamMember));
			})
			.catch(next); */
	})
	//@route   POST api/task/team
	//@desc    Add a new task team member
	//@access  private
	.post(auth, jsonParser, (req, res, next) => {
		const { taskId, sectionId, userId } = req.body;

		const newTaskTeamMember = {
			task_id: taskId,
			section_id: sectionId,
			user_id: userId,
		};

		for (const [key, value] of Object.entries(newTaskTeamMember)) {
			if (value == null) {
				return res.status(400).json({
					error: { message: `Missing '${key}' in request body` },
				});
			}
		}

		AppService.insertItem(req.app.get('db'), 'task_team', newTaskTeamMember)
			.then((taskTeamMember) => {
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${taskTeamMember.id}`))
					.json(serializeTaskTeamMember(taskTeamMember));
			})
			.catch(next);
	});

taskTeamRouter
	.route('/:taskteam_id')
	.all((req, res, next) => {
		AppService.getById(req.app.get('db'), 'task_team', req.params.taskteam_id)
			.then((taskTeam) => {
				if (!taskTeam) {
					return res.status(404).json({
						error: { message: "Task team doesn't exist" },
					});
				}
				res.taskteam = taskTeam;
				next();
			})
			.catch(next);
	})
	//@route   GET api/task/team/secteam_id
	//@desc    Get task member
	//@access  private
	.get(auth, (req, res, next) => {
		res.json(serializeTaskTeamMember(res.taskteam));
	})
	//@route   DELETE api/task/team/secteam_id
	//@desc    DELETE task team member
	//@access  private
	.delete(auth, (req, res, next) => {
		AppService.deleteItem(
			req.app.get('db'),
			'task_team',
			req.params.taskteam_id
		)
			.then((numRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	})
	//@route   PATCH api/task/team/task_id
	//@desc    Update task team member Info
	//@access  private
	.patch(auth, jsonParser, (req, res, next) => {
		const { taskId, sectionId, userId } = req.body;

		const taskTeamMemberToUpdate = {
			task_id: taskId,
			section_id: sectionId,
			user_id: userId,
		};

		const numberOfValues = Object.values(taskTeamMemberToUpdate).filter(Boolean)
			.length;
		if (numberOfValues === 0)
			return res.status(400).json({
				error: {
					message:
						"Request body must contain either  'task id', 'section id', or 'user id'",
				},
			});

		AppService.updateItem(
			req.app.get('db'),
			'task_team',
			req.params.proteam_id,
			taskTeamMemberToUpdate
		)
			.then((numRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	});

module.exports = taskTeamRouter;
