const File = require('../models/File');

//localfileupload
exports.localFileUpload = async(req,res)=>{
    try{

        //fetch file from request
        const file = req.files.file;
        console.log("file: ", file)

        //create a path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path: ", path);

       //add path to the move function
        file.mv(path,(err)=>{
            console.log(err)
        })

        //successfull response
        res.json({
            success: true,
            message :"Local file uploaded successfully"
        })

    }catch(err){
        console.log(error)
    }
}