
import express from 'express';
import data from './data/data.js';
import typeOfBooks from './types/book.js';


const app = express();
const PORT = 3000;
app.use(express.json());



app.get('/book', (req, res) => {
    const titles = data.map(book => book.title);
    console.log(titles)
    res.status(200).send(`All titles of books`);
});


app.get('book/search/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = data.find((book) => book.id === bookId)
    console.log(book)

    res.status(200).send(`book of data`);
});


app.post('/book/add', (req: typeOfBooks.request, res: typeOfBooks.response) => {

    const { title, author, publicationYear } = req.body;

    const newBook: typeOfBooks.book = {
        id: data.length + 1,
        title: req.body.title,
        author: req.body.author,
        publicationYear: req.body.publicationYear,
    }
    data.unshift(newBook);
    console.log(data)

    res.status(200).send("Book Created!");
});


app.put('/book/update/:id', (req, res) => {
    const bookId = parseInt(req.params.id)
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === bookId) {
            data[i] = { ...data[i], ...req.body }
        }
    }
    res.status(200).send('Successful update')
});

app.delete('/students/delete/:id', (req, res) => {

    const bookId = parseInt(req.params.id)
    let found = data.findIndex((book) => book.id === bookId)
    if (found >= 0) {
        data.splice(found, 1)
        res.send(200).send('Success')
    } else {
        res.status(404).send("Error")
    }
})

app.get('/book/searchByName', (req, res) => {
    const bookTitle = req.query.title?.toString();
    if (!bookTitle) {
        res.status(404).send(`Error`)
    } else {
        const found = data.filter((book) => book.title.toLowerCase() === bookTitle.toLowerCase());
        console.log(found)
    }
    res.status(200).send(`Query search `)
});

app.get('/book/searchByYear', (req, res) => {
    const searchByYear = req.query.publicationYear?.toString();
    if (!searchByYear) {
        res.status(404).send(`Error`)
    } else {
        const found = data.filter((book) => book.title.toLowerCase() === searchByYear.toLowerCase());
        console.log(found)
    }
    res.status(200).send(`Query search `)

});

app.listen(PORT, () => {
    console.log(`app is listening on :${PORT}`);
});
