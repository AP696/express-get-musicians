const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//TODO

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})

app.get("/musicians", async (req, res) => {
  try {
    const musicians = await Musician.findAll();
    res.json(musicians);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

app.get("/musicians/:id", async (req, res) => {
  try {
    const musician = await Musician.findByPk(req.params.id);
    res.send(musician);
  } catch (err) {
    console.log(err);
    res.status(500).send("Cannot find the musician you are looking for");
  }
});