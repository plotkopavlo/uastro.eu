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

/* Shuffle the supporter logos on every load, so the order implies no ranking
   or preference between the supporting institutions. */
(function () {
  var grid = document.querySelector(".supporter-grid");
  if (!grid) return;
  var items = Array.prototype.slice.call(grid.children);
  for (var i = items.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = items[i];
    items[i] = items[j];
    items[j] = tmp;
  }
  items.forEach(function (el) { grid.appendChild(el); });
})();
