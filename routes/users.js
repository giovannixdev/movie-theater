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

// router.post("/", async (req, res) => {
//   const user = await User.create(req.body)
//   res.status(201).json({ message: "User created!"})
// })

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