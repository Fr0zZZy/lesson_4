const mainRouter = require('./routes/index')
const PORT = process.env.PORT || 5000
const express = require('express')
const app = express()
app.use(express.json())
app.use(mainRouter)
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))