// import { MongoClient, ServerApiVersion } from 'mongodb';
// const uri = "mongodb+srv://dbUSer:hcbq6WVC7yXit6eJ@cluster0.vhdgyan.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


import mongoose from "mongoose"

const connectDB = () => {
    mongoose.connect("mongodb+srv://dbUSer:hcbq6WVC7yXit6eJ@cluster0.vhdgyan.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        dbName: "AIops",
    })
        .then((c) => console.log(`Database connected to ${c.connection.host}`))
        .catch((e) => console.log(e))

}
export default connectDB;