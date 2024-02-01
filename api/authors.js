import Author from "./models/Author.js";
import Book from "./models/Book.js";

export default function (server) {
  server.get("/api/authors", async (req, res) => {
    try {
      const authors = await Author.find().populate("Books");
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({ message: "Oopsie daisy", error });
    }
  });

  server.get("/api/authors/:id", async (req, res) => {
    const authorFound = await Author.findById(req.params.id).populate("Books");
    // this if statement doesn't seem to work
    if (!authorFound) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json(authorFound);
  });

  server.post("/api/authors", async (req, res) => {
    const newAuthor = new Author({
      Name: req.body.Name,
      Age: req.body.Age,
      Books: req.body.Books,
    });
    try {
      const result = await newAuthor.save();

      const books = await Book.findById(req.body.Books);
      books.Author_id.push(newAuthor._id);
      await books.save();

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: "Unable to create author.", error });
    }
  });

  server.put("/api/authors/:id", async (req, res) => {
    try {
      const updatedAuthor = await Author.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedAuthor) {
        return res.status(404).json({ message: "Author not found" });
      }
      res.json(updatedAuthor);
    } catch (error) {
      res.status(500).json({ message: "It's all gone to hell." });
    }
  });

  server.delete("/api/authors/:id", async (req, res) => {
    try {
      const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
      if (!deletedAuthor) {
        return res.status(404).json({ message: "Author not found" });
      }
      res.json({ message: "Author deleted" });
    } catch (error) {
      res.status(500).json({ message: "It's all gone to hell." });
    }
  });
}
