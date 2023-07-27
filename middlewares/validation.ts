import express from 'express'
import book from '../types/book.js'
const bookValidationMiddleware = (req: book.request, res: book.response, next: express.NextFunction) => {
    if (!req.body.title || req.body.title.length < 3) {
        res.status(400).send(`Title is required , and more than 3 letters long`)
        return
    }
    if (!req.body.publicationYear) {
        res.status(400).send(`Book year is required`)
        return
    }
    next();
}

export {
    bookValidationMiddleware
}