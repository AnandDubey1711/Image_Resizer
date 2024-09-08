const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const csv = require("fast-csv");
const fs = require("fs")

const processCSV = (csvFilePath) => {
  const stream = fs.createReadStream(csvFilePath);

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
        let uploadPromise = cloudinary.uploader
          .upload(website, {
            width: 0.5,
            crop: "scale",
          })
          .then((result) => {
            compressed_url.push(result.secure_url);
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });

        uploadPromises.push(uploadPromise);
      }

      Promise.all(uploadPromises).then(() => {
        console.log("All images processed:", compressed_url);
      });
    });

  console.log(websites);
};

module.exports = { processCSV };
