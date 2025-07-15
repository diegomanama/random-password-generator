const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

const generatePasswordButton = document.querySelector("#generate-password-button");
const outputFields = Array.from(document.querySelectorAll(".output-field"));
const lengthSelector = document.querySelector("#length");
const lengthSlider = document.querySelector("#length-slider");

function generateRandomPassword(length) {
    let randomPassword = "";

    for (let i = 0; i < length; i++) {
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
    for (const outputField of outputFields) {
        outputField.value = generateRandomPassword(lengthSelector.value);
    }
});

for (const outputField of outputFields) {
    outputField.addEventListener("click", () => {
        console.log("clicked");
        Navigator.clipboard.writeText(outputField.value);
    });
}

lengthSlider.addEventListener("input", updateLengthSelector);
lengthSelector.addEventListener("input", updateLengthSlider);

for (const outputField of outputFields) {
    outputField.value = generateRandomPassword(lengthSelector.value);
}