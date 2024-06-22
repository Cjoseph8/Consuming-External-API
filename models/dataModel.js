const mongoose = require("mongoose");


const dataSchema = new mongoose.Schema({
    userId: {
        type: Number
    },
    postId:{
        type: Number
    },
    title:{
        type: String,
        require: [true, "Title is required."]
    },
    body:{
        type: String,
        require: [true, 'Content is required.']
    },
    createAt:{
        type: Date,
        default: Date.now
    }
});

const dataModel = mongoose.model("data", dataSchema);

module.exports = dataModel;