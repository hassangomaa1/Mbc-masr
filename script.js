let themeBtns = document.querySelectorAll(".theme-btn");
let themeBtnsIcons = document.querySelectorAll(".theme-btn i");

if (window.localStorage.getItem("theme")) {
  if (window.localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtnsIcons.forEach((icon) => {
      icon.classList.remove("bi-moon-fill");
      icon.classList.add("bi-sun-fill");
    });
  }
}

themeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document.body.classList.toggle("dark");
    themeBtnsIcons.forEach((icon) => {
      if (icon.classList.contains("bi-moon-fill")) {
        icon.classList.remove("bi-moon-fill");
        icon.classList.add("bi-sun-fill");
        window.localStorage.setItem("theme", "dark");
      } else {
        icon.classList.remove("bi-sun-fill");
        icon.classList.add("bi-moon-fill");
        window.localStorage.setItem("theme", "light");
      }
    });
  });
});

window.onscroll = () => {
  let nav = document.getElementById("nav");
  let scrollToTop = document.getElementById("scroll-to-top");

  // استخدام window.scrollY بدلاً من this.scrollY لضمان الدقة
  if (window.scrollY >= 60) {
    nav.classList.add("nav-scroll");
  } else {
    nav.classList.remove("nav-scroll");
  }

  // التأكد من وجود العنصر أولاً لتجنب الأخطاء في القنصل
  if (scrollToTop) {
    if (window.scrollY >= 160) {
      scrollToTop.classList.add("show");
    } else {
      scrollToTop.classList.remove("show");
    }
  }
};


document.getElementById("scroll-to-top").addEventListener("click", () => {
  window.scrollTo(0, 0);
});

const form = document.getElementById("form");
const scriptURL =
  "put_link_google_sheet";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => alert("Thank you! Form is submitted"))
    .then(() => {
      window.location.reload();
    })

    .catch((error) => console.error("Error!", error.message));
});
