exports.getSignUp = (req, res) => {
        res.render('signup', {
            title: 'Signup'
        });
    },
    exports.getLogin = (req, res) => {
        res.render('login', {
            title: 'LogIn'
        });
    }
exports.getIndex = (req, res) => {
    res.render('index', {
        title: 'SENDIT'
    });
};
exports.getLogOut = (req, res) => {
    req.logout();
    req.flash('sucess', 'You are now logged out');
    res.redirect('/login');
}