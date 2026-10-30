// Ad Maiorem Dei Gloriam!
import { DatabaseSync } from "node:sqlite";
import express from "express";
import postRoute from "./src/routes/postRoute.js";

const connection = new DatabaseSync(":memory:");

function getInitialQuery() {
    return `
        PRAGMA foreign_keys = ON;
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            email TEXT,
            password_hash TEXT,
            role TEXT NOT NULL DEFAULT 'USER'
        );   

        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY,
            author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            title TEXT NOT NULL,
            body TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY,
            post_id  INTEGER NOT NULL REFERENCES posts(id),
            author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            content TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now'))
        ); 
    `
}
connection.exec(getInitialQuery());

const app = express();
const PORT = 8080;

// Feed?
const mockPosts = [];

app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/posts/", postRoute)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Access http://localhost:${PORT}`);
});