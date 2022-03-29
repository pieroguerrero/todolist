import "./styles.css";

console.log("its alive!");
const para = document.createElement("p");
para.textContent = "from js gree";
para.classList.add("text-green-500", "font-bold");

const main = document.querySelector("main");
main.appendChild(para);