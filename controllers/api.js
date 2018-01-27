var express = require('express');
var router = express.Router();
var models = require('../models');

var ensureAuth = function(req, res, next){
    console.log("authing");
    if (req.isAuthenticated()){
        console.log("authed");
        return next();
    } else {
        res.status(401).json({message: 'Access Denied'});
    }
};

router.get('/users', ensureAuth, function(req, res){
    res.json({status: "success"});
});

router.get('/profile', function(req, res){
    models.Dog.findOne({
        where: {
            UserId: req.user.id
        }
    }).then(data => {
        res.json(data.toJSON())
    })
})

router.put('/profile', function(req, res){
    let data = req.body;
    console.log(data);
    console.log(req.user.id);
    models.Dog.findOne({where: {UserId: req.user.id}})
    .then(dog => {
        dog.update(data).then(()=>{
            res.status(200).json({status: "SUCCESS"}).end();
        })
    })
})

router.get('/survey', function(req, res){
    models.Dog.findOne({
        where: {
            UserId: req.user.id
        },
        include: [{model: models.Survey}]
    }).then(dog => 
    {
        console.log(dog.toJSON());
        res.json(dog.toJSON().Survey)
    })
})

router.put('/survey', function(req, res){
    let data = req.body
    models.Dog.findOne({
        where: {
            UserId: req.user.id
        },
        include: [{model: models.Survey}]
    }).then(dog =>
    {
        let survey = dog.Survey;
        survey.update(data).then(() => {
            res.status(200).json({status: "SUCCESS"}).end();
        });
    });
});

router.get('/filter', function(req, res){
    models.Dog.findOne({
        where: {
            UserId: req.user.id
        },
        include: [{model: models.Filter}]
    }).then(dog => {
        let filter = dog.Filter;
        res.json(filter.toJSON()).end();
    })
})

module.exports = router;