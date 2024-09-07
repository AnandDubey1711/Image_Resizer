const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fastcsv = require("fast-csv");
const fs = require("fs");
require('dotenv').config();


const cloudinary = require('cloudinary').v2;

const app = express();
const port = 3000;


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const csv = require("fast-csv");

const stream = fs.createReadStream("customers-100.csv");

const data = [];
const websites = [];
const compressed_url = [];

csv
  .parseStream(stream, { headers: true })
  .on("data", (row) => {
    data.push([row.Index, row.Customer_Id, row.Website]);
  })
  .on("end", () => {
    console.log(data);
    let uploadPromises = [];

    for (let i = 0; i < 1; i++) {
      let website = data[i][2];
      let uploadPromise = cloudinary.uploader.upload(website, {
        width: 0.5,
        crop: "scale"
      }).then(result => {
        compressed_url.push(result.secure_url);
      }).catch(error => {
        console.error('Error uploading image:', error);
      });
      
      uploadPromises.push(uploadPromise);
    }

    Promise.all(uploadPromises).then(() => {
      console.log('All images processed:', compressed_url);
    });
  });

console.log(websites)
app.get("/", (req, res) => {
  res.send("Welcome to the backend application");
});


app.get("/data", async (req, res) => {
  res.send(websites);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});