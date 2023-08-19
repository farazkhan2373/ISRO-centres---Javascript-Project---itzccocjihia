
const displayCenters = document.querySelector("#display-centers");
const cityBtn = document.querySelector("#city-btn");
const stateBtn = document.querySelector("#state-btn");
const centerBtn = document.querySelector("#center-btn");
let inputBar = document.querySelector("#input-bar");

let centersList; // I will fetch my data in this 

async function fetchCenters() {
    const response = await fetch('https://isro.vercel.app/api/centres');
    const json = await response.json();
    centersList = json.centres; // Storing the fetched data
}

async function showAllISROCenters() {
    if (!centersList) {      // if centerList is undefine than this will be true hahaha and below if not fetched than fetch
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
    
    // CREATING CENTER KA DIV
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

    // APPENDING PARENT DIV INTO HTML WALA DIV
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

 inputBar.addEventListener("input", function(){

    let defaultBlock = document.querySelectorAll(".seprate-blocks");
    let selectedBlock = document.querySelectorAll(".selected-blocks");
    let inputlowerCase = inputBar.value.toLowerCase();

    function displayStyle(blockName, styleValue) {  // THIS WILL SET THE DISPLAY OF BLOCK NONE/GRID/FLEX
        for (block of blockName) {
            block.style.display = styleValue;
        }
    }

    // DISPLAY BLOCKS BY CITY NAME
    if (cityBtn.classList.contains("selected-button")) {

        if (inputBar.value !== "") {
            displayStyle(defaultBlock, "none");  // IF INPUT CONTANS SOME STRING THAN DEFAULT WILL NONE
        }
        else {
            displayStyle(defaultBlock, "grid");
            displayStyle(selectedBlock, "none");  // IF INPUT IS EMPTY WILL DISPLAY THE DEFAULT BLOCKS
        }

        // HERE WE ARE CHECKING IF INPUT MATCHES WITH OUR DATA IF YES THAN DISPLAY BLOCK BY CITY
        for (list of centersList) {
            if (inputlowerCase === list.Place.toLowerCase()) {

                createElementsAndRender(list, "selected-blocks");
            }

            if (inputlowerCase !== list.Place.toLowerCase()) {
                displayStyle(selectedBlock, "none");
            }

        }

    }

    // STATE BUTTON SELECTION
    if (stateBtn.classList.contains("selected-button")) {
        if (inputBar.value !== "") {
            displayStyle(defaultBlock, "none");
        }
        else {
            displayStyle(defaultBlock, "grid");
            displayStyle(selectedBlock, "none");
        }
        

        if (inputlowerCase === "punjab" || inputlowerCase === "haryana") {
            createElementsAndRender(centersList[0], "selected-blocks");
        }

        for (list of centersList) {

            if (inputlowerCase === list.State.toLowerCase()) {

                createElementsAndRender(list, "selected-blocks");
            }

            if (inputlowerCase !== list.State.toLowerCase()) {
                displayStyle(selectedBlock, "none");
            }

        }
    }


    // CENTER BUTTON SELECTION
    if (centerBtn.classList.contains("selected-button")) {

        if (inputBar.value !== "") {
            displayStyle(defaultBlock, "none");
        }
        else {
            displayStyle(defaultBlock, "grid");
            displayStyle(selectedBlock, "none");
        }

        for (list of centersList) {

            if (inputlowerCase === list.name.toLowerCase()) {

                createElementsAndRender(list, "selected-blocks");
            }

            if (inputlowerCase !== list.name.toLowerCase()) {
                displayStyle(selectedBlock, "none");
            }

        }

    }

})










