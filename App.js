
const displayCenters = document.querySelector("#display-centers");
const cityBtn = document.querySelector("#city-btn");
const stateBtn = document.querySelector("#state-btn");
const centerBtn = document.querySelector("#center-btn");
let inputBar = document.querySelector("#input-bar");

let centersList; // I will fetch my data in this 

async function fetchCenters() {
    const response = await fetch('https://isro.vercel.app/api/centres');
    const json = await response.json();
    centersList = json.centres; // Storing the fetched data in cetersList
}

async function showAllISROCenters() {
    if (!centersList) {      // if centerList is undefine than this will be !false -> true and below line will in action
        await fetchCenters(); // Fetching the data if not fetched
    }

    for (let list of centersList) {
        createElementsAndRender(list, "seprate-blocks");
    }
}

showAllISROCenters();


function createElementsAndRender(list, className) {

    // CREATING PARENT BLOCK
    const separteblocksdiv = document.createElement("div");
    separteblocksdiv.classList.add(className);
    separteblocksdiv.id = list.id;

    // CREATING CENTER DIV
    const centerDiv = document.createElement("div");
    const h2Center = document.createElement("h2");
    h2Center.innerText = "CENTER";
    const h2CenterName = document.createElement("h2");
    h2CenterName.innerText = list.name;
    h2CenterName.style.fontWeight = 400;

    // APPENDING CENTER DIV INTO PARENT DIV
    centerDiv.appendChild(h2Center);
    centerDiv.appendChild(h2CenterName);
    separteblocksdiv.appendChild(centerDiv);

    //CREATING CITY DIV
    const cityDiv = document.createElement("div");
    const h2City = document.createElement("h2");
    h2City.innerText = "CITY";
    const h2CityName = document.createElement("h2");
    h2CityName.innerText = list.Place;
    h2CityName.style.fontWeight = 400;

    // APPENDING CITY DIV
    cityDiv.appendChild(h2City);
    cityDiv.appendChild(h2CityName);
    separteblocksdiv.appendChild(cityDiv);

    // CREATING STATE DIV
    const stateDiv = document.createElement("div");
    const h2State = document.createElement("h2");
    h2State.innerText = "STATE";
    const h2StateName = document.createElement("h2");
    h2StateName.innerText = list.State;
    h2StateName.style.fontWeight = 400;

    //APPENDING STATE DIV
    stateDiv.appendChild(h2State);
    stateDiv.appendChild(h2StateName);
    separteblocksdiv.appendChild(stateDiv);

    // APPENDING PARENT DIV INTO HTML DIV
    displayCenters.appendChild(separteblocksdiv);

}

//BUTTON CHANGING COLOR FUNCTIONALITIES
function btnColorChange(eventbtn, btn1, btn2) {
    btn1.classList.remove("selected-button");
    btn2.classList.remove("selected-button");

    if (eventbtn.classList.contains("selected-button")) {
        eventbtn.classList.remove("selected-button");
    }
    else {
        eventbtn.classList.add("selected-button");

    }
}

cityBtn.addEventListener("click", () => {
    btnColorChange(cityBtn, centerBtn, stateBtn); // CHANGING CITY BTN
});

stateBtn.addEventListener("click", () => {
    btnColorChange(stateBtn, centerBtn, cityBtn); // CHANGING STATE BTN

})

centerBtn.addEventListener("click", () => {
    btnColorChange(centerBtn, cityBtn, stateBtn); // CHANGING CENTER BTN

})


// INPUT BAR/SEARCH FUNCTIONALITY (MAIN EVENT LISTNER)

inputBar.addEventListener("input", function () {

    let defaultBlock = document.querySelectorAll(".seprate-blocks");
    let inputlowerCase = inputBar.value.toLowerCase();

    function displayStyle(blockName, styleValue) {  // THIS WILL SET THE DISPLAY OF BLOCK NONE/GRID/
        for (block of blockName) {
            block.style.display = styleValue;
        }
    }

    function filterandDisplayCenters(location) {
        if (inputBar.value !== "") {
            displayStyle(defaultBlock, "none");

            for (list of centersList) {
                let selected = document.getElementById(list.id);

                if (list[location].toLowerCase().includes(inputlowerCase)) {
                    selected.style.display = "grid";
                }
            }
        } else {
            displayStyle(defaultBlock, "grid");
        }
    }

    // DISPLAY BLOCKS BY CITY NAME
    if (cityBtn.classList.contains("selected-button")) {
        filterandDisplayCenters("Place");
    }

    // DISPLAY BLOCKS BY STATE NAME
    if (stateBtn.classList.contains("selected-button")) {
        filterandDisplayCenters("State");
    }

    // DISPLAY BLOCKS BY CENTER NAME
    if (centerBtn.classList.contains("selected-button")) {
        filterandDisplayCenters("name");
    }

})