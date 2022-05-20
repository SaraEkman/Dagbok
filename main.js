const form = document.querySelector("form");
const container = document.querySelector(".container");
const postsArr = [];

window.addEventListener('load', async () => {
    let posts = await makeReq('http://localhost:3000/post', 'GET');

    localStorage.setItem('posts', JSON.stringify(posts));
    console.log(posts);
    printHtml();
});


if (localStorage.getItem("posts") === null) {
    localStorage.setItem("posts", JSON.stringify(postsArr));
}

async function Submit(e) {
    e.preventDefault();
    form.insertAdjacentHTML('beforebegin', '<h1 class="error"></h1>');
    let storage = {
        title: form.title.value,
        content: form.message.value
    };

    if (form.title.value === "" || form.message.value === "") {
        document.querySelector('.error').innerHTML = 'Fyll i formuläret tack'
        setTimeout(() => {
            document.querySelector('.error').innerHTML = '';
        }, 3000);
    } else {
        document.querySelector('.error').innerHTML = '';
        let posts = await makeReq('http://localhost:3000/post', 'POST', storage);

        let postsD = await makeReq('http://localhost:3000/post', 'GET');
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
        console.log(i);
    }
    const removeBtns = document.querySelectorAll(".removeBtn");
    for (let el of removeBtns) {
        el.addEventListener("click", async (e) => {
            console.log(e.target.parentElement.id);
            await makeReq('http://localhost:3000/post', 'DELETE', { _id: e.target.parentElement.id });

            container.innerHTML = "";

            let postsD = await makeReq('http://localhost:3000/post', 'GET');
            localStorage.setItem("posts", JSON.stringify(postsD));

            console.log(postsD);
            location.reload();
        });
    }
    const editBtns = document.querySelectorAll('.editBtn');
    for (let btn of editBtns) {
        btn.addEventListener("click", async (e) => {
            // e.preventDefault();

            let popUpContent = document.querySelector('.popUp');
            popUpContent.style.display = 'block';

            let popUpForm = document.querySelector('.popUpForm');
            let popUpFormBtnSave = document.querySelector('.saveBtn');
            let popUpFormBtnCancel = document.querySelector('.cancelBtn');
            console.log(e.target.parentElement.id);
            let _id = e.target.parentElement.id;
            // popUpForm.insertAdjacentHTML('beforebegin', '<h1 class="error"></h1>');

            popUpFormBtnSave.addEventListener('click', async () => {
                e.preventDefault()
                if (popUpForm.title.value === "" || popUpForm.message.value === "") {
                    // console.log(popUpForm.title.value);
                    // document.querySelector('.error').innerHTML = 'Fyll i formuläret tack';
                    // setTimeout(() => {
                    //     document.querySelector('.error').innerHTML = '';
                    // }, 3000);
                    return
                }
                else {
                    // document.querySelector('.error').innerHTML = '';
                    let edit = await makeReq('http://localhost:3000/post', 'PUT', {
                        _id: _id, title: popUpForm.title.value,
                        content: popUpForm.message.value
                    });
                    console.log(edit);

                    container.innerHTML = "";

                    let postsD = await makeReq('http://localhost:3000/post', 'GET');
                    localStorage.setItem("posts", JSON.stringify(postsD));

                    console.log(postsD);
                    location.reload();
                    popUpContent.style.display = 'none';
                }
            });

            popUpFormBtnCancel.addEventListener('click', () => {
                e.preventDefault();
                popUpContent.style.display = 'none';
                return `<a href="#body"></a>`;
            });

        });
    }
}
printHtml();

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