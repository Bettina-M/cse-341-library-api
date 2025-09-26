const {db}= require('../database/database')
const Book = require('../models/bookModel')

async function getAllBooks(req, res, next){
    try{
        const allBooks = await Book.find()
        if(!allBooks) return res.status(500).json({error:'Failed to get books'})
        res.json(allBooks)

    }catch(error){
        next(error)
        
    }
   
}

async function getBookById(req, res, next){
    try{
        const book = await Book.findById(req.params.id)
        if(!book) return res.status(404).json({message:'Book not found'})
        res.json(book)
    }catch(error){
        next(error)
    }
}

async function createBook(req, res, next){
    try{
        const bookData = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publishedYear: req.body.publishedYear,
            available: req.body.available,
            isbn: req.body.isbn,
            pages: req.body.pages
        }
        const book = new Book(bookData)
        await book.save()
        if(!book) return res.status(400).json({message: 'Book not created'})
        res.status(201).json(book)
    }catch(error){
        next(error)
    }
}

async function updateBook(req, res, next){
    try{
        const bookData = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publishedYear: req.body.publishedYear,
            available: req.body.available
        }
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, bookData, {new:true},{runValidators: true})
        
        if(!updatedBook){
            return res.status(404).json({message:'Book not found'})
        } 
        res.json(updatedBook)
        
    }catch(error){
        next(error)
    }
}

async function deleteBook(req, res, next){
    try{
        const deletedBook = await Book.findByIdAndDelete(req.params.id)
        if(!deletedBook) return res.status(404).json({message:'Book not found'})
    }catch(error){
        next(error)
    }
    res.status(204).json({message:"Book deleted"})
}
module.exports = {getAllBooks, getBookById, createBook, updateBook, deleteBook}