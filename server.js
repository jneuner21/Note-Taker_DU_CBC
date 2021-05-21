const express = require('express');
const path = require("path");
const fs = require("fs");
const dbObj = require ("./db/db.json");
const { send } = require('process');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(express.static("public"));
app.get('/', (req, res) => {
console.log(req.url);
  res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/notes", (req, res) => 
res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get('/api/notes', (req, res) => {
res.json(dbObj);
});

app.post('/api/notes', (req, res) => {
  const dbObj = require("./db/db.json")
  const newNote = req.body;
  newNote.id = dbObj.length > 0 ? dbObj[dbObj.length - 1].id + 1 : 1;
  dbObj.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(dbObj)
  );
  res.send("newNote");
});


//
app.delete('/api/notes/:id', (req, res) => {
  const idNum = req.params.id;
  console.log(idNum);
  const dbJson = require("./db/db.json");
  const newObj = dbJson.filter((item) => item.id != idNum);
  fs.writeFileSync("./db/db.json", JSON.stringify(newObj));
  newObj = JSON.parse(newObj);
  // res.send(newObj);
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));