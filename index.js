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
    posts.pop(posts.postTitle);
    res.redirect('/');
});

app.post("/update", (req, res) => {
    const postTitleUpdate  = req.body["post-title"];
    const postContentUpdate = req.body["post-content"];

    const postTitle = req.query.postTitle;
    const postContent = req.query.postContent;
    
    console.log(postTitle);
    console.log(postContent);

    console.log(postContentUpdate);
    console.log(postTitleUpdate);

    updatePost(postTitle, postContent, postTitleUpdate, postContentUpdate);
});

app.post("/submit", (req, res) => {
    const postTitle  = req.body["post-title"];
    const postContent = req.body["post-content"];

    const postsTemp = {
        title: postTitle,
        content: postContent,
    }

    posts.push(postsTemp);
    console.log(posts);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});  

function updatePost(postTitleE, postContentE, updateTitle, updateContent) {
    for (var i = 0; i < posts.length; i++) {
        if (posts[i].title === postTitleE && posts[i].content === postContentE)
        {
            posts[i].title = updateTitle;
            posts[i].content = updateContent;
        }
    }
}