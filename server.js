const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//TODO

app.use(express.json());

app.listen(port, () => {
  sequelize.sync();
  console.log(`Listening on port ${port}`);
});

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

app.post("/musicians", async (req, res) => {
  try {
    const { name, instrument } = req.body;
    const musician = await Musician.create({
      name,
      instrument,
    });
    res.status(201).json(musician);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occured while creating the musician");
  }
});

app.put("/musicians/:id", async (req, res) => {
  try {
    const { name, instrument } = req.body;
    const updatedMusician = await Musician.update(
      {
        name,
        instrument,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (updatedMusician[0]) {
      res.status(200).send("Musician updated successfully");
    } else {
      res.status(404).send("Musician not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occured while retrieving musicians");
  }
});

app.delete("/musicians/:id", async (req, res) => {
  try {
    const deletedMusician = await Musician.destroy({
      where: { id: req.params.id },
    });
    if (deletedMusician) {
      res.status(200).send("Musician deleted successfully");
    } else {
      res.status(404).send("Musician not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occured while deleting musician");
  }
});