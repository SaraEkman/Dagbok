const form = document.querySelector("form");
const container = document.querySelector(".container");
let popUpContent = document.querySelector('.popUp');

let popUpForm = document.querySelector('.popUpForm');
let popUpFormBtnSave = document.querySelector('.saveBtn');
let popUpFormBtnCancel = document.querySelector('.cancelBtn');
const postsArr = [];
let _id;


window.addEventListener('load', async () => {
    let posts = await makeReq('https://myblogwithmongoose.herokuapp.com/post', 'GET');

    localStorage.setItem('posts', JSON.stringify(posts));
    console.log(posts);
    printHtml();
});


// if (JSON.parse(localStorage.getItem("posts")) === null) {
//     localStorage.setItem("posts", JSON.stringify(postsArr));
// }

async function Submit(e) {
    e.preventDefault();
    form.insertAdjacentHTML('beforebegin', '<h1 class="error"></h1>');
    let storage = {
        title: form.title.value,
        content: form.message.value
    };

    if (form.title.value === "" || form.message.value === "") {
        document.querySelector('.error').innerHTML = 'Fyll i formuläret tack';
        setTimeout(() => {
            document.querySelector('.error').innerHTML = '';
        }, 3000);
    } else {
        document.querySelector('.error').innerHTML = '';
        let posts = await makeReq('https://myblogwithmongoose.herokuapp.com/post', 'POST', storage);

        let postsD = await makeReq('https://myblogwithmongoose.herokuapp.com/post', 'GET');
        localStorage.setItem('posts', JSON.stringify(postsD));
        container.innerHTML = "";
        console.log(posts); 
        printHtml();
    }
}

form.addEventListener("submit", Submit);


function printHtml() {
    container.innerHTML = "";

    const storage = JSON.parse(localStorage.getItem("posts"));
    for (let i = 0; i <= storage.length - 1; i++) {
        container.innerHTML += `<div id='${storage[i]._id}' >
                        <hr>
                        <h2>${storage[i].title}</h2>
                        <p>${storage[i].content} </p>
                        <p>${storage[i].date}</p>
                        <button class='removeBtn'>TA BORT</button>
                        <button class='editBtn'>Redigera</button>
                            </div>`;
        // console.log(i);
    }
    const removeBtns = document.querySelectorAll(".removeBtn");
    for (let el of removeBtns) {
        el.addEventListener("click", async (e) => {
            e.preventDefault();
            console.log("Id",e.target.parentElement.id);
            await makeReq('https://myblogwithmongoose.herokuapp.com/post', 'DELETE', { _id: e.target.parentElement.id });

            container.innerHTML = "";

            let postsD = await makeReq('https://myblogwithmongoose.herokuapp.com/post', 'GET');
            localStorage.setItem("posts", JSON.stringify(postsD));

            console.log(postsD);
            location.reload();
        });
    }
    const editBtns = document.querySelectorAll('.editBtn');
    for (let btn of editBtns) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            popUpContent.style.display = 'block';

            console.log(e.target.parentElement.id);
            _id = e.target.parentElement.id;

            popUpFormBtnCancel.addEventListener('click', () => {
                e.preventDefault();
                popUpContent.style.display = 'none';
                return `<a href="#body"></a>`;
            });
        });
    }
}
// printHtml();

async function update(e) {
    e.preventDefault();
    popUpForm.insertAdjacentHTML('afterbegin', '<h2 class="errorPopUp"></h2>');
    if (popUpForm.title.value === "" || popUpForm.message.value === "") {
        console.log(popUpForm.title.value);
        document.querySelector('.errorPopUp').innerHTML = 'Fyll i formuläret tack';
        setTimeout(() => {
            document.querySelector('.errorPopUp').innerHTML = '';
        }, 3000);
    } else {
        document.querySelector('.errorPopUp').innerHTML = '';
        let edit = await makeReq('https://myblogwithmongoose.herokuapp.com/post', 'PUT', {
            _id: _id, title: popUpForm.title.value,
            content: popUpForm.message.value
        });
        console.log(edit);


        let postsD = await makeReq('https://myblogwithmongoose.herokuapp.com/post', 'GET');
        localStorage.setItem("posts", JSON.stringify(postsD));
        container.innerHTML = "";

        console.log(postsD);
        printHtml();
        popUpContent.style.display = 'none';
    }
}

popUpForm.addEventListener("submit", update);

async function makeReq(url, method, body) {
    try {
        let response = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        return await response.json();
    } catch (err) { console.log('Error', err); }
}