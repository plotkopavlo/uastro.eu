/* Mobile navigation toggle. On small screens the nav collapses behind a
   hamburger button; this opens/closes it and keeps aria-expanded in sync. */
(function () {
  var btn = document.querySelector(".nav-toggle");
  var bar = document.querySelector(".topbar");
  if (!btn || !bar) return;

  function set(open) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    bar.classList.toggle("nav-open", open);
  }

  btn.addEventListener("click", function () {
    set(btn.getAttribute("aria-expanded") !== "true");
  });

  // Close on Escape, or when a nav link is followed.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") set(false);
  });
  document.querySelectorAll("#primary-nav a").forEach(function (a) {
    a.addEventListener("click", function () { set(false); });
  });
})();
