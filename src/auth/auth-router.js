const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRETE } = require('../config');
const UsersService = require('../users/users-service');
const jsonParser = express.json();

const auth = require('../middleware/auth');

//@route   GET api/auth
//@desc    Get user Info
//@access  private
router.get('/', auth, async (req, res, next) => {
	try {
		const user = await UsersService.getById(req.app.get('db'), req.user.id);
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
	console.log('body =', req.body);
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
		let user = await UsersService.getByEmail(req.app.get('db'), email);

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
			res.json({ token });
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
