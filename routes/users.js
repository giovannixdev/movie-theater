const express = require("express")
const { User, Show } = require("../models/index")

const router = express.Router()
router.use(express.json())

// GET all users
router.get("/", async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

// GET one user
router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) res.json(user)
  else res.status(404).send({ message: "User not found!" })
})

// GET all shows "watched by a user"(user id in req.params)
router.get("/:id/shows", async (req, res) => {
  const user = await User.findByPk(req.params.id)
  const userShows = await user.getShows()
  res.json(userShows)
})

// router.post("/", async (req, res) => {
//   const user = await User.create(req.body)
//   res.status(201).json({ message: "User created!"})
// })

// PUT update and add a show if a user has watched it
// Add a user to a show
router.put("/:userId/shows/:showId", async (req, res) => {
  const show = await Show.findByPk(req.params.showId);
  const user = await User.findByPk(req.params.userId);
  if (show) {
    await show.update(req.body)
    // When the user has watched the show then add the user to the show
    await user.addShow(show)
    res.json({ message: "Show updated!" });
  } else {
    res.status(404).json({ message: "Show not found!" });
  }
})

// router.delete("/:id", async (req, res) => {
//   const user = await User.destroy({
//     where: { id: req.params.id },
//   })
//   if (user) {
//     res.json({ message: "User deleted!" })
//   }
//   else {
//     res.status(404).json({ message: "User not found!" })
//   }
// })

module.exports = router