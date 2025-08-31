const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = async (req, res) => {
  // Placeholder: Integrate Cloudinary upload logic here
  // Expecting image file in req.body.image
  res.json({ imageUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg' });
};
