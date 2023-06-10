import userService from '../services/userService';
import connection from '../config/database';

const handleHomePage = (req, res) => {
    return res.render("home.ejs");
}

const handleUser = async (req, res) => {
    let users = await userService.getUserList();
    return res.render("user.ejs", {users:users});
}

const handleCreateUser = async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    
    await userService.createNewUser(email,password, username) ;

    return res.redirect("/user");
}

const handleDeleteUser = async (req,res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
}



const getUpdateUserPage = async (req, res) => {
    let rows = await userService.getUserById(req, res) ;
    let userData = rows && rows.length >0 ? rows[0] : {};
    return res.render("user-update.ejs", {userData});
}

const handleUpdateUser = async (req, res) => {
    await userService.updateUserInfo(req, res);
    return res.redirect("/user");
}


module.exports = {
    handleHomePage, handleUser, handleCreateUser, handleDeleteUser, 
    handleUpdateUser, getUpdateUserPage
}
