// Toggle & Responsive Navigation
const navSlide = () => {
  const bar = document.querySelector(".bar");
  const navLists = document.querySelector("nav");

  bar.addEventListener("click", () => {
    // Toggle nav list and bar class
    navLists.classList.toggle("nav-active");
    bar.classList.toggle("toggle");
  });
};

navSlide();

function goBack() {
  window.history.back();
}

// // Clear form before unload
// window.onbeforeunload = () => {
//   for (const form of document.getElementsByTagName("form")) {
//     form.reset();
//   }
// };