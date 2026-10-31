// Ad Maiorem Dei Gloriam!

import connection from "../dbConnection.js";

class Post {
    constructor(id, authorId, title, content, createdAt) {
        this.id = id;
        this.author_id = authorId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }
}

class PostModel {
    constructor(connection) {
        this.db = connection;
        this.table = "posts";
        this.tempPosts = [];
    }
    
    getRecentPosts(numberOfPosts) {
        return this.tempPosts;
    }

    getPostById(postId) {
        return this.tempPosts.find(post => post.id == postId) || null;
    }

    createPost(post) {
        this.tempPosts.push(post)
    }
}

export { PostModel, Post };
export default new PostModel(connection);