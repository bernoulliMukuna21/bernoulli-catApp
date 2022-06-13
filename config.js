require('dotenv').config();

module.exports = {
    headers:{
        "Content-Type": "application/json",
        "x-api-key": process.env.CAT_API_KEY,
    }
}