const path = require('path');
const express = require('express');
const xss = require('xss');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRETE } = require('../config');
const UsersService = require('./users-service');
const auth = require('../middleware/auth');

const usersRouter = express.Router();
const jsonParser = express.json();

const serializeUser = (user) => ({
	userId: user.id,
	fullName: xss(user.full_name),
	email: xss(user.email),
	github: xss(user.github),
	avatarUrl: xss(user.avatar_url),
});

usersRouter
	.route('/')
	//@route   GET api/users
	//@desc    Get all users Info
	//@access  private
	.get(auth, (req, res, next) => {
		const knexInstance = req.app.get('db');
		UsersService.getAllUsers(knexInstance)
			.then((users) => {
				res.json(users.map(serializeUser));
			})
			.catch(next);
	})
	//@route   POST api/users
	//@desc    Register new user
	//@access  public
	.post(jsonParser, (req, res, next) => {
		const { fullName, email, github, avatarUrl, password } = req.body;
		const newUser = { full_name: fullName, email, password };

		for (const [key, value] of Object.entries(newUser)) {
			if (value == null) {
				return res.status(400).json({
					error: { message: `Missing '${key}' in request body` },
				});
			}
		}

		newUser.github = github;
		newUser.avatar_url = avatarUrl;

		//See if user exist
		UsersService.getByEmail(req.app.get('db'), newUser.email)
			.then((user) => {
				if (user) {
					return res
						.status(400)
						.json({ errors: [{ msg: 'User already exists.' }] });
				}

				//Encrypt password
				bcrypt.genSalt(10).then((salt) => {
					bcrypt.hash(password, salt).then((saltPassword) => {
						newUser.password = saltPassword;

						UsersService.insertUser(req.app.get('db'), newUser).then((user) => {
							//return JsonWebToken
							const payload = {
								user: {
									id: user.id,
								},
							};

							jwt.sign(
								payload,
								JWT_SECRETE,
								{ expiresIn: 360000 },
								(err, token) => {
									if (err) throw err;
									res
										.status(201)
										.location(path.posix.join(req.originalUrl, `/${user.id}`))
										.json({ token });
								}
							);
						});
					});
				});
			})
			.catch(next);
	});

usersRouter
	.route('/:user_id')
	.all((req, res, next) => {
		UsersService.getById(req.app.get('db'), req.params.user_id)
			.then((user) => {
				if (!user) {
					return res.status(404).json({
						error: { message: "User doesn't exist" },
					});
				}
				res.user = user;
				next();
			})
			.catch(next);
	})
	//@route   GET api/users/user_id
	//@desc    Get user Info
	//@access  private
	.get(auth, (req, res, next) => {
		res.json(serializeUser(res.user));
	})
	//@route   DELETE api/users/user_id
	//@desc    DELETE user
	//@access  private
	.delete(auth, (req, res, next) => {
		UsersService.deleteUser(req.app.get('db'), req.params.user_id)
			.then((numRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	})
	//@route   PATCH api/users/user_id
	//@desc    Update user Info
	//@access  private
	.patch(auth, jsonParser, (req, res, next) => {
		const { fullName, email, github, avatarUrl, password } = req.body;
		const userToUpdate = {
			full_name: fullName,
			email,
			github,
			avatar_ulr: avatarUrl,
			password,
		};

		const numberOfValues = Object.values(userToUpdate).filter(Boolean).length;
		if (numberOfValues === 0)
			return res.status(400).json({
				error: {
					message:
						"Request body must contain either 'fullname', 'email', 'password', 'github url', or 'avatar url'",
				},
			});

		UsersService.updateUser(req.app.get('db'), req.params.user_id, userToUpdate)
			.then((numRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	});

module.exports = usersRouter;
