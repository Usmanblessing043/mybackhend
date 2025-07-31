const  express = require('express')
const app = express()
const env = require("dotenv").config()
const connect =  require("./Dbconfig/db.connect")
const userrouter = require("./routes/user.routes")
const cors = require('cors')

app.use(cors({origin:'*'}))
app.use(express.json({limit:"50mb"}))
app.use("/user", userrouter)
// app.use(cors({origin:'*'}))
connect()
const port = 3011


app.listen(port,()=>{
    console.log(`app started at port ${port}`);
    
})