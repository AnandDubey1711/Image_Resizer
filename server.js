const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const { processCSV } = require('./csv.js'); 

const app = express();
const PORT = 3000 || process.env.PORT;


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// path to provide and handle file from the given path within the root 
app.use(express.static('public'));

// Multer is used for handling the file uplaod and the files uploaded on the local storage are then processed using the endpoints
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() +'-' + file.originalname)
  }
})
// this is used to obtain the stored data with the folder 
const uplaod = multer({storage: storage})


// creating the route for at which post request is made after the image is processed and the resized image is provided back to the html 
app.post("/uplaod_image", uplaod.single('image'), async (req,res)=>{
  const imagePath = req.file.path;
  cloudinary.uploader.upload(imagePath, {width: 0.5, crop:'scale'}, (err, result)=>{
    // In case the code fails the error part handles the exception
    if(err){
      console.error("Error uplaoding image",err);
      return res.status(500).send("Error uploading image")
    }
    let processed_image_url = result.secure_url;
    // res.send({message:"Image Proceesed successfully"})
    res.json({
      message: 'Image uploaded successfully!', 
      url: processed_image_url,
    });
  })
})

const csvStorage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'csvUploads/');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() +'-' + file.originalname)
  }
})
// this is used to obtain the stored data with the folder 
const csvUpload = multer({storage: csvStorage})

app.post("/upload-csv", csvUpload.single('csvfile'), async (req, res) => {
  const csvFilePath = req.file.path; // Get the uploaded CSV file path

  try {
    // Process CSV file and get the compressed image URLs
    const compressedUrls = await processCSV(csvFilePath);
    res.json({
      message: 'CSV processed and images uploaded successfully!',
      urls: compressedUrls
    });
  } catch (error) {
    console.error('Error processing CSV:', error);
    res.status(500).send('Error processing CSV');
  }
});



app.listen(PORT, ()=>{
  console.log(`Server is running on localhost ${PORT}`)
})