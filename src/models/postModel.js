// Ad Maiorem Dei Gloriam!

import connection from "../dbConnection.js";

class Post {
    constructor(authorId, title, body, id = null, createdAt = null) {
        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.body = body;
        this.createdAt = createdAt;
    }

    static fromDatabaseRow(row) {
        if (!row) return null;
        return new Post(
            row.author_id,
            row.title,
            row.body,
            row.id,
            new Date(row.created_at)
        );
    }
}

class PostModel {
    constructor(connection) {
        this.db = connection;
        this.table = "posts";

        this.recentPostsQuery = connection.prepare("SELECT * FROM posts ORDER BY id DESC LIMIT ?;");
        this.postByIdQuery = connection.prepare("SELECT * FROM posts WHERE id = ?;");
        this.createPostQuery = connection.prepare("INSERT INTO posts (author_id, title, body) VALUES (?, ?, ?);");
    }
    
    getRecentPosts(numberOfPosts) {
        const rows = this.recentPostsQuery.all(numberOfPosts);
        return rows.map(row => Post.fromDatabaseRow(row));
    }

    getPostById(postId) {
        const row = this.postByIdQuery.get(postId);
        return Post.fromDatabaseRow(row);
    }

    createPost(post) {
        return this.createPostQuery.run(
            post.authorId,
            post.title,
            post.body
        );
    }
}

export { PostModel, Post };
export default new PostModel(connection);