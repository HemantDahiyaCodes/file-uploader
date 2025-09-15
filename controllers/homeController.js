const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function homepage(req, res) {
  const currentUser = req.user;
  console.log("Current user in req is (home route): ", currentUser);

  const user = await prisma.user.findUnique({
    where: {
      name: currentUser.name,
    },

    include: {
      folders: true,
    },
  });

  console.log("Folders of the user (home route): ", user.folders);
  res.render("home", { user: user, folders: user.folders });
}

async function viewFolderContent(req, res) {
  const folderInReq = req.params;
  console.log(folderInReq);

  const userInReq = req.user;
  console.log(userInReq);

  const user = await prisma.user.findUnique({
    where: {
      name: userInReq.name,
    },

    include: {
      folders: true,
    },
  });

  const folder = await prisma.folder.findFirst({
    where: {
      folderName: folderInReq.foldername,
      authorId: user.id,
    },

    include: {
      files: true,
    },
  });

  console.log("The url of the file is: ", folder.files)

  res.render("viewFolderContent", {
    files: folder.files,
  });
}

module.exports = {
  homepage,
  viewFolderContent,
};
