import authors from "./api/authors.js";
import books from "./api/books.js";
import users from "./api/users.js";

export default function (server) {
  authors(server);
  books(server);
  users(server);
}
