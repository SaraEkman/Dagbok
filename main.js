// const datum = document.getElementById("datum");
// const rubrik = document.getElementById("rubrik");
// const meddelande = document.getElementById("meddelande");
// const btnSave = document.getElementById("btnSave");

// const div = document.getElementById("content");
// div.style.marginTop = "3rem"

// const header = document.createElement("h2");
// header.style.marginTop = "5rem";

// const para = document.createElement("p");
// const paraTwo = document.createElement("p");
// div.append(header, para, paraTwo);


// btnSave.addEventListener("click", saveToLS);

// window.addEventListener("load", initSite);


// function initSite() {
//     renderData();
// }

// function getDataFromLs() {

//     let listData = localStorage.getItem("Data");

//     if (listData) {
//         listData = JSON.parse(listData);
//     } else {
//         listData = [];
//     }

//     return listData;
// }


// function saveToLS() {
//     let rub = rubrik.value,
//         dat = datum.value,
//         med = meddelande.value;

//     let listData = getDataFromLs();
//     listData.push(rub, dat, med);

//     localStorage.setItem("Data", JSON.stringify(listData));
//     renderData();
// }

// function renderData() {

//     div.innerHTML = ""
//     let listData = getDataFromLs();

//     console.log(listData);

//     for (let i = 0; i < listData.length; i++) {
//         let item = listData[i];
//         console.log(item);
//         console.log(i);
//         const header = document.createElement("h2");

// const para = document.createElement("p");
// const paraTwo = document.createElement("p");
// div.append(header);

// header.textContent = item;
// para.textContent = datum.value;
// paraTwo.textContent = meddelande.value;

// }

// header.value = "";
// para.value = "";
// paraTwo.value = "";


// header.textContent = rubrik.value;
// para.textContent = datum.value;
// paraTwo.textContent = meddelande.value;

// let array = [header.textContent, para.textContent, paraTwo.textContent];
// console.log(array);
// localStorage.setItem("data", JSON.stringify(array));


// }





/* Våra dagboksinlägg skall sparas i localStorage så att vi kan återkomma till sidan vid ett senare tillfälle och skriva nya inlägg. 

När vi skapar ett inlägg så skall vi kunna ändra och skriva datum, rubrik samt en text.
Alla skriva inlägg skall sedan visas i kronologiskt ordning på sidan under formuläret.;*/

const form = document.querySelector("form");
const container = document.querySelector(".container");

const dagbok = [];

// Set till att det finns en tom array i localStorage
if (localStorage.getItem("dagbokInlagg") === null) {
    localStorage.setItem("dagbokInlagg", JSON.stringify(dagbok));
}


function handleSubmit(e) {
    e.preventDefault(); // Förhindra standardbeteende

    const storage = JSON.parse(localStorage.getItem("dagbokInlagg")); // Hämta från storage + Parse till js

    // Lägga till vårt nya inlägg
    storage.unshift({
        datum: new Date().toLocaleString(), // Lägger in tiden exakt när formuläret skickas
        rubrik: form.rubrik.value,
        meddelande: form.meddelande.value
    });

    localStorage.setItem("dagbokInlagg", JSON.stringify(storage)); // Spara till storage

    ritaInlagg();
}
form.addEventListener("submit", handleSubmit);

function inlagg(inlagg) {
    return `<div>
    <hr>
    <p>${inlagg.datum}</p>
    <h1>${inlagg.rubrik}</h1>
    <p>${inlagg.meddelande}</p>
  </div>`;
}

function ritaInlagg() {
    const storage = JSON.parse(localStorage.getItem("dagbokInlagg"));

    // Om storage inte är en tom lista
    if (storage.length > 0) {
        // skapa ett nytt element för varje inlägg
        container.innerHTML = storage.map(i => inlagg(i));
    }
}
ritaInlagg(); // Kör den här varje gång sidan laddas











// let arry = ["Sara", "Ekman", "Hallo"]
// localStorage.setItem("test", JSON.stringify(arry))
// let test = JSON.parse(localStorage.getItem("test"))

// console.log(test);






// if (localStorage.getItem("data")) {
//     array = []
// }
// else {
//     JSON.parse(localStorage.getItem("data"))
// }















// console.log("hello world");

// //skapa variabler för rubrik, datum, inlägg, knapp
// let textTitle = document.getElementById("textTitle");
// let textDate = document.getElementById("textDate");
// let textEntry = document.getElementById("textEntry");
// let saveBtn = document.getElementById("saveBtn");
// let diaryContent = document.getElementById("diaryContent");

// //funktion för att skapa dagboksinlägget vi fyllt i
// function getEntry(textTitle, textDate, textEntry) {
//     let entry = document.createElement("article");

//     //skapa variabel och ett element för titel
//     let saveTitle = document.createElement("h4");
//     saveTitle.innerText = "Titel: " + textTitle.value;
//     entry.append(saveTitle);

//     localStorage.setItem("title", saveTitle);
//     let lsTitle = localStorage.getItem("title");
//     console.log(lsTitle);

//     //skapa variabel och ett element för datumet
//     let saveDate = document.createElement("p");
//     saveDate.innerText = "Datum: " + textDate.value;
//     entry.append(saveDate);

//     localStorage.setItem("date", saveDate);
//     let lsDate = localStorage.getItem("date");
//     console.log(lsDate);

//     //skapa variabel och ett element för texten
//     let saveEntry = document.createElement("p");
//     saveEntry.innerText = textEntry.value;
//     entry.append(saveEntry);

//     localStorage.setItem("text", saveEntry);
//     let lsEntry = localStorage.getItem("text");
//     console.log(lsEntry);

//     document.body.append(entry);
// }

// //skapa clickfunktion till knapp för att spara inlägget
// saveBtn.addEventListener("click", (evt) => {
//     evt.preventDefault();

//     getEntry(textTitle, textDate, textEntry);

//     // if (value) {
//     //     localStorage.setItem("namn", value);
//     //     location.reload();
//     // }

//     document.getElementById("textEntry").value = "";
//     document.getElementById("textTitle").value = "";
// });

// for (let i = 0; i < localStorage.length; i++) {

//     const namn = localStorage.key(i);
//     const value = localStorage.getItem(namn);

//     //visa värdet jag skriver i input
//     myName.innerHTML += `${value}`;

//     //visa radera-knapp
//     document.body.append(removeBtn);

//     //ta bort värdet
//     removeBtn.addEventListener("click", () => {
//         removeBtn.remove();
//         localStorage.removeItem(namn);
//         myName.innerHTML = "";
//     });