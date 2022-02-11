const form = document.querySelector("form");
const container = document.querySelector(".container");

const dagbok = [];

if (localStorage.getItem("diary") === null) {
    localStorage.setItem("diary", JSON.stringify(dagbok));
}

function Submit(e) {
    e.preventDefault();
    const storage = JSON.parse(localStorage.getItem("diary"));

    storage.unshift({
        rubrik: form.rubrik.value,
        meddelande: form.meddelande.value,
        datum: new Date().toLocaleString()
    });
    localStorage.setItem("diary", JSON.stringify(storage));
    container.innerHTML = "";
    printI();
}

form.addEventListener("submit", Submit);

function printI() {
    const storage = JSON.parse(localStorage.getItem("diary"));
        for (let i = 0;i<= storage.length-1; i++) {
            container.innerHTML += `<div id=${i}>
                        <hr>
                        <h2>${storage[i].rubrik}</h2>
                        <p>${storage[i].meddelande} </p>
                        <p>${storage[i].datum}</p>
                        <button class='btnR'>TA BORT</button>
                    </div>`;
            console.log(i);
    }
    const btn = document.querySelectorAll(".btnR");
    for (let el of btn) {
        el.addEventListener("click", (e) => { 
            console.log(e.target.parentElement.id);
            storage.splice(e.target.parentElement.id, 1);
            localStorage.setItem("diary", JSON.stringify(storage));
            console.log(storage); 
            location.reload(); 
        })
    }  
}
printI();


