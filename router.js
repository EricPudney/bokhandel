import booklist from "./pages/booklist.js";

async function route() {
  switch (location.hash.replace("#", "")) {
    case "booklist":
      console.log("booklist");
      $("main").html(await booklist());
      break;
    case "":
      console.log("HOME");
      //$("main").html(home());
      break;
    case "contact":
      // $("main").html(contact());
      break;
    default:
      console.log("404 You've broken the internet");
  }
}

window.onhashchange = route;
window.onload = route;
