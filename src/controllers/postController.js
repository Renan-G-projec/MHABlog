// Ad Maiorem Dei Gloriam!
import express from "express";

const maximumNumberOfPosts = 10;
const mockPosts = [];

export function getPostsFeed(req, res) {
    res.send(mockPosts);
}

export function createPost(req, res) {
    // TODO: this function needs to handle user authentication, as in the bleg only moderators or adming should be able to create posts.
    const {title, body} = req.body;
    if (!title || !body) {
        return res.status(400).send({ success: false, reason: "Bad Request: No title or body."});
    }

    mockPosts.push({title, body})
    res.send({success: true, reason: "Created Successifully the post!"});
}