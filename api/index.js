const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const cookieParser = require("cookie-parser");

const uploadMiddleware = multer({ dest: "Uploads/" });

const salt = bcrypt.genSaltSync(10);
const secretKey = "revolution10600";

const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(cookieParser());
app.use("/Uploads", express.static(__dirname + "/Uploads"));

mongoose.connect("mongodb://localhost:27017/blogger");

//user signup
app.post("/signup", async (req, res) => {
    const { email, password, cpassword } = req.body;
    if (password === cpassword) {
        try {
            const userDoc = await User.create({
                email,
                password: bcrypt.hashSync(password, salt)
            });
            res.json(userDoc);
        } catch (error) {
            res.status(400).json(error);
        }
    } else {
        console.log(`Password did not match`);
    }
})

//user login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({ email, id: userDoc._id }, secretKey, {}, (err, token) => {
            if (err) {
                throw err;
            }
            res.cookie("token", token).json({
                id: userDoc._id,
                email,
            });
        })
    } else {
        res.status(400).json("Please use correct credentials");
    }
})

//setting user profile for user details and auth
app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secretKey, {}, (err, info) => {
        if (err) {
            throw err;
        }
        res.json(info);
    });
});

//user logout
app.post("/logout", (req, res) => {
    res.cookie("token", "").json("ok");
})

//create post for logged in users
app.post("/createPost", uploadMiddleware.single("file"), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    const { token } = req.cookies;
    jwt.verify(token, secretKey, {}, async (err, info) => {
        if (err) {
            throw err;
        }
        const { title, description } = req.body;
        const postDoc = await Post.create(
            {
                title,
                description,
                coverImage: newPath,
                author: info.id,

            }
        )
        res.json({ postDoc });
    })
})

//edit post only for logged in users and they can only edit their own posts
app.put("/editPost", uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        newPath = path + "." + ext;
        fs.renameSync(path, newPath);
    }
    const { token } = req.cookies;
    jwt.verify(token, secretKey, {}, async (err, info) => {
        if (err) {
            throw err;
        }
        const { id, title, description } = req.body;
        const postDoc = await Post.findById(id);
        console.log(postDoc);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            res.status(400).json("You are not the author");
        }
        // await postDoc.Update({
        //     title,
        //     description,
        //     coverImage: newPath ? newPath : postDoc.coverImage,
        // });
        const respondme = await Post.findByIdAndUpdate(id, {
            title,
            description,
            coverImage: newPath ? newPath : postDoc.coverImage,
        })
        res.json(respondme);
    });
});

//fetch all the posts
app.get("/posts", async (req, res) => {
    const posts = await Post.find()
        .populate("author", ["email"])
        .sort({ created_at: -1 })
        .limit(20);
    res.json(posts);
})

//fetching only a particular post
app.get("/post/:id", async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['email']);
    res.json(postDoc);
})

const port = 4000;

app.listen(port, () => {
    console.log(`Blog App listening at http://localhost:${port}`);
})