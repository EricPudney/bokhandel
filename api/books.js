import Book from "./models/Book.js";
import Author from "./models/Author.js";

export default function (server) {
  server.get("/api/books", async (req, res) => {
    try {
      const books = await Book.find().populate("Author_id");
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  });

  server.get("/api/books/:id", async (req, res) => {
    const bookFound = await Book.findById(req.params.id).populate("Author_id");
    // this if statement doesn't seem to work
    if (!bookFound) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(bookFound);
  });

  server.post("/api/books", async (req, res) => {
    //   if (req.session.login) {
    const newBook = new Book({
      Title: req.body.Title,
      Description: req.body.Description,
      Author_id: req.body.Author_id,
    });
    try {
      const result = await newBook.save();

      const author = await Author.findById(req.body.Author_id);
      author.Books.push(newBook._id);
      await author.save();

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: "Unable to post book." });
    }
  }); /* else {
      res.json({ message: "Please log in" });
    }
  });*/

  server.put("/api/books/:id", async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json(updatedBook);
    } catch (error) {
      res.status(500).json({ message: "It's all gone to hell." });
    }
  });

  server.delete("/api/books/:id", async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json({ message: "Book deleted" });
    } catch (error) {
      res.status(500).json({ message: "It's all gone to hell." });
    }
  });
}
