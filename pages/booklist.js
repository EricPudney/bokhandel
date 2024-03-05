export default async function booklist() {
  const response = await fetch("/api/books");
  const result = await response.json();
  console.log(result);
  let html = "";

  for (let data of result) {
    html += `
    <div class="booklist-item">
      <h2>${data.Title}</h2>
      <p class="author">by ${data.Author_id.Name}</p>
      <p class="description">..."${data.Description}"...</p>
      <button class="edit-button" onclick="editBook('${data._id}'); return false">Edit</button>
      <button class="delete-button" onclick="deleteBook('${data._id}'); return false">Delete</button>
    </div>
    `;
  }

  return `<article id="booklist">${html}</article>`;
}

async function editBook(id) {
  console.log("No edit form yet soz");
}

async function deleteBook(id) {
  if (window.confirm("Are you sure you want to delete this title?")) {
    const response = await fetch(`/api/books/${id}`, { method: "DELETE" });
    response.status == 200
      ? console.log("Book deleted")
      : console.log("Something went wrong");
    location.reload();
  }
}

window.deleteBook = deleteBook;
window.editBook = editBook;
