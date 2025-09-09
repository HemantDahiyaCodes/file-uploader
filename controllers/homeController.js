const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function homepage(req, res) {
  const currentUser = req.user;
  console.log("Current user in req is: ", currentUser);

  const user = await prisma.user.findUnique({
    where: {
      name: currentUser.name,
    },

    include: {
      folders: true,
    },
  });
  console.log(user);

  console.log("Folders of the user: ", user.folders);
  res.render("home", { user: user, folders: user.folders });
}

async function viewFolderContent(req, res) {
  const folderInReq = req.params;
  console.log(folderInReq);
  const userInReq = req.user;

  console.log(userInReq);
  console.log("Folder name is: ", folderInReq.foldername);

  const user = await prisma.user.findUnique({
    where: {
      name: userInReq.name,
    },

    include: {
      folders: true,
    }
  });

  const folder = await prisma.folder.findFirst({
    where: {
      folderName: folderInReq.foldername
    },

    include: {
      files: true,
    }
  })

  console.log("The folder's id is: ", folder.id);
  console.log("The folder is: ", folder);
  res.render("viewFolderContent", {files: folder.files})
}

module.exports = {
  homepage,
  viewFolderContent,
};
