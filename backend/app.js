// const os =  require('os')
// console.log(os.arch());
// console.log("hello");

const express = require('express')
const app = express()
const database= require("./src/config/db")

database.on("open",()=>{
    app.listen(3030,()=>{
        console.log("server is runing");
    })
})
database.on("error",()=>{
    console.log("error, while connecting the db");
})