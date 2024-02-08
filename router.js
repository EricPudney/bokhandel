import booklist from "./pages/booklist.js";
import home from "./pages/home.js";
import add from "./pages/add.js";
import newauth from "./pages/newauth.js";

async function route() {
  switch (location.hash.replace("#", "")) {
    case "booklist":
      $("main").html(await booklist());
      break;
    case "":
      $("main").html(await home());
      break;
    case "add":
      $("main").html(await add());
      break;
    case "newauth":
      $("main").html(await newauth());
      break;
    default:
      console.log("404 You've broken the internet");
  }
}

window.onhashchange = route;
window.onload = route;
