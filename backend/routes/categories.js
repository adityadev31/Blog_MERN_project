const router = require("express").Router();
const Category = require("../models/Category");

// ========== add category ==========
router.post("/", async (req, res) => {
   const newCat = new Category(req.body);
   try {
      const savedCat = await newCat.save();
      res.status(200).json(savedCat);
   } catch (err) {
      res.status(500).json(err);
   }
});

// ============ all categories ========
router.get("/", async (req, res) => {
   try {
      const savedCats = await Category.find();
      res.status(200).json(savedCats);
   } catch (err) {
      res.status(500).json(err);
   }
});

module.exports = router;