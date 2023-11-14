const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://shami:cokzeQ0987ap@plantioserver.orewlpe.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () => {
    mongoose
    .connect(mongoURI, {
        //useUnifiedTopology: true,
        //useNewUrlParser: true,
        autoIndex: true, //make this also true
    })
    .then(() => {
      console.log("successfully db connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectToMongo;
