const request=require('supertest');
const {Book}=require("../model/book");

let server;

describe('/api/book',()=>{
    beforeEach(()=>{server=require('../index');})
    afterEach(async()=>{
        server.close(),
        await Book.deleteMany({});
    })


    describe('GET/',()=>{
        it('should return all books',async()=>{
            Book.collection.insertMany([
                {title:'title1'},
                {title:'title2'}
            ]);

            const res=await request(server).get('/api/books');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        });

        it('should return a genre if valid id passed',async()=>{
            const book=new Book({
                title:'title1',
                author:'xyzttt',
                genre:'abcde',
                year:20
            });
            await book.save();

            const res=await request(server).get('/api/books'+ book._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name',book.title);
        })
    });
});