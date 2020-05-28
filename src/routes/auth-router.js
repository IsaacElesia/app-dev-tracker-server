const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const xss = require('xss');
const jwt = require('jsonwebtoken');
const { JWT_SECRETE } = require('../config');
const AppService = require('../AppService');
const jsonParser = express.json();

const auth = require('../middleware/auth');

const serializeuser = (user) => ({
	userId: user.id,
	fullName: xss(user.full_name),
	email: xss(user.email),
	github: xss(user.github),
	avatarUrl: xss(user.avatar_url),
});

//@route   GET api/auth
//@desc    Get user Info
//@access  private
router.get('/', auth, async (req, res, next) => {
	try {
		const user = await AppService.getById(
			req.app.get('db'),
			'users',
			req.user.id
		);
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/auth
// @desc     Authenticate handler & get token
// @access   Public
router.post('/', jsonParser, async (req, res) => {
	const { email, password } = req.body;
	const returnUser = { email, password };

	for (const [key, value] of Object.entries(returnUser)) {
		if (value == null) {
			return res.status(400).json({
				error: { message: `Missing '${key}' in request body` },
			});
		}
	}

	try {
		let user = await AppService.getByEmail(req.app.get('db'), 'users', email);

		if (!user) {
			return res
				.status(400)
				.json({ errors: { message: 'Invalid Credentials' } });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res
				.status(400)
				.json({ errors: { message: 'Invalid Credentials' } });
		}

		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(payload, JWT_SECRETE, { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;
			res.json({ user: serializeuser(user), token });
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
