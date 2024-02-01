import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  Title: String,
  Description: String,
  Author_id: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
