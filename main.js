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