// Ad Maiorem Dei Gloriam!
import { describe, it } from "node:test"
import assert from "node:assert"

import { DatabaseSync } from "node:sqlite";
import { getInitialQuery } from "../src/dbConnection.js";
import { UserModel, User } from "../src/models/userModel.js";

const db = new DatabaseSync(":memory:");
db.exec("PRAGMA foreign_keys = OFF;");
db.exec(getInitialQuery());

const model = new UserModel(db);

describe("User model Test Suit", () => {
    it("Should create 4 users", () => {
        model.createUser(new User("Renan", "renan@gmail.com", "NDEIKndkUNFB*^&", "USER"));
        model.createUser(new User("Bruno", "bruno@gmail.com", "NW7dsBUJy6BSJH6", "USER"));
        model.createUser(new User("Roberto", "roberto@gmail.com", "*(ShN Cu^BWSY8", "USER"));
        model.createUser(new User("Carlos", "carlos@gmail.com", "Nas21bdUb]|w*^&", "USER"));

        assert(model.getUserById(5) == null, "Should return null, as the user id start at 1");
        assert(model.getUserById(4).id != undefined, "Should return NOT null as we created at least 4 users");
    });
});