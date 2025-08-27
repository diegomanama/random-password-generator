// Helper function: Adds the same event listener to multiple elements.
export function addEventListenerAll(elementCollection, eventType, handler) {
  for (const element of elementCollection) {
    element.addEventListener(eventType, (event) => handler(element, event));
  }
}

const uppercaseLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const lowercaseLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const specialCharacters = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?"];

const generatePasswordButton = document.querySelector("#generate-password-button");
const copyPasswordButton = document.querySelector("#copy-password-button");
const passwordSettingsForm = document.querySelector("#password-settings-form");
const passwordOutput = document.querySelector("#password-output");
const lengthSelector = document.querySelector("#length");
const lengthSlider = document.querySelector("#length-slider");
const toggleStates = document.querySelectorAll(".toggle-state");

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

function generateRandomPassword() {
    let randomPassword = "";
    const passwordComposition = [];
    const randomIndexes = [];

    // Update password length from selector
    config.length = lengthSelector.value;

    // Build array of character sets to use
    if (config.uppercaseLetters) {
        passwordComposition.push(uppercaseLetters);
    }
    if (config.lowercaseLetters) {
        passwordComposition.push(lowercaseLetters);
    }
    if (config.numbers) {
        passwordComposition.push(numbers);
    }
    if (config.specialCharacters) {
        passwordComposition.push(specialCharacters);
    }

    // Generate random password using selected character sets
    while (randomPassword.length < config.length) {
        const randomCharacterType = passwordComposition[Math.floor(Math.random() * passwordComposition.length)];
        randomPassword += randomCharacterType[Math.floor(Math.random() * randomCharacterType.length)];
    }

    // Ensure each required character type is included at least once
    while (randomIndexes.length < passwordComposition.length) {
        const newRandomIndex = Math.floor(Math.random() * config.length);
        if (randomIndexes.includes(newRandomIndex)) continue;
        randomIndexes.push(newRandomIndex);
    }

    let passwordArray = randomPassword.split("");
    passwordComposition.forEach((characterType, index) => {
        passwordArray[randomIndexes[index]] = characterType[Math.floor(Math.random() * characterType.length)];
    });

    return passwordArray.join("");
}

// Sync selector and slider values
function updateLengthSelector() {
    lengthSelector.value = lengthSlider.value;
}
function updateLengthSlider() {
    lengthSlider.value = lengthSelector.value;
}

generatePasswordButton.addEventListener("click", () => {
        passwordOutput.value = generateRandomPassword();
});

copyPasswordButton.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordOutput.value)
    copyPasswordButton.textContent = "Copied";
    setTimeout(() => {
        copyPasswordButton.textContent = "Copy";
    }, 1000)
});

// Prevent form submission from reloading the page
passwordSettingsForm.addEventListener("submit", event => event.preventDefault())

lengthSelector.addEventListener("change", () =>{
    if (Number(lengthSelector.value) < lengthSelector.min) lengthSelector.value = lengthSelector.min
    if (Number(lengthSelector.value) > lengthSelector.max) lengthSelector.value = lengthSelector.max;
    passwordOutput.value = generateRandomPassword();
});

lengthSelector.addEventListener("input", updateLengthSlider);

lengthSlider.addEventListener("change", () => {
    passwordOutput.value = generateRandomPassword();
});

lengthSlider.addEventListener("input", updateLengthSelector);

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

    // Reset to default if all options are disabled
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
    passwordOutput.value = generateRandomPassword();
});

// Generate a password at page load
passwordOutput.value = generateRandomPassword();