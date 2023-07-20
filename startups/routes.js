const express=require('express');
const books=require("../routes/books");

module.exports=function(app){
    app.use(express.json());
    app.use('/api/books',books);
}