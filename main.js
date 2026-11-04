// Ad Maiorem Dei Gloriam!
import path from "node:path";
import express from "express";
import { getPostsFeed } from "./src/controllers/postController.js";
import postRoute from "./src/routes/postRoute.js";


const app = express();
const PORT = 8080;

// Feed?

app.use(express.static(path.resolve(import.meta.dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.resolve(import.meta.dirname, 'src', 'views'));
app.set("view engine", "ejs");

app.get("/", getPostsFeed);
app.use("/posts/", postRoute);

app.listen(PORT, (err) => {
    if (err) {
        console.log(`${err.name}: ${err.message}`)
        return;
    }
    console.log(`Listening on port ${PORT}`);
    console.log(`Access http://localhost:${PORT}`);
});