const express = require('express');
const database = require("./database");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({extended : false}));


// HOSTINGS
// Get AllHostings
app.get('/api/hostings', (req, res) => {

    database.getHostings( (err, hostings) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(hostings);
    }, null);

});

// Get Hosting by ID
app.get('/api/hostings/:id', (req, res) => {

    database.getHostings( (err, hostings) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(hostings[0]);
    }, req.params.id);

});

// Create Hosting
app.post('/api/hostings', function(req, res) {

    database.createHosting(function(err, result) {
        if (err) return res.send(err);
        return res.send(result)
    }, req.body);

});

// Delete Hosting
app.delete('/api/hostings', (req, res) => {

    database.deleteHosting (function(idHost) {
      res.send(idHost);
    }, req.body.id);

  });

// Update Hosting
app.patch('/api/hostings', (req, res) => {

    database.updateHosting ((err, dataset) => {
      if (err) return res.status(500).send(err);
      else return res.status(200).send(dataset);
    }, req.body); 

});


// USERS
// Create user
app.post("/api/create_new_user", (req, res) => {

  database.createNewUser((error, dataset) => {
    if (error) throw error;
    res.send(dataset);
  }, req.body);

});

//Get users
app.get('/api/users', (req, res) => {

  database.getUsers( (err, hostings) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(hostings);
  }, null);

});

// Check password 
app.get("/api/check_password", (req, res) => {
  const mail = req.query.mail;
  const plainPassword = req.query.password;
  database.checkPassword(mail, plainPassword, (error, result) => {
    if (error) res.status(500).send(error);
    res.send(result);
  });
});

// Listen
app.listen(port, () => console.log("node server running @ http://localhost:" + port));