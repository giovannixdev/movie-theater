const express = require("express")
const { User, Show } = require("../models/index")

const router = express.Router()
router.use(express.json())

// GET all shows
router.get("/", async (req, res) => {
  const shows = await Show.findAll()
  res.json(shows)
})

// GET one show
router.get("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id)
  if (show) {
    res.json(show)
  }
  else {
    res.status(404).send({ message: "Show not found!" })
  }
})

// GET shows of a particular genre(genre in req.params)
router.get("/genres/:genre", async (req, res) => {
  const shows = await Show.findAll({
    where: { genre: req.params.genre },
  })
  res.json(shows)
})

// router.post("/", async (req, res) => {
//   const show = await Show.create(req.body)
//   res.status(201).json({ message: "Show created!" })
// })

// DELETE a show
router.delete("/:id", async (req, res) => {
  const show = await Show.destroy({
    where: { id: req.params.id },
  })
  if (show) {
    res.json({ message: "Show deleted!" })
  }
  else {
    res.status(404).json({ message: "Show not found!" })
  }
})

module.exports = router