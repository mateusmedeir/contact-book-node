const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login');
};

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect('/login'));
            return;
        }
        req.flash('success', 'Account created successfully');
        req.session.save(() => res.redirect('/login'));
    } catch(error) {
        console.log(error);
        return res.render('404');
    }
    
}