import express from "express";
import mongoose from "mongoose";

const app = express();
const mongodbConnection = await mongoose.connect("mongodb://localhost:27019/testDb2");
const userCollection = mongoose.connection.collection("users");

app.use(express.json());

app.post("/create-user", async (req, res) => {
  const { name, email } = req.body;
  //
  const responseFromDb = await userCollection.insertOne({ name, email });
  return res.send(responseFromDb);
});

app.get("/get-all", async (req, res) => {
  const data = await userCollection.find().toArray();
  return res.send(data);
});

app.put("/add-strength", async (req, res) => {
  const { message, userId } = req.body;
  const responseFromDb = await userCollection.updateOne(
    { _id: new mongoose.Types.ObjectId(userId) },
    { $push: { strength: message } }
  );
  return res.send(responseFromDb);
});

app.listen(8000, () => console.log("server is started 8000"));
