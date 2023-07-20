require("express-async-errors");
const winston=require("winston");
const Joi=require("joi");
const books=require("./routes/books");
Joi.objectId=require('joi-objectid')(Joi);
const express=require('express');
const app=express();


require("./startups/db")();
require("./startups/routes")(app);


winston.add(new winston.transports.File({
    filename: 'logfile.log',
    handleRejections: true,
    handleExceptions: true
}));


const port=process.env.PORT || 3000 
const server=app.listen(port, () => console.log(`Listning on PORT ${port}...`));

module.exports=server;