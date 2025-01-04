import { getDiv } from "./element.js";

const option = getDiv("option");

function toBoot() {
    option.style.display = "none";
    setTimeout(() => {
        window.location = "./";
    }, 750);
}

window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        toBoot();
    }
});