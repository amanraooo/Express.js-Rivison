const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileupload
exports.localFileUpload = async (req, res) => {
  try {
    //fetch file from request
    const file = req.files.file;
    console.log("file: ", file);

    //create a path where file need to be stored on server
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("path: ", path);

    //add path to the move function
    file.mv(path, (err) => {
      console.log(err);
    });

    //successfull response
    res.json({
      success: true,
      message: "Local file uploaded successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

// file uploader to cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };

  if(quality){
    options.quality = quality
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload
exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, email, tag } = req.body;
    console.log(name, tag, email);

    const file = req.files.imageFile;
    console.log("imageFile: ", file);

    //validation
    const supportedTypes = ["jpg", "png", "jpeg"];
    const fileType = file.name.split(".")[1].toLowerCase();

    //function to check does file type supported
    const isFileTypeSupported = (type, supportedTypes) => {
      return supportedTypes.includes(type);
    };

    if (!isFileTypeSupported(fileType, supportedTypes))
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });

    //if file format is supported upload to cloudinary
    console.log("uploading...");
    const response = await uploadFileToCloudinary(file, "L9");
    console.log("response: ", response);

    const fileData = await File.create({
      name,
      tag,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      sucess: true,
      message: "File uploaded successfully",
      data: response,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Something went wrong ",
    });
  }
};

//video upload
exports.videoUpload = async (req, res) => {
  try {
    //data fetch
    const { name, email, tag } = req.body;
    console.log(name, tag, email);

    const file = req.files.videoFile;
    console.log("imageFile: ", file);

    //validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    //function to check does file type supported
    const isFileTypeSupported = (type, supportedTypes) => {
      return supportedTypes.includes(type);
    };

    if (!isFileTypeSupported(fileType, supportedTypes))
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });

    //if file format is supported upload to cloudinary
    console.log("uploading...");
    const response = await uploadFileToCloudinary(file, "L9");
    console.log("response: ", response);

    const fileData = await File.create({
      name,
      tag,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      sucess: true,
      message: "File uploaded successfully",
      data: response,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Something went wrong ",
    });
  }
};

//image size reducer
exports.imageSizeReducer = async (req, res) => {
  try {
    //data fetch
    const { name, email, tag } = req.body;
    console.log(name, tag, email);

    const file = req.files.imageFile;
    console.log("imageFile: ", file);

    //validation
    const supportedTypes = ["jpg", "png", "jpeg"];
    const fileType = file.name.split(".")[1].toLowerCase();

    //function to check does file type supported
    const isFileTypeSupported = (type, supportedTypes) => {
      return supportedTypes.includes(type);
    };

    if (!isFileTypeSupported(fileType, supportedTypes))
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });

    //if file format is supported upload to cloudinary
    console.log("uploading...");
    const response = await uploadFileToCloudinary(file, "L9", 30);
    console.log("response: ", response);

    const fileData = await File.create({
      name,
      tag,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      sucess: true,
      message: "File uploaded successfully",
      data: response,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Something went wrong ",
    });
  }
};
