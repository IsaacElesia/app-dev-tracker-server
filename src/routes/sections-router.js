const path = require('path');
const express = require('express');
const xss = require('xss');
const AppService = require('../AppService');
const auth = require('../middleware/auth');

const sectionsRouter = express.Router();
const jsonParser = express.json();

const serializeSection = (section) => ({
	sectionId: section.id,
	projectId: section.project_id,
	sectionName: xss(section.section_name),
	startDate: xss(section.start_date),
	dueDate: xss(section.due_date),
	description: xss(section.description),
	imgUrl: xss(section.img_url),
	completed: section.completed,
	createdBy: section.created_by,
});

sectionsRouter
	.route('/')
	//@route   GET api/sections
	//@desc    Get all sections
	//@access  private
	.get(auth, (req, res, next) => {
		const knexInstance = req.app.get('db');
		const { id } = req.user;

		AppService.sectionsInProject(knexInstance, id)
			.then((sections) => {
				res.json(sections.map(serializeSection));
			})
			.catch(next);
	})
	//@route   POST api/sections
	//@desc    Create new section
	//@access  private
	.post(auth, jsonParser, (req, res, next) => {
		const {
			projectId,
			sectionName,
			startDate,
			dueDate,
			description,
			imgUrl,
			completed,
			createdBy,
		} = req.body;

		const newsection = {
			due_date: dueDate,
			section_name: sectionName,
			created_by: createdBy,
			project_id: projectId,
		};

		for (const [key, value] of Object.entries(newsection)) {
			if (value == null) {
				return res.status(400).json({
					error: { message: `Missing '${key}' in request body` },
				});
			}
		}

		newsection.start_date = startDate;
		newsection.img_url = imgUrl;
		newsection.completed = completed;
		newsection.description = description;

		AppService.insertItem(req.app.get('db'), 'section', newsection)
			.then((section) => {
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${section.id}`))
					.json(serializeSection(section));
			})
			.catch(next);
	});

sectionsRouter
	.route('/:section_id')
	.all((req, res, next) => {
		AppService.getById(req.app.get('db'), 'section', req.params.section_id)
			.then((section) => {
				if (!section) {
					return res.status(404).json({
						error: { message: "Section doesn't exist" },
					});
				}
				res.section = section;
				next();
			})
			.catch(next);
	})
	//@route   GET api/sections/section_id
	//@desc    Get section Info
	//@access  private
	.get(auth, (req, res, next) => {
		res.json(serializeSection(res.section));
	})
	//@route   DELETE api/sections/section_id
	//@desc    DELETE section
	//@access  private
	.delete(auth, (req, res, next) => {
		AppService.deleteItem(req.app.get('db'), 'section', req.params.section_id)
			.then((numRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	})
	//@route   PATCH api/sections/section_id
	//@desc    Update section Info
	//@access  private
	.patch(auth, jsonParser, (req, res, next) => {
		const {
			projectId,
			sectionName,
			startDate,
			dueDate,
			description,
			imgUrl,
			completed,
			createdBy,
		} = req.body;

		const sectionToUpdate = {
			due_date: dueDate,
			section_name: sectionName,
			created_by: createdBy,
			project_id: projectId,
			start_date: startDate,
			img_url: imgUrl,
			completed,
			description,
		};

		const numberOfValues = Object.values(sectionToUpdate).filter(Boolean)
			.length;
		if (numberOfValues === 0 && Object.keys(req.body).length !== 1)
			return res.status(400).json({
				error: {
					message:
						"Request body must contain either 'start-date', 'due-date', 'section name', 'image url', or 'section description'",
				},
			});

		AppService.updateItem(
			req.app.get('db'),
			'section',
			req.params.section_id,
			sectionToUpdate
		)
			.then((numRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	});

module.exports = sectionsRouter;
