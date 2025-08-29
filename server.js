import express from 'express'
import dotenv from 'dotenv'
import connectDb from './src/config/conn.js'
import router from './src/routes/routes.js'
dotenv.config({ quiet: true })
connectDb()

const app = express()
app.use(express.json());
app.use('/api', router)
const port = 3000 || process.env.PORT
app.listen(port, () => {
    console.log(`Server Running On:- ${port}`)
})