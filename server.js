// import express/ fs/ path
const express = require('express');
const path = require('path');

// helper functions for reading/writing/deleting
const { readFromFile, readAndAppend, writeToFile } = require('./helpers/fsUtils');

// logic for generating id number
const uuid = require('./helpers/uuid');

// define express as a variable
const app = express();

// define the port
const PORT = process.env.PORT || 3001;

// need to set middleware for json/ html encoded
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// need static path for homepage
app.use(express.static('public'));

// get for notes pages
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// get for all notes
app.get('/api/notes', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// post new note to db
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
        title,
        text,
        id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding note');
    }
});

// deletes a note from db
app.delete('/api/notes/:id', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        const ogData = JSON.parse(data);
        console.log(ogData);
        console.log(req.params.id);
        const newData = ogData.filter(note => note.id !== req.params.id);
        console.log(newData);
        // write file with new data
        writeToFile('./db/db.json', newData);
    })
});

// catch all get for homepage
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// listener for port
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));