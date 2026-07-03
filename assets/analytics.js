/* ============================================================
   Google Analytics (gtag.js)
   Loaded from every page via:
     <script src="/assets/analytics.js"></script>
   The measurement ID lives here only, so this is the single place
   to change it. To turn analytics off site-wide, remove the script
   tags that reference this file (or empty this file).
   ============================================================ */
(function () {
  var GA_ID = "G-GEC45WPW5L";

  // Load the gtag.js library.
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);

  // Standard gtag bootstrap.
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", GA_ID);
})();
