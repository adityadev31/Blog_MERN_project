const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categories");
const multer = require("multer");
const cors = require("cors");
const { diskStorage } = require("multer");
const path = require("path");
const PORT = process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

// ============= DB Connect =============
mongoose
.connect(MONGO_URL, { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("DB Connected"))
.catch((err) => console.log(err));


// =========== Storage ===============

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "images");
   }, filename: (req, file, cb) => {
      cb(null, req.body.name);
   },
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"),(req, res) => {
   res.status(200).json("file has been uploaded");
})


// =========== Routes ================

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoriesRoute);

// =========== START SERVER ==========

app.listen(PORT, ()=> {
   console.log("Backend is running");
});


