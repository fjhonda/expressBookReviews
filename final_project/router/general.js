const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const {username, password} = req.body

    if (!username || !password)
        return res.send("You must provide both, a username and a password.")
    
    if (isValid(username))
        return res.send("Username already exists")

    users.push({
        username,
        password
    })

    return res.send("User registered succesfully")
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books, null, 4))  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn

    res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const authorName = req.params.author

  const foundBooks = []

  for ( i=1; i<11; i++){
    if (books[i].author===authorName)
        foundBooks.push(books[i])
  }

  res.send(foundBooks)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title

    const foundBooks = []
  
    for ( i=1; i<11; i++){
      if (books[i].title===title)
          foundBooks.push(books[i])
    }
  
    res.send(foundBooks)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn
    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
