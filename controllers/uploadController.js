const multer = require("multer");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const storage = multer.diskStorage({
  destination: function (req, file, done) {
    done(null, "uploaded_files");
  },

  filename: function (req, file, done) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    done(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

async function saveFileToDb(req, res) {
  const userInReq = req.user;
  const user = await prisma.user.findUnique({
    where: { name: userInReq.name },
  });
  console.log("The user found at uploadController was: ", user);

  const folderInReq = req.body.chooseFolder;
  console.log("Folder in req in upload controller is: ", folderInReq);

  console.log("Folder's info at upload controller is: ", folderInReq);

  await prisma.file.create({
    data: {
      filename: req.file.fieldname,
      size: `${req.file.size}`,
      type: req.file.mimetype,
      Author: {
        connect: {
          id: userInReq.id,
        },
      },
      folder: {
        connect: {
          id: parseFloat(folderInReq),
        }
      }
    },
  });

  res.redirect("/home");
}

async function uploadForm(req, res) {
  const userInReq = req.user;
  console.log(
    "The user in uploadController in uploadForm function is: ",
    userInReq
  );

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
  saveFileToDb,
  uploadForm,
};
