export default async function add() {
  let authorList = "<option value=0>choose an author...</option>";
  let response = await fetch("/api/authors");
  let data = await response.json();
  console.log(data);
  data.sort((a, b) => (a.Name > b.Name ? 1 : -1));
  for (let row of data) {
    authorList += `<option value=${row._id}>${row.Name}</option>`;
  }
  return `
    <p>Fill in the form to add your book to the database:</p>
    <form onsubmit="create(); return false">
      <input name="title" placeholder="Title" required/>
      <input name="description" placeholder="Describe this book!" required/>
      <label for="author">Select author:</label>
      <select id="author" name="author">${authorList}</select>
      <input type="submit" value="Send">
    </form>  
    <p>Can't see your author in the dropdown list? Go to 'add author'</p>
    <br>
    <p id="msg-txt"></p>
  `;
}

async function create() {
  if ($("[name=author]").val() == 0) {
    $("#msg-txt").text("Please choose an author");
    return;
  }
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
  $("#msg-txt").text(result.message);
  $("[name=title]").val("");
  $("[name=description]").val("");
  $("#author").val("0");
}

window.create = create;
