import { letters, numbers, chars } from "./symbols.js"
import { themeLight, themeDark } from "./css-themes.js"


function generatePass(passLength) {
    let passBase = [...letters];
    if (numbersCheckbox.checked) { passBase = [...passBase, ...numbers] }
    if (charsCheckbox.checked) { passBase = [...passBase, ...chars] }
    let randomIndex;
    let randomChar;
    let securePass = "";
    for (let i=0; i < passLength; i++) {
        randomIndex = Math.floor(Math.random() * passBase.length);
        randomChar = passBase[randomIndex];
        securePass = securePass.concat(randomChar);
    }
    return securePass;
}


function switchToDarkTheme() {
    toDarkSwitcher.classList.add("hidden");
    toLightSwitcher.classList.remove("hidden");
    const { bg, title, titleSpan, subtitle, btnBg, btnText, hrLine, bgPass, passText } = themeDark;
    CSSRoot.style.setProperty('--bg', bg);
    CSSRoot.style.setProperty('--title', title);
    CSSRoot.style.setProperty('--title-span', titleSpan);
    CSSRoot.style.setProperty('--subtitle', subtitle);
    CSSRoot.style.setProperty('--btn-bg', btnBg);
    CSSRoot.style.setProperty('--btn-text', btnText);
    CSSRoot.style.setProperty('--hr-line', hrLine);
    CSSRoot.style.setProperty('--bg-pass', bgPass);
    CSSRoot.style.setProperty('--pass-text', passText);
}

function switchToLightTheme() {
    toLightSwitcher.classList.add("hidden");
    toDarkSwitcher.classList.remove("hidden");
    const { bg, title, titleSpan, subtitle, btnBg, btnText, hrLine, bgPass, passText } = themeLight;
    CSSRoot.style.setProperty('--bg', bg);
    CSSRoot.style.setProperty('--title', title);
    CSSRoot.style.setProperty('--title-span', titleSpan);
    CSSRoot.style.setProperty('--subtitle', subtitle);
    CSSRoot.style.setProperty('--btn-bg', btnBg);
    CSSRoot.style.setProperty('--btn-text', btnText);
    CSSRoot.style.setProperty('--hr-line', hrLine);
    CSSRoot.style.setProperty('--bg-pass', bgPass);
    CSSRoot.style.setProperty('--pass-text', passText);
}


function renderPasswords() {
    const passLength = Number(passLengthEl.textContent);
    passField1.textContent = generatePass(passLength);
    passField1.classList.add("pointer");
    passField2.textContent = generatePass(passLength);
    passField2.classList.add("pointer");
}


function copyPassToClipboard(boxNumber) {
    const copyText = document.getElementById(`js-pass-${boxNumber}`).textContent;
    const textarea = document.createElement('textarea');
    textarea.value = copyText;
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 99999);  // used for copying on mobile devices;
    document.execCommand("copy");
    // if the previous timeout is activated, clear it before setting the next one anew;
    onCopyTimeout ? clearTimeout(onCopyTimeout) : null;
    copyHint.classList.remove("hidden");
    onCopyTimeout = setTimeout( () => { copyHint.classList.add("hidden") }, 2000 );
    document.body.removeChild(textarea);
}


function renderPassLength() {
    passLengthEl.textContent = passLengthSlider.value;
}

function decreasePassLength() {
    passLengthSlider.value--;
    renderPassLength();
}

function increasePassLength() {
    passLengthSlider.value++; // for some reason += 1 result in leaping to max input value;
    renderPassLength();
}


function activateEventListeners() {
    toDarkSwitcher.addEventListener("click", switchToDarkTheme);
    toLightSwitcher.addEventListener("click", switchToLightTheme);
    document.getElementById("js-btn-generate").addEventListener("click", renderPasswords);
    passField1.addEventListener("click", () => { copyPassToClipboard(1) });
    passField2.addEventListener("click", () => { copyPassToClipboard(2) });
    minusLengthEl.addEventListener("click", decreasePassLength);
    plusLengthEl.addEventListener("click", increasePassLength);
    passLengthSlider.addEventListener("change", renderPassLength);
}



// if __name__ == "__main__":
const CSSRoot = document.documentElement;
const toDarkSwitcher = document.getElementById("js-switcher-to-dark");
const toLightSwitcher = document.getElementById("js-switcher-to-light");
const passField1 = document.getElementById("js-pass-1");
const passField2 = document.getElementById("js-pass-2");
const copyHint = document.getElementById("js-hint");
const passLengthSlider = document.getElementById("pass-length-slider");
const minusLengthEl = document.querySelector(".js-minus");
const plusLengthEl = document.querySelector(".js-plus");
const passLengthEl = document.getElementById("pass-length");
const numbersCheckbox = document.getElementById("box-numbers");
const charsCheckbox = document.getElementById("box-chars");

let onCopyTimeout;

renderPassLength();
activateEventListeners();
