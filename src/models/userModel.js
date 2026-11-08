// Ad Maiorem Dei Gloriam!

import connection from "../dbConnection.js";

class User {
    constructor(username, email, passwordHash, role, id = null) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
        this.id = id;
    }

    static fromDatabaseRow(row) {
        if (!row) return null
        return new User(row.username, row.email, row.password_hash, row.role, row.id);
    }
}

class UserModel {
    constructor(connection) {
        this.db = connection;
        
        this.createUserQuery = this.db.prepare("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?);");
        this.getUserByIdQuery = this.db.prepare("SELECT id, username, email, role FROM users WHERE id = ?;");
    }

    createUser(user) {
        return this.createUserQuery.run(
            user.username,
            user.email,
            user.passwordHash,
            user.role
        );
    }

    getUserById(id) {
        const row = this.getUserByIdQuery.get(id);
        return User.fromDatabaseRow(row);
    }

}

export { UserModel, User };
export default new UserModel(connection);