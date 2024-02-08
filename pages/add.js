export default async function add() {
  let authorList = "";
  let response = await fetch("/api/authors");
  let data = await response.json();
  console.log(data);
  for (let row of data) {
    authorList += `<option value=${row._id}>${row.Name}</option>`;
  }
  return `
    <p>Fill in the form to add your book to the database:</p>
    <form onsubmit="create(), false">
      <input name="title" placeholder="Title">
      <input name="description" placeholder="Describe this book!">
      <label for="author">Select author:</label>
      <select id="author" name="author">${authorList}</select>
      <input type="submit" value="Send">
    </form>  
    <p>Can't see your author in the dropdown list? Go to 'add author'</p>
  `;
}

async function create() {
  const newBook = {
    Title: $("[name=title]").val(),
    Description: $("[name=description]").val(),
    Author_id: $("[name=author]").val(),
  };
  let response = await fetch("/api/books", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBook),
  });
  let result = await response.json();
  console.log(result);
}

window.create = create;
