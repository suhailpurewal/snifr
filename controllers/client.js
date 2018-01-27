var express = require('express');
var router = express.Router();
var passport = require('passport');
var models = require('../models');
var Sequelize = require('sequelize');
var user;

var sequelize = new Sequelize("snifrdev", "snifrdev", "Iz4OA~!snolU", {
    host: "den1.mysql1.gear.host",
    dialect: "mysql",
    logging: function () { },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

});

var assertThrows = function(func, x) {
    var threw = false;
    try {
        func(x);
    } catch (err) {
        threw = true;
        console.log()
    }
    return threw;
}
console.log("Did the test catch an error?: ", assertThrows(parseTemp, 'cat'))

var parseTemp = function(temp){
    if(temp !== 'less25' && temp !== 'less50' && temp !== 'less75' && temp !== 'less100' && temp !== 'over100') {
        throw new Error('Please choose a preference!');
    }
    console.log("++++++++");
    console.log(temp);
    console.log("++++++++")
    let printTemp = "";
    switch(temp){
        case "less25":
            printTemp = "Under 25lbs";
            break;
        case "less50":
            printTemp = "Under 50lbs";
            break;
        case "less75":
            printTemp = "Under 75lbs";
            break;
        case "less100":
            printTemp = "Under 100lbs";
            break;
        case "over100":
            printTemp = "Over 100lbs";
            break;
        default:
    }
    return printTemp;
}


var ensureAuth = function (req, res, next) {
    console.log("authing");
    if (req.isAuthenticated()) {
        console.log("authed");
        return next();
    } else {
        res.redirect('/');
    }
};

//handlebars
//routes for the websites, this is all tenative
//removed the ensureAuth to get working
router.get('/', function (req, res) {
    var hbsObj = {
        status: "success",
        showAbout: true
    };
    //res.render('index', hbsObj);

    res.render('login', hbsObj);
});

router.get('/user', function (req, res) {
    res.render('signupHumanInfo');
});

router.get('/user/:userId/dog', function (req, res) {
    res.render('signupDogInfo');
});

router.post('/user/:userId/dog', function (req, res) {
    console.log(req.body)
    let newDog = req.body;
    newDog["UserId"] = req.user.id;
    console.log(newDog);
    models.Dog.create(newDog).then(resp => {
        console.log(resp.get());
        res.json({ status: "success", dogId: resp.id });
    });
});

router.get('/user/:userId/dog/:dogId/survey', function (req, res) {
    res.render('signupSurvey');
});

router.post('/user/:userId/dog/:dogId/survey', function (req, res) {
    let newSurvey = req.body;
    newSurvey["DogId"] = req.params.dogId;
    models.Survey.create(newSurvey).then(resp => {
        res.json({
            status: "success",
            userId: req.params.userId,
            dogId: req.params.dogId
        });
    })
});

router.get('/user/:userId/dog/:dogId/filter', function (req, res) {
    res.render('signupFilters');
});

router.post('/user/:userId/dog/:dogId/filter', function (req, res) {
    let newFilter = req.body;
    newFilter["DogId"] = req.params.dogId;
    models.Filter.create(newFilter).then(resp => {
        res.json({ status: "success", dogId: req.params.dogId });
    });
});

router.get('/home', ensureAuth, function (req, res) {
    models.User.findOne({
        where: {
            id: req.user.id
        },
        include: [models.Dog]
    }).then(function (data) {
        console.log(data);
        let userInfo = data.get();
        console.log(data)
        console.log(data.Dogs)
        res.render('homePage', { Dog: data.Dogs });
    });
});

router.get('/matches', function (req, res) {
    let userId = req.params.userId;
    models.Dog.findOne({
        where: {
            UserId: req.user.id
        }
    }).then(dog => {
        let dogId = dog.toJSON().id;
        
        let matchQuery = "select a.id as yourDog, b.id as matchDog, d.name as dogName, d.photo as dogPhoto, d.breed as dogBreed, abs(a.q1 - b.q1) + abs(a.q2 - b.q2) + abs(a.q3 - b.q3)+ abs(a.q4 - b.q4)+ abs(a.q5 - b.q5)+ abs(a.q6 - b.q6)+ abs(a.q7 - b.q7)+ abs(a.q8 - b.q8)+ abs(a.q9 - b.q9)+ abs(a.q10 - b.q10) as scorediff from surveys a inner join surveys b on b.id != a.id inner join dogs d on d.id = b.DogId where a.id=" + dogId + " order by scorediff asc";
    console.log(matchQuery);
    sequelize.query(matchQuery, dogId).spread((results, metadata) => {
        //       //math for % of match - wasn't able to push to page but works  
        //     // var diff = results[i].scorediff;
        //     // console.log(diff)
        //     // var math = 100-((diff/40)*100);
        //     // console.log(math);
        // console.log("all done");
        console.log(results);
        res.render('matchPage', { Match: results });
        // console.log(results);
    });
    })
    
    
    

});

router.get('/profile/:userId', function (req, res) {
    models.Dog.findAll({
        where: {
            id: req.params.userId
        }
    }).then(function (data) {
        data[0].size = parseTemp(data[0].size);
        let temp = data[0].temperament.split("");
        temp[0] = temp[0].toUpperCase();
        data[0].temperament = temp.join("");
        console.log(data);
        res.render('profile', { Profile: data });
    });
});

router.get('/update/profile', function(req, res){
    res.render('updateProfile');
});

router.get('/update/survey', function(req, res){
    res.render('updateSurvey');
});

router.get('/update/filter', function(req, res){
    res.render('updateFilter');
});

router.get('/barks', function (req, res) {
    res.render('barksPage');
});
//end of handlebars routes

router.get('/signin', function (req, res) {
    var hbsObj = {};
    res.render('signin', hbsObj);
});


//older routes before handlebars
// router.get('/survey1', function(req, res){
//     res.sendfile('./views/templates/survey1.html');
// });

// router.get('/survey2', ensureAuth, function(req, res){
//     res.sendfile('./views/templates/survey2.html');
// })

router.post('/signin',
    passport.authenticate('local-signin', {
        failureRedirect: '/notAuth',
        successRedirect: '/auth'
    }));

router.get('/signup', function (req, res) {
    var hbsObj = {};
    res.render('signup', hbsObj);
});

router.post('/signup',
    passport.authenticate('local-signup',
        {
            failureRedirect: '/signup/failure',
            successRedirect: '/signup/success'
        }));

router.get('/signup/:worked', ensureAuth, function (req, res) {
    let status = req.params.worked
    res.json({ signup: status, user: req.user.id });
})

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) throw err;
        res.redirect('/auth');
    });
});

router.get('/notAuth', function (req, res) {
    var hbsObj = {};
    //res.render('notAuth', hbsObj);
    res.json({ authorized: "NO" })
});

router.get('/auth',
    ensureAuth,
    function (req, res) {
        console.log("render auth");
        console.log(req.user);
        var hbsObj = {};
        //res.render('auth', req.user);
        res.json({ authorized: "YES" })
    });

module.exports = router;