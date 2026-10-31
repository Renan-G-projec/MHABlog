// Ad Maiorem Dei Gloriam!
import express from "express";
import postRoute from "./src/routes/postRoute.js";


const app = express();
const PORT = 8080;

// Feed?

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/posts/", postRoute)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Access http://localhost:${PORT}`);
});