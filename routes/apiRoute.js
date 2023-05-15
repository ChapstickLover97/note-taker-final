const fs = require('fs');
const uuid = require('uuid');
const express = require('express');
const app = express();


app.get('/notes', (req, res) => {
  fs.readFile('./Develop/db/db.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

app.post('/notes', (req, res) => {
  const newNoteId = uuid.v4();
  const newNote = {
    id: newNoteId,
    title: req.body.title,
    text: req.body.text,
  };
  const notes = JSON.parse(fs.readFileSync('./Develop/db/db.json', 'utf-8'));
  notes.push(newNote);
  fs.writeFileSync('./Develop/db/db.json', JSON.stringify(notes));
  res.json(newNote);
});

module.exports = app;