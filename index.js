/*
The following code was made by TryingTom, 
https://github.com/TryingTom

__My SQL:__
The code works only if you have a MySql database running, which I've included into the file "customerDB.sql".
You can start the database by downloading Bitnami WAMP Stack, and then starting a PhpMyAdmin service. Once you've logged into your account, 
use the SQL query to make the database. Once the database is created and you have the MySQL server running, start this server to get
everything working.

__Node JS:__
First include your credentials on mysqlConnection (a user that can view the database you created)
You can start this code by opening the file location of index.js in command prompt, then writing a command: 
    $"nodemon .\index.js"
Once you've gotten the confirmation of "Db connected", you can copy the url which the command prompt gives, and then go that website. 
The website won't show anything.

!! Remember to check the database username and password !!

Add all the packages with a command:
$ npm install
*/

// server parameters
const hostname = '127.0.0.1'; // local host
const port = 3000;

// mysql parameters
const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: hostname,
    port: '3306',
    user: '', // your username here
    password: '', // your password here
    database: "customer",
    multipleStatements: true
});

// express parameters
var express = require("express");
var app = express();

// body parser
const bodyparser = require('body-parser');
app.use(bodyparser.json());

mysqlConnection.connect((err)=>{
    if(!err){
        console.log('Db connected');
    }
    else{
        console.log("error: " + err);
    }
})

app.listen(port, ()=>console.log(`Server running at http://${hostname}:${port}/`));


// -----------------------------------------task 45----------------------------------------- //
// get all customer information

