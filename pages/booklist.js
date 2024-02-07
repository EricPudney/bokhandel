export default async function booklist() {
  const response = await fetch("localhost:3000/api/books");
  const result = await response.json();

  console.log(result);

  let html = "";

  for (let data of result) {
    html += `
      <h1>${data.Title}</h1>
      <p>By ${data.Author_id.Name}</p>
      <p>${data.Description}</p>
    `;
  }

  return `<article id="booklist">${html}</article>`;
}
