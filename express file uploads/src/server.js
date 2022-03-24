const app = require("./index")

const connect = require("./configs/db")

app.listen(3900, async (req , res)=>{
    try{
        await connect()
       console.log("listening port 3900")
    }catch(err){
        console.error(err.msg)
    }
})