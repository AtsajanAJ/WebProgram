const sql = require('./db');
const jwt = require('jsonwebtoken');
const scKey = require('../config/jwt.config');
const bcrypt = require('bcryptjs/dist/bcrypt');
const expireTime = '2h'; // token will exipre in 2hours.
// const fs = require('fs');

const User = function(user){
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
}
User.checkUsername = (username, result)=>{
    const us = "SELECT * FROM users WEERE username = '"+username+"'"
    console.log(us);
    sql.query(us,(err,res)=>{
        if(err){
            console.log('Error: '+err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log('FOund Username:'+ res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: 'not_found'},null);
    })
};

User.create = (newUser, result)=>{
    sql.query('INSERT INTO users SET?', newUser, (err,res)=>{
        if(err){
            console.log('Query error:'+err);
            result(err, null);
            return;
        }
        const token = jwt.sign({id: res.insertId}, scKey.secret, {expiresIn: expireTime});
        result(null, {id: res.insertId,...newUser, accessToken: token});
        console.log('Created user:',{id: res.insertId,...newUser, accessToken: token});
    })
};

User.loginModel = (account, result)=>{
    sql.query('SELECT * FROM users WHERE username = ?',[account.username],(err,res)=>{
    if(err){
        console.log('err:'+ err);
        result(err, null);
        return;
    }
    if(res.length){
        const validPassword = bcrypt.compareSync(account.password, res[0].password);
            if(validPassword){
                const token = jwt.sign({id: res.insertId}, scKey.secret, {expiresIn: expireTime});
                console.log("Login in success. Token: " + token);
                res[0].accessToken = token;
                result(null, res[0]);
                return;
            }else{
                console.log("Password not match");
                result({kind: "invalid"}, null);
                return;
            }
    }
    result({kind: 'not_found'},null);
    });
};

User.getAllRecords = (result)=>{
    sql.query("SELECT * FROM users",(err, res)=> {
        if(err){
            console.log("Query err:" + err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

User.updateUser = (id, data, result) => {
    removeOldImage(id);
    // console.log("usermodel" + JSON.stringify(data))
    sql.query("UPDATE users SET fullname=?, email=?, img=? WHERE id=?" , [data.fullname, data.email, data.img, id], (err, res)=>{
        if(err){
            console.log("Error: "+ err);
            result(err, null);
            return;
        }
        // affectedRow it will return the number 
        if(res.affectedRows == 0){  
            //no any record update
            result({kind: "not_found"}, null);
        }
        console.log("Update user: " + {id: id, ...data});
        result(null,{id: id, ...data});
        return;
    });
};

User.removeUser = (id, result)=>{
    removeOldImage(id);
    sql.query("DELETE FROM users WHERE id=?",[id], (err, res)=>{
        if(err){
            console.log("Error" + err)
            result(err, null);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }
        console.log("Delete user id: " + id);
        result(null, {id: id});
    } );
};

module.exports = User;