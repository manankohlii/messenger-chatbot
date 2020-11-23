const bodyParser = require("body-parser");

const axios = require("axios").default;


axios.get("https://api.github.com/users/manankohlii").then((response) =>{
    console.log(response.data.bio);
});