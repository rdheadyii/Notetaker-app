// import express/ fs/ path
const express = require('express');
const path = require('path');
const fs = require('fs');

// helper functions for reading/writing/deleting
const { readFromFile, readAndAppend, deleteFromFile } = require('./helpers/fsUtils');

// logic for generating id number
const uuid = require('./helpers/uuid');

// define express as a variable
const app = express();

// define the port
const PORT = process.env.PORT || 3001;

// array for notes
const notesArray = [];

// need to set middleware for json/ html encoded
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// need static path for homepage
app.use(express.static('public'));

// need get for notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// need a get
app.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/db/db.json'))
);

// need a post

// need get for homepage
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// need a listener for port
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));