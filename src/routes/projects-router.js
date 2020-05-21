const path = require('path');
const express = require('express');
const xss = require('xss');
const AppService = require('../AppService');
const auth = require('../middleware/auth');

const projectsRouter = express.Router();
const jsonParser = express.json();

const serializeProject = (project) => ({
	projectId: project.id,
	startDate: xss(project.start_date),
	dueDate: xss(project.due_date),
	projectName: xss(project.project_name),
	projectRepo: xss(project.project_repo),
	completed: xss(project.completed),
	createdBy: xss(project.created_by),
	description: xss(project.description),
});

projectsRouter
	.route('/')
	//@route   GET api/projects
	//@desc    Get all projects
	//@access  private
	.get(auth, (req, res, next) => {
		const knexInstance = req.app.get('db');
		AppService.getAllItems(knexInstance, 'projects')
			.then((projects) => {
				res.json(projects.map(serializeProject));
			})
			.catch(next);
	})
	//@route   POST api/projects
	//@desc    Create new project
	//@access  private
	.post(auth, jsonParser, (req, res, next) => {
		const {
			startDate,
			dueDate,
			projectName,
			projectRepo,
			completed,
			createdBy,
			description,
		} = req.body;

		const newProject = {
			due_date: dueDate,
			project_name: projectName,
			created_by: createdBy,
		};

		for (const [key, value] of Object.entries(newProject)) {
			if (value == null) {
				return res.status(400).json({
					error: { message: `Missing '${key}' in request body` },
				});
			}
		}

		newProject.start_date = startDate;
		newProject.project_repo = projectRepo;
		newProject.completed = completed;
		newProject.description = description;

		AppService.insertItem(req.app.get('db'), 'projects', newProject)
			.then((project) => {
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${project.id}`))
					.json(serializeProject(project));
			})
			.catch(next);
	});

projectsRouter
	.route('/:project_id')
	.all((req, res, next) => {
		AppService.getById(req.app.get('db'), 'projects', req.params.project_id)
			.then((project) => {
				if (!project) {
					return res.status(404).json({
						error: { message: "Project doesn't exist" },
					});
				}
				res.project = project;
				next();
			})
			.catch(next);
	})
	//@route   GET api/projects/project_id
	//@desc    Get project Info
	//@access  private
	.get(auth, (req, res, next) => {
		res.json(serializeProject(res.project));
	})
	//@route   DELETE api/projects/project_id
	//@desc    DELETE project
	//@access  private
	.delete(auth, (req, res, next) => {
		AppService.deleteItem(req.app.get('db'), 'projects', req.params.project_id)
			.then((numRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	})
	//@route   PATCH api/projects/project_id
	//@desc    Update project Info
	//@access  private
	.patch(auth, jsonParser, (req, res, next) => {
		const {
			startDate,
			dueDate,
			projectName,
			projectRepo,
			completed,
			createdBy,
			description,
		} = req.body;

		const projectToUpdate = {
			start_date: startDate,
			due_date: dueDate,
			project_name: projectName,
			project_repo: projectRepo,
			created_by: createdBy,
			completed,
			description,
		};

		const numberOfValues = Object.values(projectToUpdate).filter(Boolean)
			.length;
		if (numberOfValues === 0)
			return res.status(400).json({
				error: {
					message:
						"Request body must contain either 'start-date', 'due-date', 'project name', 'project repo', or 'project description'",
				},
			});

		AppService.updateItem(
			req.app.get('db'),
			'projects',
			req.params.project_id,
			projectToUpdate
		)
			.then((numRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	});

module.exports = projectsRouter;
