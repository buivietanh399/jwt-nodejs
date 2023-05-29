import connection from '../configs/database';

const handleHomePage = (req, res) => {
    return res.render("home.ejs");
}

const handleUser = (req, res) => {
    return res.render("user.ejs");
}

const handleCreateUser = (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    console.log(req.body);

    // with placeholder
    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?,?,?)',
        [email, password, username],
        function(err, results, fields) {
        if (err) 
            console.log(err);
        }
    );

    return res.send("create success");
}

module.exports = {
    handleHomePage, handleUser, handleCreateUser
}
