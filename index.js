const cookieCounter = document.getElementById("cookiesCounter");
const resetButton = document.getElementById("reset");
let numbersClicked = 0;
let numbersUpgradedClick = parseInt(localStorage.getItem("clicker")) - 1;
const upgradeClickButton = document.getElementById("upgradeClick");

// Načítání hodnot z localStorage s ochranným blokem
try {
    if (localStorage.getItem("cookies") !== null) {
        let storedCookies = parseInt(localStorage.getItem("cookies"), 10);
        window.cookies = isNaN(storedCookies) ? 0 : storedCookies;
    } else {
        window.cookies = 0;
        localStorage.setItem("cookies", "0");
    }

    if (localStorage.getItem("clicker") !== null) {
        let storedClicker = parseInt(localStorage.getItem("clicker"), 10);
        window.clicker = isNaN(storedClicker) ? 1 : storedClicker; 
    } else {
        window.clicker = 1;
        localStorage.setItem("clicker", "1");
    }
} catch (e) {
    console.log(e);
}

upgradeClickButton.innerText = `Upgrade clicking required: ${numbersUpgradedClick * numbersUpgradedClick + 20}`;
updateCookies();

function addCookie() {
    window.cookies += window.clicker;
    updateCookies();
}

function updateCookies() {
    cookieCounter.innerText = window.cookies;
    localStorage.setItem("cookies", String(window.cookies));
}

function resetCookies() {
    if (numbersClicked === 0) {
        resetButton.innerText = "really ?";
        numbersClicked = 1;
    } else if (numbersClicked === 1) {
        window.cookies = 0;
        updateCookies();
        numbersClicked = 0;
        numbersUpgradedClick = 0;
        window.clicker = 1
        resetButton.innerText = "reset everything";
        upgradeClickButton.innerText = `Upgrade clicking required: 20`;
    }
}

function upgradeClick() {
    const upgradeCost = numbersUpgradedClick * numbersUpgradedClick + 20;
    if (window.cookies >= upgradeCost) {
        numbersUpgradedClick += 1;
        window.clicker += 1;
        localStorage.setItem("clicker", String(window.clicker));
        window.cookies -= upgradeCost;
        updateCookies();
        upgradeClickButton.innerText = `Upgrade clicking required: ${numbersUpgradedClick * numbersUpgradedClick + 20}`;
    } else {
        alert("Not enough cookies for upgrade!");
    }
}