const change_size = document.getElementById("size_selector");
const change_blur = document.getElementById("blur_power");
const change_color = document.getElementById("color_selector");
const fon_container = document.getElementById("fon_container");

change_color.addEventListener("input", () => {
  fon_container.style.backgroundColor = change_color.value;
});

change_blur.addEventListener("input", () => {
  fon_container.style.filter = `blur(${change_blur.value}px)`;
});

change_size.addEventListener("input", () => {
  fon_container.style.width = `${change_size.value * 100}px`;
  fon_container.style.height = `${change_size.value * 80}px`;
});
