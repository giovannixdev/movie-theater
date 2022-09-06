const express = require('express')
const app = express()
const seed = require('./seed.js')
const PORT = 3000

const userRouter = require("./routes/users")
app.use("/users", userRouter)
const showRouter = require("./routes/shows")
app.use("/shows", showRouter)

app.listen(PORT, () => {
    // seed();
    console.log(`Server is running on port ${PORT}`)
})