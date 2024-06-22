const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController.js");


// all data route
router.get("/data", dataController.allData);
// get one route
router.get("/data/:id", dataController.getOne);
// create post route
router.post("/data", dataController.createPost);
// Updata a POST
router.put("/data/:id", dataController.upDate);
//Delete a post
router.delete("/data/:id", dataController.delete)


// export router
module.exports = router;