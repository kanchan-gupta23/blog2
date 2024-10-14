const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");

// Create a storage object with a GridFsStorage instance
const storage = new GridFsStorage({
    url: process.env.MONGOOSE_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/jpg", "image/png", "image/jpeg"];

        // Check if the file type is allowed
        if (match.indexOf(file.mimetype) === -1) {
            // If file type is not allowed, return an error or handle it accordingly
            return null; // Return null to prevent uploading unsupported files
        }

        // Return the object with bucket name and filename for allowed file types
        return {
            bucketName: "photos",
            filename: `${Date.now()}--blog-${file.originalname}`
        };
    }
});

// Create a multer instance with the storage configuration
const upload = multer({ storage });

module.exports = upload;
