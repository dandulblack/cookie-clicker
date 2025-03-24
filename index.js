const cookieCounter = document.getElementById("cookiesCounter");
const resetButton = document.getElementById("reset");
let numbersClicked = 0;
let numbersUpgradedClick = parseInt(localStorage.getItem("clicker")) - 1;
let numbersAddedGrandma = parseInt(localStorage.getItem("grandmaCount"));
const upgradeClickButton = document.getElementById("upgradeClick");
const upgradeGrandmaButton = document.getElementById("upgradeGrandma")

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

    if (localStorage.getItem("grandmaCount") !== null) {
        let storedgrandmaCount = parseInt(localStorage.getItem("grandmaCount"), 0);
        window.grandmaCount = isNaN(storedgrandmaCount) ? 0 : storedgrandmaCount; 
    } else {
        window.grandmaCount = 0;
        localStorage.setItem("grandmaCount", "0");
    }
} catch (e) {
    console.log(e);
}

upgradeClickButton.innerText = `Upgrade clicking required: ${numbersUpgradedClick * numbersUpgradedClick + 20}`;
upgradeGrandmaButton.innerText = `Grandma required: ${numbersAddedGrandma * numbersAddedGrandma + 50}`;


updateCookies();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
        resetButton.innerText = "reset everything";
        window.cookies = 0;
        updateCookies();
        numbersClicked = 0;
        numbersUpgradedClick = 0;
        window.clicker = 1;
        localStorage.setItem("clicker", "1");
        upgradeClickButton.innerText = `Upgrade clicking required: 20`;
        window.grandmaCount = 0;
        numbersAddedGrandma = 0;
        upgradeGrandmaButton.innerText = `Grandma required: ${numbersAddedGrandma * numbersAddedGrandma + 50}`;
        localStorage.setItem("grandmaCount", String(window.grandmaCount));
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

async function checkGrandmas() {
    while (true){
        window.cookies += window.grandmaCount;
        updateCookies()
        await sleep(1000)
    }
}

function addGrandma() {
    const upgradeCost = numbersAddedGrandma * numbersAddedGrandma + 50;
    if (window.cookies >= upgradeCost) {
        numbersAddedGrandma += 1;
        window.grandmaCount += 1;
        localStorage.setItem("grandmaCount", String(window.grandmaCount));
        window.cookies -= upgradeCost;
        updateCookies();
        upgradeGrandmaButton.innerText = `Grandma required: ${numbersAddedGrandma * numbersAddedGrandma + 50}`;
    } else {
        alert("Not enough cookies for upgrade!");
    }
}

checkGrandmas()