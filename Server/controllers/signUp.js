const database = require("../db.js")

const signUp = async (req,res)=>{
    console.log(req.body)
    try{
        const result = await database.query('SELECT * FROM "user" WHERE "email" = $1',[req.body.email])
        // check if user with that email is already in database?
        if(result.rows.length==0){
            await database.query('INSERT INTO "user" ("email","firstName","lastName","password") VALUES ($1,$2,$3,$4)',
                    [req.body.email,req.body.fname,req.body.lname,req.body.password])
            res.json({
                message: "User created! Can Login Now.",
                status: true
            })
        }
        else{
            res.json({
                message: "User already exists",
                status : false
            })
        }
    }
    catch(err){
        console.log(err)
    }
}

module.exports = signUp