const express = require('express');
const path = require("path");
const fs = require("fs");
const util = require("util")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const getDB = () =>
  JSON.parse(
    fs.readFileSync(path.join(__dirname, "db", "db.json"), {
      encoding: "utf-8",
    })
);

const saveDB = (data) =>
  fs.writeFileSync(
    path.join(__dirname, "db", "db.json"),
    JSON.stringify(data),
    { encoding: "utf-8" }
);

notes = []

app.get("/notes", (req, res) => 
res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.post('/notes', (req, res) => {
  const notes = req.body;
  res.json(notes);
});

//nicks notes

// const readFileAsync = util.promisify(fs.readfile);
// const writeFileAsync = util.promisify(fs.writeFile);

// const getNotes =  () =>{
//   return fs.readFileAsync("db/db.json", "utf8").then((notes) => {
//   return JSON.parse(notes);
//   });
// };

// app.get("/api.notes", (req, res) => {
//   getNotes().then((notes) => {
//     res.JSON(notes);
//   });
// });

// app.post("api/notes",(req, res) => {
//   const allNotes = notes;
//   allNotes.push(newNote);
//   return writeFileAsync("db/db.json", JSON.stringify(allNotes)).then(() =>{
//     res.json(newNote);
//   });
// });


app.use(express.static("public"));

app.get('/', (req, res) => {
console.log(req.url);
  res.sendFile(path.join(__dirname, "public/index.html"))
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));