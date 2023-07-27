import express, { NextFunction } from 'express'
import data from '../data/Muck_data.js'
// type of next is NextFunction 
const loggerMiddlewares = ((req: express.Request, res: express.Response, next: express.NextFunction) => {
    // hwo to know what is the method in request ? : req.method
    console.log(`[${new Date().toString()}] [${req.method}] ${req.path}`)

    next();
})


const rateLimitMiddleware = ((req: express.Request, res: express.Response, next: NextFunction) => {
    if (req.headers['user-id']) {
        const user = data.find(u => u.userID === req.headers['user-id'])
        if (user) {
            if (user.tokens > 0) {

                user.tokens--
                console.log(`user ID : ${req.headers['user-id']}`)
                console.log(`Tokens Left : ${user.tokens}`)
                res.locals.user = user
                next()
            } else {
                res.status(429).send("Bro , you used all of your tokens !")
            }
        } else {
            res.status(401).send("wait a minuet how are you ?  ")
        }
    } else {
        res.status(401).send("Bro , you ar not even allowed here ")
    }
})