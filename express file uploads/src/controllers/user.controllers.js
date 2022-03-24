const express = require("express")
const req = require("express/lib/request")


const User = require("../models/user.models")
const uploads = require("../middlewares/uploads")
const router = express.Router()

router.get("", async (req,res)=>{
   try{
       const user = await User.find().lean().exec()
   
       return res.status(200).send(user)
   } catch(err){
   return res.status(500).send({msg:err.msg})
   }
})

router.post("/", uploads.single("profile_pic"),async (req,res)=>{
    try{
      const user = await User.create({
          first_name:req.body.first_name,
          last_name:req.body.last_name,
          profile_pic:req.body.path
      })
      return res.status(201).send(user)
    }catch(err){
        return res.status(500).send({msg:err.msg})
    }
})

router.post("/gallery", uploads.any("profile_pic"),async (req,res)=>{
    try{
        const filePaths = req.files.map((file) => {
            return file.path;
          });

      const user = await User.create({
          first_name:req.body.first_name,
          last_name:req.body.last_name,
          profile_pic:req.body.path
      })
      return res.status(201).send(user)
    }catch(err){
        return res.status(500).send({msg:err.msg})
    }
})

router.patch("/:id",uploads.single("profile_pic"),async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body).lean().exec()

       return res.status(200).send(user)
    }catch(err){
        return res.status(500).send({msg:err.msg})
    }
})

router.delete("/:id",uploads.single("profile_pic"),async (req,res)=>{
    try{
          const user = await User.findByIdAndDelete(req.params.id).lean().exec()
          return res.status(200).send(user)
    }catch(err){
        return res.status(500).send({msg:err.msg})
    }
})

module.exports= router