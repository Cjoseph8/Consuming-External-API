require("dotenv").config();
const express = require("express");
const dataModel = require("../models/dataModel");
const axios = require("axios");


// get all data from the external API
exports.allData = async (req, res)=>{
    try{
        const externalDataResponse = await axios.get(process.env.EXTERNAL_API_URI);
        const externalData = externalDataResponse.data

        for (const item of externalData){
            const existingData = await dataModel.findOne({postId: item.id})

            if(!existingData){
                const newData = new dataModel({
                    userId: item.userId,
                    postId: item.id,
                    title: item.title,
                    body: item.body
                })

                await newData.save()
            }
        }

        const myData = await dataModel.find();
        res.status(200).json({
            message: "Data",
            data: myData
        })
    }catch(error){
        console.log(error)
    }
}

// get one post
exports.getOne = async (req, res)=>{
    try{
        const id = req.params.id;
        const post = await dataModel.findOne({postId: id})
        res.status(200).json({
            message:` Post with id: ${id} is found.`,
            data: post
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

// create a post
exports.createPost = async (req, res)=>{
    try{
        const externalDataResponse = await axios.get(process.env.EXTERNAL_API_URI, req.body);
        const newData =  new dataModel({
            userId: req.body.userId,
            postId: req.body.postId,
            title: req.body.title,
            body: req.body.body
        });

        await newData.save();
        res.status(201).json({
            message: "Created successfully",
            data: newData
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
};

// UPDATE 
exports.upDate =async(req, res)=>{
    try{
        const id = req.params.id
        const updateBase = await dataModel.findOneAndUpdate({postId:id},req.body, {new:true})
        //  const updateBase = await dataModel.findByIdAndUpdate({postId:id}, req.body, {new:true})
         if(!updateBase) {
            res.status(404).json({
                message:`Data with ID: ${id} is not Updated Sucessfully.`
            })
         }else {
            res.status(200).json({
                message:`Data with ID: ${id} is now Updated Successfully.`,
                data: updateBase
            })
         }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
};
 //DELETE
exports.delete = async(req, res)=>{
    try{
        const deleteId = req.params.id
        const deletedDocument = await dataModel.findOneAndDelete( {postId:deleteId}, req.body);
        // const deletedDocument = await dataModel.findByIdAndDelete(deleteId);
        //check if Deleted Successfully
        if(!deletedDocument){
            res.status(404).json({
                message:`Document with ID: ${deleteId} has Not  been DELETED.`
            })
        }else{
            res.status(200).json({
                message:`Document with ID: ${deleteId} is DELETED Successfully.`

            })
        }
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}