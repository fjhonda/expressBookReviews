const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    const foundUsername = users.find( u => u.username===username)

    if (foundUsername)
        return true

    return false
}

const authenticatedUser = (username,password)=>{ //returns boolean
    const foundUser = users.find( u => u.username===username && u.password === password)

    if (foundUser)
        return true

    return false
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const {username, password} = req.body

    if (!username || !password)
        return res.status(404).send("You must provide a username and a password to login")

    if (authenticatedUser(username, password)){
        const accessToken  = jwt.sign({
            data: password,
        }, "access", { expiresIn: 60*60})

        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User logged successfully")
    }

    return res.status(208).send("Your credentials couldn't login")
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const {username} = req.session.authorization
  const isbn = req.params.isbn
  const {review} = req.body

  const currentBook = books[isbn]

  if (currentBook){
    if (review){
        currentBook.reviews[username] = review
        return res.send("Your review was published successfully")
    }
    else{
        return res.send("You need to provide a review")
    }
  }
  else
    return res.status(404).json({message: "Book not found"})

});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res ) =>{
    const {username} = req.session.authorization
    const isbn = req.params.isbn

    const currentBook = books[isbn]

    if (currentBook){
        delete currentBook.reviews[username]
        return res.status(200).json("Your review was deleted successfully")
    }
    else 
        return res.status(404).json({message: "Book not found"})
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
