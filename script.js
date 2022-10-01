ol.innerHTML = localStorage.getItem("list");

form.onsubmit = () => {
  const li = document.createElement("li");
  const spanDel = document.createElement("span");
  spanDel.textContent = " -";
  spanDel.onclick = () => del(li);
  li.innerHTML = champ.value + "";
  li.appendChild(spanDel);
  ol.appendChild(li);
  champ.value = "";
  noTache.style.display = "none";

  localStorage.setItem("list", ol.innerHTML);

  return false;
  //   e.preventDefault();
};

const del = (element) => {
  element.remove();

  //   if (ol.innerHTML == "") {
  //     noTache.style.display = "block";
  //   }
  noTache.style.display = ol.innerHTML === "" ? "block" : "none";
};
