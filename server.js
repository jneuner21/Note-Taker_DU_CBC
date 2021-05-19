const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/notes', (req, res) => {
    const notes = req.body;
    res.json(notes);
});

app.get('/', (req, res) => {
    res.json("/index.html");
  });

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));