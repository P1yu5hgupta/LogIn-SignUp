const { Client } =require('pg')
const config = require("./config")

const database = new Client({
    connectionString : config.dbConnection
})

database.connect().then(()=>{
    console.log("Database connection success")
}).catch((err)=>{
    console.log("Error in Database Connection:" + err)
})

module.exports= database