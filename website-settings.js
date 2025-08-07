import {addEventListenerAll} from "./main.js";

const selectThemeButton = document.querySelector("#select-theme-button");
const selectLanguageButton = document.querySelector("#select-language-button");
const themeOptionsContainer = document.querySelector("#theme-options-container");
const languageOptionsContainer = document.querySelector("#language-options-container");
const themeSettingItems = document.querySelectorAll("#theme-options-container > .setting-option");

// UI interaction responsiveness

selectThemeButton.addEventListener("click", () => {
    themeOptionsContainer.classList.toggle("visible");
})

selectThemeButton.addEventListener("blur", () => {
    themeOptionsContainer.classList.remove("visible");
})

function changeTheme(themeSetting) {
    if (!(themeSetting === document.querySelector(":root").dataset.theme)) {
        document.querySelector(":root").dataset.theme = themeSetting;
    }
}

function rememberTheme(themeSetting) {
    if (!(themeSetting === document.querySelector(":root").dataset.theme)) {
        localStorage.setItem("themeSetting", themeSetting);
    }
}

addEventListenerAll(themeSettingItems, "click", (settingItem) => rememberTheme(settingItem.dataset.theme));
addEventListenerAll(themeSettingItems, "click", (settingItem) => changeTheme(settingItem.dataset.theme));
