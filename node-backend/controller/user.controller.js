var User = require('../dbmodel/user.dbmodel');

exports.create = function (req, res) {
    var usr = new User(
        {
            name: req.body.name
        }
    );

    usr.save(function (err) {
        if (err) {
            console.log(err);
            res.status(400).send({'error': err});
        }
        res.send('User Created successfully')
    })
};


exports.all = function (req, res) {
    User.find({}, function (err, user) {
        if (err) res.status(400).send({'error': err});
        res.send(user);
    })
};

exports.search = function (req, res) {
    User.find({"name":{'$regex': req.params.searchText, '$options': 'i'}}, function (err, user) {
        if (err) {
            res.status(400).send({'error': err});
        }
        res.send(user);
    })    
};