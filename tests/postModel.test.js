// Ad Maiorem Dei Gloriam!
// Test stuff
import { describe, it } from "node:test";
import assert from "node:assert";

import { DatabaseSync } from "node:sqlite";
import { getInitialQuery } from "../src/dbConnection.js";
import { PostModel, Post } from "../src/models/postModel.js";

const db = new DatabaseSync(":memory:");
db.exec("PRAGMA foreign_keys = OFF;");
db.exec(getInitialQuery());

const model = new PostModel(db);

describe("PostModel Test Suite", () => {
    it("Should create 3 posts", () => {
        model.createPost(new Post(0, "First", "first"));
        model.createPost(new Post(1, "Second", "Second"));
        model.createPost(new Post(2, "Third", "third"));

        assert.strictEqual(model.getRecentPosts(10).length, 3);
    })

    it("Should return in descending order.", () => {
        assert.ok(model.getRecentPosts(10)[0].id == 3)
    })
})