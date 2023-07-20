const {validate, Book}=require("../model/book");
const validateObjectId=require("../middleware/validateObjectId");
const express=require("express");
const router=express.Router();

router.get('/',async(req,res)=>{
    const book=await Book.find();

    res.send(book);
});

router.get('/:id',validateObjectId,async(req,res)=>{
    const book=await Book.findById(req.params.id);

    if(!book) return res.status(404).send('No Book found with given id');

    res.send(book);
});

router.post('/',async(req,res)=>{
    const {error}=validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }


    const book= new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year
    });

    await book.save();

    res.send(book);  
});



router.delete('/:id',validateObjectId,async(req,res)=>{
    const book=await Book.findById(req.params.id);
    if(!book) return res.status(404).send('No Book found with given id');

    await Book.deleteOne({_id: req.params.id});

    res.send(book);
});

router.put("/:id",validateObjectId,async(req,res)=>{
    const {error}=validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const book=await Book.findById(req.params.id);
    if(!book) return res.status(404).send('No Book found with given id');

    await Book.findOneAndUpdate({_id:req.params.id},{
        $set:{
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            year: req.body.year
        }
    })

    const nBook=await Book.findById(req.params.id);
    
    res.send(nBook);

});


module.exports=router;