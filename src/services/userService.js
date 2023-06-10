import bcrypt from 'bcryptjs';
import mysql2 from 'mysql2/promise';
import bluebird from 'bluebird';
// import connection from '../configs/database';


const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    
    let hashPass = hashUserPassword(password);
    const connection = await mysql2.createConnection( {
        host:'localhost', 
        user: 'root', 
        database: 'jwt', 
        Promise: bluebird
      });
    try {
        const [rows, fields] = await connection.execute('INSERT INTO user (email, password, username) VALUES (?,?,?)',
              [email, hashPass, username]);
        return rows;
    }
    catch (error) {
        console.log(error);
    }

    
}

const getUserList = async () => {
    const connection = await mysql2.createConnection( {
        host:'localhost', 
        user: 'root', 
        database: 'jwt', 
        Promise: bluebird
      });
      
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM user');
        return rows;
    }
    catch (error) {
        console.log(error);
    }
}

const deleteUser = async (id) => {
    const connection = await mysql2.createConnection( {
        host:'localhost', 
        user: 'root', 
        database: 'jwt', 
        Promise: bluebird
      });
      
    try {
        const [rows, fields] = await connection.execute('DELETE FROM user WHERE id = ?',[id]);
        return rows;
    }
    catch (error) {
        console.log(error);
    }
}

const getUserById = async (req, res) => {
    const connection = await mysql2.createConnection( {
        host:'localhost', 
        user: 'root', 
        database: 'jwt', 
        Promise: bluebird
      });
      
    try {
 
        const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id = ?',[req.params.id]);
        return rows;
    }
    catch (error) {
        console.log(error);
    }

}

const updateUserInfo = async (req, res) => {
    const connection = await mysql2.createConnection( {
        host:'localhost', 
        user: 'root', 
        database: 'jwt', 
        Promise: bluebird
      });
      
    try {
        let id = req.body.id;
        let email = req.body.email;
        let username = req.body.username;
        const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ?',[email, username, id] );
        return rows;
    }
    catch (error) {
        console.log(error);
    }

}




module.exports = {
    createNewUser, getUserList, deleteUser, updateUserInfo, getUserById
}