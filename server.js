require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const dataRouter = require("./routes/dataRouter");

const app = express();
app.use(express.json());
app.use("/api/v1", dataRouter);

const url = process.env.DATABASE_URI;
mongoose.connect(url)
.then(()=>{
    console.log("Successfully established")
})
.catch((error)=>{
console.log(error.message)
})


const port = process.env.PORT || 2106;
app.listen(port, ()=>{
    console.log(`Server is listening to port: ${port}`)
});