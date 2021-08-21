const User = require('../models/user');
const createError = require('http-errors');


exports.login = (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ username })
        .then(user => {
            if (!user || !user.checkPassword(password)) {
                throw createError(404, 'الرجاء التحقق من الأسم وكلمة المرور');
            }
            res.json(user.signJWT());
        })
        .catch(next);
}

exports.register = (req, res, next) => {
    let data = { name, username, password } = req.body;
    User.create(data)
        .then(user => {
            res.json(user.signJWT());
        })
        .catch(next);
}

