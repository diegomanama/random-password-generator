// Helper function - Adds the same event listener to multiple elements.

function addEventListenerAll(elementCollection, eventType, handler) {
  for (const element of elementCollection) {
    element.addEventListener(eventType, (event) => handler(element, event));
  }
}

const uppercaseLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const lowercaseLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const specialCharacters = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?"];

localStorage.setItem("defaultConfig", JSON.stringify(
    {
        length: 12,
        uppercaseLetters: true,
        lowercaseLetters: true,
        numbers: true,
        specialCharacters: false
    }
))

let config = JSON.parse(localStorage.getItem("defaultConfig"));

const generatePasswordButton = document.querySelector("#generate-password-button");
const passwordOutput = document.querySelector("#password-output");
const lengthSelector = document.querySelector("#length");
const lengthSlider = document.querySelector("#length-slider");
const toggleStates = document.querySelectorAll(".toggle-state");

function generateRandomPassword(config) {
    let randomPassword = "";
    let characters = []

    if (config.uppercaseLetters) {
        characters = [...characters, ...uppercaseLetters];
    }

    if (config.lowercaseLetters) {
        characters = [...characters, ...lowercaseLetters];
    }

    if (config.numbers) {
        characters =  [...characters, ...numbers];
    }

    if (config.specialCharacters) {
        characters =  [...characters, ...specialCharacters];
    }    

    for (let i = 0; i < config.length; i++) {
        randomPassword += characters[Math.floor(Math.random() * characters.length)];
    }

    return randomPassword;
}

function updateLengthSelector() {
    lengthSelector.value = lengthSlider.value;
}

function updateLengthSlider() {
    lengthSlider.value = lengthSelector.value;
}

generatePasswordButton.addEventListener("click", () => {
        config.length = lengthSelector.value
        passwordOutput.value = generateRandomPassword(config);
});

passwordOutput.addEventListener("click", () => navigator.clipboard.writeText(passwordOutput.value));

lengthSlider.addEventListener("input", updateLengthSelector);
lengthSelector.addEventListener("input", updateLengthSlider);

addEventListenerAll(toggleStates, "input", (toggleState) => {
    switch (toggleState.dataset.setting) {
        case "uppercaseLetters":
            config.uppercaseLetters = toggleState.checked;
            break;
        case "lowercaseLetters":
            config.lowercaseLetters = toggleState.checked;
            break;
        case "numbers":
            config.numbers = toggleState.checked;
            break;
        case "specialCharacters":
            config.specialCharacters = toggleState.checked;
            break;
    }

    if (
        config.uppercaseLetters === false &&
        config.lowercaseLetters === false &&
        config.numbers === false &&
        config.specialCharacters === false
    ) {
        config = JSON.parse(localStorage.getItem("defaultConfig"));
        for (const toggleState of toggleStates) {
            toggleState.checked = toggleState.defaultChecked;
        }
    }

    passwordOutput.value = generateRandomPassword(config);
});

passwordOutput.value = generateRandomPassword(config);