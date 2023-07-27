import express from 'express';

export namespace Book {
    export interface book {
        id: number
        title: string
        author: string
        publicationYear: number
    }

    export interface response extends express.Response {
        send: (body: string | {
            id: number,
            title: string,
            author: string,
            publicationYear: number
        }) => this; // why use this 
    }

    export interface request extends express.Request {
        body: {
            title: string,
            author: string,
            publicationYear: number
        }
        // why this shype
    }
}

export default Book;