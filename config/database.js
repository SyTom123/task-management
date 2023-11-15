const mongoose = require('mongoose');
module.exports.connect = async () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(()=> console.log("Connect database successfully"))
        .catch((error)=> console.log(error))
}   