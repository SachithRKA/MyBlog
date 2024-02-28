import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {posts: posts});
});

app.get("/post", (req, res) => {
    const postTitle = req.query.postTitle;
    const postContent = req.query.postContent;

    res.render("post.ejs", {postTitle, postContent});
});

app.get("/delete", (req, res) => {
    const postTitle = req.query.postTitle;
    const postIndex = posts.findIndex(post => post.title === postTitle);

    if (postIndex !== -1) posts.splice(postIndex, 1);
    res.redirect("/");
});

app.post("/update", (req, res) => {
    console.log(req);
});

app.post("/submit", (req, res) => {
    const postTitle  = req.body["post-title"];
    const postContent = req.body["post-content"];

    const postsTemp = {
        title: postTitle,
        content: postContent,
    }

    posts.push(postsTemp);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});  
