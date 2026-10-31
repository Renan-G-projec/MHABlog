// Ad Maiorem Dei Gloriam!
import { PostModel, Post } from "../src/models/postModel.js";

function testPostModel() {
    const postModel = new PostModel(null);

    let testsPassed = 0, testsFailed = 0;

    postModel.createPost(new Post(0, 0, "First Post", "This is the first post", new Date()));
    postModel.createPost(new Post(1, 2, "Second Post", "This is the second post", new Date()));
    postModel.createPost(new Post(2, 5, "Second Post", "This is the third post", new Date()));

    if (postModel.tempPosts.length != 3) testsFailed++;
    else testsPassed++;

    if (postModel.getPostById(0).id != 0) testsFailed++;
    else testsPassed++;

    if (postModel.getPostById(2).author_id != 5) testsFailed++;
    else testsPassed++;

    console.log(`[TEST] Post Model: ${testsPassed} tests passed | ${testsFailed} tests failed`);
}

testPostModel()