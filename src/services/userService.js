import bcrypt from 'bcryptjs';
import mysql2 from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index'
// import connection from '../configs/database';


const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    
    let hashPass = hashUserPassword(password);
 
    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        })
    }
    catch (error) {
        console.log(error);
    }

    
}

const getUserList = async () => {
    
    // let newUser = [];
    // newUser = await db.User.findOne({
    //     where: {id:1},
    //     include: {model: db.Group},
    //     raw: true,
    //     nest: true
    // });
    
    let roles = await db.Group.findAll({
        where: {id:1},
        attributes:["name", "description"],
        include: {model: db.Role,  attributes:["url", "description"] },
        raw: true,
        nest: true
    })

    console.log(">>>Check new roles: ", roles);


    try {
        
        let users = [];
        users = await  db.User.findAll();
        return users;
    }
    catch (error) {
        console.log(error);
    }
}


const getUserById = async (req, res) => {
    
    try {
        
        let result = [];
        result = await db.User.findOne({
            where: {
                id: req.params.id
            }
        })

        return result.get({plain: true}); // chỉ lấy thông tin cần thiết (plaintext)
      
    }
    catch (error) {
        console.log(error);
    }

}

const updateUserInfo = async (req, res) => {
      
    try {
        let result = await db.User.update(
            {
                email: req.body.email,
                username: req.body.username        
            } , 
            {
                where: 
                    {
                        id: req.body.id
                    }
            }
           
        ) 
    }
    catch (error) {
        console.log(error);
    }

}

const deleteUser = async (id) => {

    try {
        
        let result = await db.User.destroy({
            where: {
                id: id
            }
        })

        return result;
    }
    catch (error) {
        console.log(error);
    }
}




module.exports = {
    createNewUser, getUserList, deleteUser, updateUserInfo, getUserById
}