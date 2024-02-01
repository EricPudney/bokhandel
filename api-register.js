import authors from "./api/Authors.js";
import books from "./api/Books.js";

export default function (server, mongoose) {
  authors(server, mongoose);
  books(server, mongoose);
}
