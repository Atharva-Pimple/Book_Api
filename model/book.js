const mongoose=require('mongoose');
const Joi= require('joi');

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:2,
        maxlength:255
    },
    author:{
        type:String,
        required:true,
        minlength:3,
        maxlength:255
    },
    genre:{
        type: String,
        required:true,
        minlength:4,
        maxlength:255
    },
    year:{
        type: Number,
        required:true
    }
    
});

const Book=mongoose.model('book',bookSchema);


function validateBook(book){
    const schema=Joi.object({
        title:Joi.string().min(2).max(255).required(),
        author:Joi.string().min(3).max(55).required(),
        genre: Joi.string().required(),
        year: Joi.number().required()
    });

    return schema.validate(book);
}

exports.Book=Book;
exports.validate= validateBook;