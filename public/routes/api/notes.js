const express = require("express");

const fs = require("fs");

const app = express();



app.get("/", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    const notes = JSON.parse(data);
    res.json(notes);
    
  });
});

app.post("/", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
   
  
    const existingNotes = JSON.parse(data);
    console.log("existingNotes",existingNotes);
    existingNotes.push(req.body);
   mainNotes = existingNotes.map((existingNotesItem, index) => {
        existingNotesItem.id = index+1
        return existingNotesItem ;
    });
    console.log("mainNotes", mainNotes)
   
    fs.writeFile("./db/db.json", JSON.stringify(existingNotes), (err, data) => {
      if (err) {
        return res.status(500).json("File did not save");
      }
      res.status(200).json("File Saved");
    });
  });
});

// app.delete('/:id', (req,res) => {
//   fs.readFile("./db/db.json", "utf-8",(err, data) => {
//   if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   console.log(data);
//   let note = JSON.parse(data);
//   const noteToRemove = note.find((element) => { 
//     console.log('element id', element.id)
//   console.log('req.params.id', req.params.id)
//      if (element.id === req.params.id){
//       return true
//      }
//     console.log(" element", element)
//   });
//   console.log("noteToRemove", noteToRemove)
//   // if (foundNote === -1) {
//   //   return res.status(404).json({ error: 'Note not found' });
//   // }
//   const splice = note.splice(noteToRemove, 1);

//   console.log("splice", splice)
//   fs.writeFile('./db/db.json', JSON.stringify(note, null, 2), err => {
//     console.log("note", note)
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Internal server error' });
//     }

//     res.json({ message: 'Note deleted successfully' });
//   });
//   })
// })

app.delete('/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log(data);
    let notes = JSON.parse(data);
    const foundNoteIndex = notes.findIndex((note, index) => {
       note.id === req.params.id
       console.log('req.params.id', req.params.id)
       return index
      });
    console.log('foundNoteIndex',foundNoteIndex)

    if (foundNoteIndex === -1) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const removedNote = notes.splice(foundNoteIndex, 1)[0]; // Access the first element
    console.log(' removedNote', removedNote)

    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
      console.log('notes', notes);
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.json({ message: 'Note deleted successfully', deletedNote: removedNote });
    });
  });
});
module.exports = app