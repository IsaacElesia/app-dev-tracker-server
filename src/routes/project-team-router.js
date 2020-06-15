const path = require('path');
const express = require('express');
const AppService = require('../AppService');
const auth = require('../middleware/auth');

const projectTeamRouter = express.Router();
const jsonParser = express.json();

const serializeProjectTeamMember = (projectTeam) => ({
	projectTeamId: projectTeam.id,
	projectId: projectTeam.project_id,
	name: projectTeam.full_name,
	email: projectTeam.email,
	avatar: projectTeam.avatar_url,
});

projectTeamRouter
	.route('/')
	//@route   GET api/project/team
	//@desc    Get all projects team members
	//@access  private
	.get(auth, (req, res, next) => {
		const projectId = req.query.projectid;
		const knexInstance = req.app.get('db');
		AppService.projectTeamMembers(knexInstance, projectId)
			.then((projectTeam) => {
				res.json(projectTeam.map(serializeProjectTeamMember));
			})
			.catch(next);
	})
	//@route   POST api/project/team
	//@desc    Add a new project team member
	//@access  private
	.post(auth, jsonParser, (req, res, next) => {
		const { projectId, userId } = req.body;

		const newProjectTeamMember = {
			project_id: projectId,
			user_id: userId,
		};

		for (const [key, value] of Object.entries(newProjectTeamMember)) {
			if (value == null) {
				return res.status(400).json({
					error: { message: `Missing '${key}' in request body` },
				});
			}
		}

		AppService.insertItem(
			req.app.get('db'),
			'project_team',
			newProjectTeamMember
		)
			.then((projectTeamMember) => {
				res
					.status(201)
					.location(
						path.posix.join(req.originalUrl, `/${projectTeamMember.id}`)
					)
					.json(serializeProjectTeamMember(projectTeamMember));
			})
			.catch(next);
	});

projectTeamRouter
	.route('/:proteam_id')
	.all((req, res, next) => {
		AppService.getById(req.app.get('db'), 'project_team', req.params.proteam_id)
			.then((proTeam) => {
				if (!proTeam) {
					return res.status(404).json({
						error: { message: "Project team doesn't exist" },
					});
				}
				res.proteam = proTeam;
				next();
			})
			.catch(next);
	})
	//@route   GET api/project/team/proteam_id
	//@desc    Get project member
	//@access  private
	.get(auth, (req, res, next) => {
		res.json(serializeProjectTeamMember(res.proteam));
	})
	//@route   DELETE api/project/team/proteam_id
	//@desc    DELETE project team member
	//@access  private
	.delete(auth, (req, res, next) => {
		AppService.deleteItem(
			req.app.get('db'),
			'project_team',
			req.params.proteam_id
		)
			.then((numRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	})
	//@route   PATCH api/project/team/proteam_id
	//@desc    Update project team member Info
	//@access  private
	.patch(auth, jsonParser, (req, res, next) => {
		const { projectId, userId } = req.body;

		const projectTeamMemberToUpdate = {
			project_id: projectId,
			user_id: userId,
		};

		const numberOfValues = Object.values(projectTeamMemberToUpdate).filter(
			Boolean
		).length;
		if (numberOfValues === 0)
			return res.status(400).json({
				error: {
					message:
						"Request body must contain either  'project id', or 'user id'",
				},
			});

		AppService.updateItem(
			req.app.get('db'),
			'project_team',
			req.params.proteam_id,
			projectTeamMemberToUpdate
		)
			.then((numRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	});

module.exports = projectTeamRouter;
