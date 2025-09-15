const multer = require("multer");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const dotenv = require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Configuing cloud
cloudinary.config(process.env.CLOUDINARY_URL);

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

async function saveFileToDbAndCloud(req, res) {
  const userInReq = req.user;
  const user = await prisma.user.findUnique({
    where: { name: userInReq.name },
  });

  const folderIdInReq = req.body.chooseFolder;
  const folder = await prisma.folder.findFirst({
    where: { id: parseFloat(folderIdInReq) },
  });

  const filename = req.file.originalname;
  console.log("File name is: ", filename);

  // Uploading files to the cloud
  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `${user.name}/${folder.folderName}`,
        use_filename: true,
        filename_override: req.file.originalname,
        resource_type: "raw",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }

        return resolve(result);
      }
    );

    stream.end(req.file.buffer);
  });

  console.log("Upload result (raw):", uploadResult.url);
  console.log(
    "upload result (stringified):",
    JSON.stringify(uploadResult, null, 2)
  );

  // Saving files information in the db
  await prisma.file.create({
    data: {
      filename: req.file.originalname,
      size: `${req.file.size}`,
      type: req.file.mimetype,
      Author: {
        connect: {
          id: userInReq.id,
        },
      },
      folder: {
        connect: {
          id: parseFloat(folderIdInReq),
        },
      },
      publicURL: uploadResult.url,
    },
  });

  res.redirect("/home");
}

async function uploadForm(req, res) {
  const userInReq = req.user;

  if (!userInReq) {
    res.redirect("/?message=User&does&not&exist");
  }

  const user = await prisma.user.findUnique({
    where: {
      name: userInReq.name,
    },
    include: {
      folders: true,
    },
  });

  res.render("uploadForm", { folders: user.folders });
}

module.exports = {
  storage,
  upload,
  saveFileToDbAndCloud,
  uploadForm,
};
