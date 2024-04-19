const axios = require('axios')


axios.get("http://localhost:5000/").then(response => {
    console.log(response)
})
.catch(error => {
    console.log('Error in get ', error)
})

axios.get("http://localhost:5000/isbn/5")
    .then ( response => console.log(response.data))
    .catch( error => console.log("Error fetching details of book", error))

axios.get("http://localhost:5000/author/Samuel Beckett")
    .then ( response => console.log(response.data))
    .catch( error => console.log("Error fetching details of book", error))

axios.get("http://localhost:5000/title/Pride and Prejudice")
    .then ( response => console.log(response.data))
    .catch( error => console.log("Error fetching details of book", error))
