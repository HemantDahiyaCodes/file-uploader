Database Structure:

# UserInformation model structure
- Create a `User` model that stores the information such as their username and password.
- Give each user an unique `id` -- it should be auto incremented.
- Username must be unique.
<br>
<br>

# File Information model structure
- Create a `File` model  that stores information such as its name, size, type, date uploaded.
- Give each file an `id` -- it should be auto incremented.
- id must be unique.
- File names must be unique.


# Add folders functionality
- Create a `Folder` model that stores information such as its id, name, the user it belongs to (a relation field `Author` in the `Folder` model that references the id of the `User` model) and a `Files[]` relation.
- The `File` model will have a field `folders_id` (a relation field `folders` that references the `id` of the `Folder` model)


# Routes and controllers
1. `index` route and `signUpCtrl` controller: handles getting the index route - sign up form and signing up of the user.
2. `log-in` route and `loginCtrl` controller: handles getting the login route - login form and call `passport.authenticate()` from `passport/passportAuthentication.js`.
3. `home` route and `homeController` controller: handles getting the home route - home view from the `views` folder that shows the links to `upload` and `createFolder` routes and gets a list of folders created by the user.
4. `upload` route and `uploadController` controller: handles getting the upload form and submitting it to the `/upload` by post method. Upload controller handles the submission of the form and storing the information in the database.
5. `createFolder` route and `createFolderCtrl`: handles getting the create folder form and submitting it to `/create` by post method. The information is then handled by `createFolderCtrl` by creating the folder in the database and link it to the user.
6. `/home/:foldername` route and `viewFolderController`:
- Link each `<a>` tag to the take the user to `/home` path and `:foldername` folder.
- Extract the route parameters from `<a>` and store them, later use that to find the folder and showing all the files.