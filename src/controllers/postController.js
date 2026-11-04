// Ad Maiorem Dei Gloriam!
import postModel, { Post } from "../models/postModel.js";

const maximumNumberOfPosts = 20;

export function getPostsFeed(req, res) {
    res.render("index", { posts: postModel.getRecentPosts(maximumNumberOfPosts) });
}

export function createPost(req, res) {
    // TODO: this function needs to handle user authentication, as in the bleg only moderators or adming should be able to create posts.
    const { title, body } = req.body;
    const author_id = 0; // Template. The user shall send a token and then the server should consult the author id.

    if (!title || !body) {
        return res.status(400).send({ success: false, reason: "Bad Request: No title or body."});
    }

    postModel.createPost(new Post(author_id, title, body));

    res.send({success: true, reason: "Created Successfully the post!"});
}   