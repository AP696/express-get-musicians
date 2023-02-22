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

app.get('/musicians', async (req, res) => {
    try {
        const musicians = Musician.findAll();
        res.json(musicians);
    } catch (err) {
        console.log(err)
        res.status(500)
    }

})