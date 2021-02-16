const database = require("../db.js")

const signIn = async (req,res)=>{
    console.log(req.body)
    try{
        const result = await database.query('SELECT * FROM "user" WHERE "email" = $1',[req.body.email])
        
        // CHECK IF USER DOESN'T EXIST
        if(result.rows.length==0){
            res.json({
                message: "User doesn't exist!",
                status: false
            })
        }
        // If password do not match
        else if(req.body.password!=result.rows[0].password){
            res.json({
                message: "Incorrect Password! Try Again!",
                status : false
            })
        }
        // if authentication is done
        else{
            let data=result.rows[0]
            data.status=true
            res.json(data)
        }
    }
    catch(err){
        console.log(err)
    }
}

module.exports = signIn