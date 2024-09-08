
# Project Description

This is an Image Resizer project which uses the capabilities of NodeJS and Cloudinary combined which allows to resize the image to a lower size (around 50% percent or less). 
At this moment the API takes a CSV file with the format mentioned and parses the CSV file after which the current file data is obtained as well as the new URL of the compressed image is obtained on ./upload-csv endpoint apart from that it allows compressing of a standalone image as well from the uplaod_image endpoint.

# Flow of project
The project works in three stages first there is a form which takes input from the user after which there is a middleware created using multer which allows to temporarily store the data at a specified destination folder and also helps in providing the file/images from the frontend. After storing the data temporarily the data is then processed by the endpoint based on the which folder the data has been provided to and after that the cloudinary is utilized to scale down the image and if the processing is successfull then a url in case of CSV and an image in case of stand-alone image is obtained. 

# Installation
To set up the project locally you need to have Node.JS, a Clodinary account with Keys and you need to create two folders named csvUploads for storing the CSV files and uploads for storing the image files in the root folder.
To run the project you need to run npm install first followed by npm start after which you need to open the localhost:3000 or your specified PORT on your local machine

# Improvements and Contributions

Anyone who wants to contribute is welcome and can download the project locally in their systems. All one needs is NodeJS and Cloudinary account for other credentials. 

✔ After adding database connectivity next step is to create a input system which takes an image url instead of CSV file from which the image is compressed and the data is pushed to the MongoDB. 

✔ Allowing users to upload stand alone images instead of CSV files.

The improvements currently under development is adding MongoDB as the database to store the processed URLs. 

Next functionality is to provide the user with the option to compress the image based on his own requirements and also change other aspects of the image as well. 

Addding CSS styling to the frontend part of the project.
