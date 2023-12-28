const Image = require("./images.mongo");
const path = require("path");
const fs = require("fs");
const uuid = require('uuid');



async function addImages(imagesData) {
  console.log("RECEIVED ARG IMAGE: ");
  try {
    const imageDirectory = path.join(__dirname, '..', '..', 'public', 'images');

    // Create a directory for the image if it doesn't exist
    if (!fs.existsSync(imageDirectory)) {
      await fs.mkdirSync(imageDirectory, { recursive: true });
    }

    const imagesArray = [];

    // Process each image
    for (const imageData of imagesData) {
      // Extract image data without the prefix
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');

      // Decode Base64 data
      const bufferData = Buffer.from(base64Data, 'base64');

      // Generate a unique identifier (UUID)
      const uniqueId = uuid.v4();

      // Create a unique file name using the UUID
      const imageFileName = `${uniqueId}_image.jpg`; // Change the extension based on the actual image type
      const imagePath = path.join(imageDirectory, imageFileName);

      // Write the decoded data to the file
      await fs.writeFileSync(imagePath, bufferData);

      // Store the path to the saved image
      const relativePath=path.join('public','images',imageFileName)
      const newImage = new Image({
        imagePath: relativePath,
      });
      await newImage.save();
      imagesArray.push(relativePath);
    }

    // Assuming you want to return an array of image paths
    return imagesArray;

  } catch (err) {
    console.error(`Error adding image: ${err}`);
  }
}



async function getAllImages() {
  try {
    const images = await Image.find({});
    return images;
  } catch (err) {
    console.error(err);
  }
}


// Example API endpoint to serve an image
// app.get('/api/image/:imageName', (req, res) => {
//   const imageName = req.params.imageName;
//   const imagePath = path.join(__dirname, 'images', imageName);

//   // Send the image file as the response
//   res.sendFile(imagePath);
// });

async function getImage(id) {
  try {
    const image = await Image.findById(id);
    return image;
  } catch (error) {
    console.error(error);
  }
}

async function delImage(id) {
  try {
    const imageDeleted = await Image.findByIdAndDelete(id);
    return imageDeleted;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  addImages,
  getAllImages,
  getImage,
  delImage
};
