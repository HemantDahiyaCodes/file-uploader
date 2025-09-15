const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const cloudinary = require("cloudinary").v2;

function createFolderForm(req, res) {
  res.render("createFolder");
}

async function handleCreation(req, res) {
  const { folderName } = req.body;
  const userInReq = req.user;

  const user = await prisma.user.findUnique({
    where: {
      name: userInReq.name,
    },
  });

  await prisma.folder.create({
    data: {
      folderName: folderName,
      authorId: user.id,
    },
  });

  res.redirect("/home");
}

module.exports = {
  createFolderForm,
  handleCreation,
};
