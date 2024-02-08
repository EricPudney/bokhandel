export default async function newauth() {
  return `
    <p>Fill in the form to add a new author to the database:</p>
    <form onsubmit="createAuthor(), false">
      <input name="name" placeholder="Name">
      <input name="age" placeholder="Age">
      <input type="submit" value="Send">
    </form>  
    <p>Once you've added an author you can also add their books.</p>
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
}

window.createAuthor = createAuthor;
