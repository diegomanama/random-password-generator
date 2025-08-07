/* 
  This script runs before stylesheets are parsed to ensure the theme attribute is set on <html> (or :root) 
  before rendering. This prevents a "flash" or "blink" effect when reloading, which can occur if the theme 
  is applied after the page starts rendering.
*/

if (localStorage.getItem("themeSetting")) {
  document.querySelector(":root").dataset.theme = localStorage.getItem("themeSetting");
}