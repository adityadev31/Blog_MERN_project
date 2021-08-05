const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// =========== REGISTER ===========
router.post("/register", async (req, res)=>{
   try{
      const newUser = new User({
         username: req.body.username,
         email: req.body.email,
         password: await bcrypt.hash(req.body.password, 10),
      })

      const data = await User.findOne({username: newUser.username});
      if(data) return res.status(401).json("Username already taken !");

      const user = await newUser.save();
      const {password, ...other} = user._doc;
      res.status(200).json(other);
   } catch(err){
      res.status(500).json(err);
   }
});


// =========== LOGIN =============
router.post("/login", async (req, res)=>{
   try{
      const user = await User.findOne({username: req.body.username})
      !user && res.status(400).json("User does not exist !")

      const validated = await bcrypt.compare(req.body.password, user.password)
      !validated && res.status(400).json("Wrong credentials !")

      const{ password, ...others} = user._doc;
      res.status(200).json(others);
   } catch(err){
      res.status(500).json(err);
   }
});


module.exports = router;