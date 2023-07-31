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

// need static path for homepage

// need a get

// need a post

// need a listener for port

// will spread out between other JS pages (modularization)