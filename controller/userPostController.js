const User = require('../models/users');

exports.postSignup = (req, res) => {
    const name = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is required').isEmail();
    req.checkBody('password', 'Password should not be left blank').notEmpty();

    // const errors = req.validationErrors(req);

    // if (errors) {
    // 	res.render('signup', {
    // 		errors: errors
    // 	});
    // 	console.log(' Validation Error');
    // }

    if (!name) {
        throw new Error('Input name');
    } else {

        const user = {
            username: name,
            email: email,
            password: password
        }
        // Table created
        User.sync().then(() => {
            User.createUser(user, (err, user) => {
                if (err) throw (err);
                else {
                    console.log(user);
                }
            });
        })

        req.flash('sucess', 'You are now registered and can now login');

        res.redirect('/login');
    }
}