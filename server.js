const express = require('express');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

notes = []

app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.get("/notes", (req, res) => 
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.post('/notes', (req, res) => {
    const notes = req.body;
    res.json(notes);
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));