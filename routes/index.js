const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userGetController = require('../controller/userGetContoller');
const userPostController = require('../controller/userPostController');
// GET home page.

// const ensureAuthenticated = (req, res, next) => {
// if (req.isAuthenticated()) {
// 	return next();
// }
// res.redirect('/login');
// }

router.get('/', /*ensureAuthenticated,*/ userGetController.getIndex);
router.post('/', userPostController.parcelPost);

router.get('/login', userGetController.getLogin);

router.post('/login',
	passport.authenticate('local', {
		failureRedirect: '/login',
		failureFlash: 'Invalid Username or Password'
	}),
	(req, res) => {
		res.redirect('/' + req.user.fullname);
	})

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById({
		where: {
			id: user.id
		},
		function (err, user) {
			done(err, user);
		}
	});
});
passport.use(new LocalStrategy(
	function (email, password, done) {
		User.findOne({
			where: {
				email: email
			}
		}, function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message: 'Incorrect User.'
				});
			}
			User.comparePassword(password, user.password, (err, isMatch) => {
				if (err) return done(err);
				if (isMatch) {
					return done(null, user)
				} else {
					return done(null, false, {
						message: "Invalid Password"
					});
				}
			})
		});
	}
));

router.get('/signup', userGetController.getSignUp);

router.post('/signup', userPostController.postSignup);

router.get('/logout', userGetController.getLogOut);

module.exports = router;