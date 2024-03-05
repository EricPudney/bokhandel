export default async function newauth() {
  let authorList = "";
  let response = await fetch("/api/authors");
  let result = await response.json();
  for (let row of result) {
    authorList += `<li>Name: ${row.Name}, Age: ${row.Age} <button class="delete-button" onclick="deleteAuthor('${row._id}'); return false">Delete</button></li>`;
  }
  return `
    <p>Fill in the form to add a new author to the database:</p>
    <form onsubmit="createAuthor(); return false">
      <input name="name" placeholder="Name">
      <input type="number" name="age" placeholder="Age">
      <input type="submit" value="Send">
    </form>  
    <p>Once you've added an author you can also add their books.</p>
    <br>
    <p id="msg-txt"></p>
    <br>
    <p>Existing authors:</p>
    <ul>${authorList}</ul>
    <br>
    <p id="confirm-deletion"></p>
  `;
}

async function createAuthor() {
  let newAuthor = { Name: $("[name=name]").val(), Age: $("[name=age]").val() };

  let response = await fetch("/api/authors", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAuthor),
  });
  let result = await response.json();
  console.log(result);
  $("#msg-txt").text(result.message);
  $("[name=name]").val("");
  $("[name=age]").val("");
}

async function deleteAuthor(id) {
  if (
    window.confirm(
      "Warning! Deleting this author will also delete all of their books. Continue?"
    )
  ) {
    let response = await fetch(`/api/authors/${id}`, {
      method: "delete",
    });
    let result = await response.json();
    alert(result.message);
    location.reload();
  }
}

window.createAuthor = createAuthor;
window.deleteAuthor = deleteAuthor;
