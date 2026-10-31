// Ad Maiorem Dei Gloriam!
import { DatabaseSync } from "node:sqlite"

const connection = new DatabaseSync("main.db");

function getInitialQuery() {
    return `
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
connection.exec("PRAGMA foreign_keys = ON;")
connection.exec(getInitialQuery());

export { getInitialQuery };
export default connection;