const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simplon_hosting'
});

connection.connect();

const end = function end() {
    connection.end();
};

//Functions

// HOSTINGS
// Get All Hostings
const getHostings = function getHostings(clbk, id) {

    let sql;
    if (id) 

    sql = `SELECT * FROM hostings WHERE id = ?`;
    else 
      sql = `SELECT * FROM hostings`;
    const query = connection.query(sql, [id], (error, results) => {
        if (error) return clbk(error, null);
        return clbk(null, results);
    });

    console.log("Last Query :", query.sql);
};

// Create Hosting
const createHosting= function createhosting(clbk, payload) {

    let data = [payload.clientName, payload.projectName, payload.domain, payload.hostingPrice, payload.startDate, payload.endDate];
    let sql = "INSERT INTO hostings (clientName, projectName, domain, hostingPrice, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?)";

    const query = connection.query(sql, data, (err, res) => {
      if (err) return clbk(err, null);
      console.log(res);
      return clbk(null, res);
    });

    console.log("Last query :", query.sql)
};

// Delete Hosting
const deleteHosting = function deleteHosting(clbk, id) {

    let sql = "DELETE FROM `hostings` WHERE `hostings`.`id` = ?";

    const query = connection.query(sql, [id], function (err, res) {
      if (err) throw err;
      return clbk(res);
    });

    console.log("last query :", query.sql)
};

// Update Hosting
const updateHosting = function updateHosting (clbk, hostings) {

    let sql = "UPDATE hostings SET clientName = ?, projectName = ?, domain = ?, hostingPrice = ?, startDate = ?, endDate = ? WHERE id = ?";
    const payload = [hostings.clientName, hostings.projectName, hostings.domain, hostings.hostingPrice, hostings.startDate, hostings.endDate, hostings.id];
    
    const query = connection.query(sql, payload, function (err, res) {
      if (err) return clbk(err, null);
      return clbk(null, res);
    });

    console.log("Last query :", query.sql)
};


// USER
// Post-create new user
const createNewUser = (clbk, data) => {
  
  bcrypt.hash(data.password, saltRounds, function(err, hash) {
  
  let sql = "INSERT INTO users (name, email, password, isSuperAdmin) VALUE (?, ?, ?, ?)";
  const payload = [data.name, data.email, hash, data.isSuperAdmin];
  
  connection.query(sql, payload, (err, res) => {
    if (err) return clbk(err, null);
    console.log("Ma res:", res)
    return clbk(null, res);
  });

  });

};

// Get All User
const getUsers = function getUsers(clbk, id) {

  let sql;
  if (id) 

  sql = `SELECT * FROM users WHERE id = ?`;
  else 
    sql = `SELECT * FROM users`;
  const query = connection.query(sql, [id], (error, results) => {
      if (error) return clbk(error, null);
      return clbk(null, results);
  });

  console.log("Last Query :", query.sql);
};

// Check password login
const checkPassword = (mail, plainPassword, callback) => {
  const sql = `SELECT password FROM users WHERE email = ?`
    connection.query(sql, mail, (error, result) => {
    if (error) return callback(error, null); 
    if (!result.length) return callback("no mail found", null);

    hashedPassword = result[0].password;

    bcrypt.compare(plainPassword, hashedPassword, (error, result) => {
      if (error) return callback(error, null);
      else if (result === false) {
        return callback("Mot de passe incorrect", null);
      } else {
        const sql2 = `SELECT id, name, email FROM users WHERE email=?`;
        connection.query(sql2, mail,(error, result) => {
          if (error) {
          return callback(error, null)     
          } else {
          return callback(null, result)
        }
      })
    }
  })      
})
};

module.exports = {
    getHostings,
    createHosting,
    deleteHosting,
    updateHosting,
    createNewUser,
    getUsers,
    checkPassword,
    end
 };  