
# Project Title

This is an Image Resizer project which uses the capabilities of NodeJS and Cloudinary combined which allows to resize the image to a lower size (around 50% percent or less). 
At this moment the API takes a CSV file with the format mentioned and parses the CSV file after which the current file data is obtained as well as the new URL of the compressed image is obtained on ./data endpoint.

# Improvements and Contributions


Anyone who wants to contribute is welcome and can download the project locally in their systems. All one needs is NodeJS and Cloudinary account for other credentials. 

The improvements currently under development is adding MongoDB as the database to store the processed URLs. 

After adding database connectivity next step is to create a input system which takes an image url instead of CSV file from which the image is compressed and the data is pushed to the MongoDB.

Next functionality is to provide the user with the option to compress the image based on his own requirements and also change other aspects of the image as well. 
