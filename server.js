// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

const querystring = require('querystring');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bears'); // connect to our database


var User = require('./app/models/user');
var ChordSheet = require('./app/models/chordsheet');

var passwordHash = require('password-hash');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


router.use(function(req, res, next) {
    // do logging
    
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here


router.route('/verify/encryptedpass/:hashedpass/password/:password')
    
    .get(function(req, res) {
        User.find({}, function(err, user) {
            if (err){
                return res.send(err);
            }
            else{
                var isValid = passwordHash.verify(req.params.password,req.params.hashedpass);
                res.json(isValid);
            }
        });
    });




router.route('/chordsheets')

    // create a bear (accessed at POST http://localhost:8080/api/chordsheets)
    .get(function(req, res) {
        ChordSheet.find(function(err, chordSheet) {
            if (err)
                return res.send(err);

            res.json(chordSheet);
        });
    })
    
    .post(function(req, res) {
        
        var chordSheet = new ChordSheet();      // create a new instance of the Bear model
        chordSheet.email = req.body.email;
        chordSheet.title = req.body.title;
        chordSheet.version = req.body.version;
        chordSheet.chordString = req.body.chordString;
        chordSheet.isVisible = req.body.isVisible;
        chordSheet.date = req.body.userDate;

        // save the bear and check for errors
        chordSheet.save(function(err) {
            if (err)
                return res.send(err);

            res.json({ message: 'Chordsheet created!' });
        });
        
    });
    
    router.route('/chordsheets/:chordsheet_id')
    
        .delete(function(req, res) {
        ChordSheet.remove({
            _id: req.params.chordsheet_id
        }, function(err, chordSheet) {
            if (err)
                return res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



router.route('/userchordsheet')

    .post(function(req, res) {
        var userEmail = req.body.email;
        var sheetTitle = req.body.title;
        var userVersion = req.body.version;

       ChordSheet.find({email: userEmail, title: sheetTitle, version: userVersion}, function(err, user){
           if (err){
                return res.send(err);
            }
            else{
                    res.json(user);
            }
       });

        
    });









router.route('/users')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var user = new User();      // create a new instance of the Bear model
        user.email = req.body.email;  // set the bears name (comes from the request)
        
        var hashedPassword = passwordHash.generate(req.body.password);
        
        user.password = hashedPassword;
        // save the bear and check for errors
        user.save(function(err) {
            if (err)
                return res.send(err);

            res.json({ message: 'User created!' });
        });
        
    })
    
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                return res.send(err);

            res.json(users);
        });
    });



router.route('/users/:user_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                return res.send(err);
            res.json(user);
        });
    })
    
    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                return res.send(err);

            user.name = req.body.name;  // update the bears info

            // save the bear
            user.save(function(err) {
                if (err)
                    return res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })
    
    
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                return res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
    
    
    router.route('/chordsheet/updatetitle')

        .put(function(req, res) {
            
        
            ChordSheet.find({email: req.body.email, title: req.body.title}, function(err, chordSheet) {
                
            if (err)
                return res.send(err);

            chordSheet[0].title = req.body.newTitle;  // update the bears info

            // save the bear
            chordSheet[0].save(function(err) {
                if (err)
                    return res.send(err);

                res.json(chordSheet[0].title);
            });

        });
        
    });
    
    
        router.route('/chordsheet/updatevisibility')

        .put(function(req, res) {
            
        
            ChordSheet.find({email: req.body.email, title: req.body.title}, function(err, chordSheet) {
                
            if (err)
                return res.send(err);

            chordSheet[0].isVisible = req.body.newIsVisible;  // update the bears info

            // save the bear
            chordSheet[0].save(function(err) {
                if (err)
                    return res.send(err);

                res.json(chordSheet[0].isVisible);
            });

        });
        
    });






app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    
    // Pass to next layer of middleware
    next();
});







// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);