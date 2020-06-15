const path = require('path');
const express = require('express');
const AppService = require('../AppService');
const auth = require('../middleware/auth');

const sectionTeamRouter = express.Router();
const jsonParser = express.json();

const serializeSectionTeamMember = (sectionTeam) => ({
	sectionTeamId: sectionTeam.id,
	projectId: sectionTeam.project_id,
	sectionId: sectionTeam.section_id,
	name: sectionTeam.full_name,
	email: sectionTeam.email,
	avatar: sectionTeam.avatar_url,
});

sectionTeamRouter
	.route('/')
	//@route   GET api/section/team
	//@desc    Get all sections team members
	//@access  private
	.get(auth, (req, res, next) => {
		const sectionId = req.query.sectionid;
		const knexInstance = req.app.get('db');
		AppService.sectionTeamMembers(knexInstance, sectionId)
			.then((sectionTeam) => {
				res.json(sectionTeam.map(serializeSectionTeamMember));
			})
			.catch(next);
	})
	//@route   POST api/section/team
	//@desc    Add a new section team member
	//@access  private
	.post(auth, jsonParser, (req, res, next) => {
		const { projectId, sectionId, userId } = req.body;

		const newSectionTeamMember = {
			project_id: projectId,
			section_id: sectionId,
			user_id: userId,
		};

		for (const [key, value] of Object.entries(newSectionTeamMember)) {
			if (value == null) {
				return res.status(400).json({
					error: { message: `Missing '${key}' in request body` },
				});
			}
		}

		AppService.insertItem(
			req.app.get('db'),
			'section_team',
			newSectionTeamMember
		)
			.then((secTeamMember) => {
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${secTeamMember.id}`))
					.json(serializeSectionTeamMember(secTeamMember));
			})
			.catch(next);
	});

sectionTeamRouter
	.route('/:secteam_id')
	.all((req, res, next) => {
		AppService.getById(req.app.get('db'), 'section_team', req.params.secteam_id)
			.then((secTeam) => {
				if (!secTeam) {
					return res.status(404).json({
						error: { message: "Section team doesn't exist" },
					});
				}
				res.secteam = secTeam;
				next();
			})
			.catch(next);
	})
	//@route   GET api/section/team/secteam_id
	//@desc    Get section member
	//@access  private
	.get(auth, (req, res, next) => {
		res.json(serializeSectionTeamMember(res.secteam));
	})
	//@route   DELETE api/section/team/secteam_id
	//@desc    DELETE section team member
	//@access  private
	.delete(auth, (req, res, next) => {
		AppService.deleteItem(
			req.app.get('db'),
			'section_team',
			req.params.secteam_id
		)
			.then((numRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	})
	//@route   PATCH api/section/team/secteam_id
	//@desc    Update section team member Info
	//@access  private
	.patch(auth, jsonParser, (req, res, next) => {
		const { projectId, sectionId, userId } = req.body;

		const sectionTeamMemberToUpdate = {
			project_id: projectId,
			section_id: sectionId,
			user_id: userId,
		};

		const numberOfValues = Object.values(sectionTeamMemberToUpdate).filter(
			Boolean
		).length;
		if (numberOfValues === 0)
			return res.status(400).json({
				error: {
					message:
						"Request body must contain either  'project id', 'section id', or 'user id'",
				},
			});

		AppService.updateItem(
			req.app.get('db'),
			'section_team',
			req.params.proteam_id,
			sectionTeamMemberToUpdate
		)
			.then((numRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	});

module.exports = sectionTeamRouter;
