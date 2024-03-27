const mongoose= require('mongoose')

const mongoURI='mongodb+srv://shreyasharma:kalpana890@cluster0.0l0mnlm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports=connectToMongo;