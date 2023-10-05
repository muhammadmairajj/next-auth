import mongoose from "mongoose";

const connect = async () => { 
    if(mongoose.connections[0].readyState) return;
    
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongo Connection Successfully Established.");
    } catch(err) {
        throw new Error("Error Connecting to Mongoose");
    }
}

export default connect;