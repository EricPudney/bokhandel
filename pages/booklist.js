export default async function booklist() {
  const response = await fetch("/api/books");
  const result = await response.json();

  let html = "";

  for (let data of result) {
    html += `
      <h1>${data.Title}</h1>
      <p class="author">By ${data.Author_id.Name}</p>
      <p class="description">${data.Description}</p>
    `;
  }

  return `<article id="booklist">${html}</article>`;
}