/*Example call for postman:
GET: http://127.0.0.1:3000/customers

What to expect:
[
    {
        "CUSTOMERID": 14,
        "NAME": "PostmanTest",
        "ADDRESS": "Adress",
        "POSTALNUMBER": "70200",
        "POSTALOFFICE": "Office",
        "CREATEDDATE": "2020-04-23T21:00:00.000Z",
        "CUSTOMERTYPE": 2
    }
]
*/
app.get('/customers', (res)=>{
    mysqlConnection.query('SELECT * FROM customer', (err, rows)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

// -----------------------------------------task 45 end------------------------------------- //

// -----------------------------------------task 46----------------------------------------- //
// get all customer names and addresses

/*Example call for postman:
GET: http://127.0.0.1:3000/nameandaddress

What to expect:
[
    {
        "NAME": "PostmanTest",
        "ADDRESS": "Adress",
    }
]
*/

app.get('/nameandaddress', (req,res)=>{
    mysqlConnection.query('SELECT name,address FROM customer', (err, rows)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

// -----------------------------------------task 46 end------------------------------------- //

// -----------------------------------------task 47----------------------------------------- //
// get all customer information that have same customer type

/*Example call for postman:
GET: http://127.0.0.1:3000/customers/1

What to expect:
[
    {
        "CUSTOMERID": 13,
        "NAME": "Updated guy",
        "ADDRESS": "Updated_address",
        "POSTALNUMBER": "71820",
        "POSTALOFFICE": "JOssain",
        "CREATEDDATE": "2018-09-24T21:00:00.000Z",
        "CUSTOMERTYPE": 2
    }
]
*/
app.get('/customers/:customertype', (req,res)=>{
    mysqlConnection.query('SELECT * FROM customer WHERE customertype = ?',[req.params.customertype], (err, rows)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

// -----------------------------------------task 47 end------------------------------------- //
// -----------------------------------------task 48 ---------------------------------------- //
// insert a new customer to the database

/*Example call for postman:
POST: http://127.0.0.1:3000/customers/
BODY:
{
    "NAME": "Testing test",
    "ADDRESS": "Address",
    "POSTALNUMBER": "PostNumber",
    "POSTALOFFICE": "Office",
    "CUSTOMERTYPE": 2
}

What to expect:
Posted successfully
*/
app.post('/customers/', (req,res)=>{
    // cust is the request body, which contains the information just like above (uses body-parser)
    let cust = req.body;
    // insert the query into a variable for later use; the ?'s are the parameters the user gives
    var sql = "INSERT INTO `customer` (`NAME`,`ADDRESS`,`POSTALNUMBER`,`POSTALOFFICE`,`CREATEDDATE`,`CUSTOMERTYPE`) VALUES (?, ?, ?, ?, NOW(), ?)";

    // check if the user has given something in every parameter     (Task 52    )  -----------------------------------------------------------------------
    if (typeof cust.NAME == 'undefined' || cust.NAME.length == 0) res.send("Input a NAME")
    else if (typeof cust.ADDRESS == 'undefined' || cust.ADDRESS.length == 0)  res.send("Input an ADDRESS")
    else if (typeof cust.POSTALNUMBER == 'undefined' || cust.POSTALNUMBER.length == 0)  res.send("Input an POSTALNUMBER")
    else if (typeof cust.POSTALOFFICE == 'undefined' || cust.POSTALOFFICE.length == 0)  res.send("Input an POSTALOFFICE")
    else if (typeof cust.CUSTOMERTYPE == 'undefined' || cust.CUSTOMERTYPE.length == 0)  res.send("Input an CUSTOMERTYPE")
    // if they have, make a SQL query                               (Task 52 end)  -----------------------------------------------------------------------
    else{
        // all the ?'s are inserted with the data from the request body
        mysqlConnection.query(sql, [cust.NAME, cust.ADDRESS, cust.POSTALNUMBER, cust.POSTALOFFICE, cust.CUSTOMERTYPE], (err)=>{
            if(!err){
                res.send("Posted successfully");
            }
            else{
                console.log(err);
                res.send("Something went wrong, post failed");
            }
        })
    } 
});

// -----------------------------------------task 48 end------------------------------------- //

// -----------------------------------------task 50 ---------------------------------------- //
// delete a customer with certain ID

/*Example call for postman:
DELETE: http://127.0.0.1:3000/customers/1

What to expect:
Deleted customer with id: 1, successfully
*/
app.delete('/customers/:CUSTOMERID', (req,res)=>{
    // the CUSTOMERID = ? will be from the request parameters, the CustomerID 
    mysqlConnection.query('DELETE FROM customer WHERE CUSTOMERID = ?',[req.params.CUSTOMERID], (err)=>{
        if(!err){
            // send a message back
            res.send("Deleted customer with id: "  + req.params.CUSTOMERID + ", successfully");
        }
        else{
            // log the error message
            console.log(err);
            // send a message back
            res.send("Delete failed, contact your local support");
        }
    })
});

// -----------------------------------------task 50 end------------------------------------- //

// -----------------------------------------task 53 ---------------------------------------- //
// update information of a customer with certain ID

/*Example call for postman:
PUT: http://127.0.0.1:3000/customers/1
BODY:
{
    "NAME": "Testing test",
    "ADDRESS": "Address",
    "POSTALNUMBER": "PostNumber",
    "POSTALOFFICE": "Office",
    "CUSTOMERTYPE": 2
}

What to expect:
Updated information for the customer with ID: 1, successfully
*/
app.put('/customers/:CUSTOMERID', (req,res)=>{
    // cust is the request body, which contains the information just like above
    let cust = req.body;
    // insert the query into a variable for later use; the ?'s are the parameters the user gives
    var sql = "UPDATE customer SET NAME = ?, ADDRESS = ?, POSTALNUMBER = ?, POSTALOFFICE = ?, CUSTOMERTYPE = ? WHERE CUSTOMERID = ?";

    // check if the user has given something in every parameter
    if (typeof cust.NAME == 'undefined' || cust.NAME.length == 0) res.send("Input a NAME")
    else if (typeof cust.ADDRESS == 'undefined' || cust.ADDRESS.length == 0)  res.send("Input an ADDRESS")
    else if (typeof cust.POSTALNUMBER == 'undefined' || cust.POSTALNUMBER.length == 0)  res.send("Input an POSTALNUMBER")
    else if (typeof cust.POSTALOFFICE == 'undefined' || cust.POSTALOFFICE.length == 0)  res.send("Input an POSTALOFFICE")
    else if (typeof cust.CUSTOMERTYPE == 'undefined' || cust.CUSTOMERTYPE.length == 0)  res.send("Input an CUSTOMERTYPE")
    // if they have, make a SQL query
    else{
        // all the ?'s are inserted with the data from the request body
        mysqlConnection.query(sql, [cust.NAME, cust.ADDRESS, cust.POSTALNUMBER, cust.POSTALOFFICE, cust.CUSTOMERTYPE, req.params.CUSTOMERID], (err)=>{
            if(!err){
                res.send("User with id: " + req.params.CUSTOMERID + ", updated successfully");
            }
            else{
                console.log(err);
                res.send("Something went wrong, put failed");
            }
        })
    }
});

// -----------------------------------------task 53 end------------------------------------- //