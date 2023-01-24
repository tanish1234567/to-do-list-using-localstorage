let submitbtn = document.getElementById("submitbtn");
let title = document.getElementById("title");
let textcenter = document.getElementById("textcenter");
let cardContainer = document.getElementById("card-container");
let del = document.getElementsByClassName("del");
let search = document.getElementById("search");
let inputsearch = document.getElementById("inputsearch");
displayText();
submitbtn.addEventListener('click', (Event) => {
    Event.preventDefault();
    let a = title.value;
    let b = textcenter.value;
    title.value = "";
    textcenter.value = "";
    if (localStorage.getItem("keys") == null) {
        let arr = new Array();
        let obj = {
            key: a,
            val: b
        };
        arr.push(obj);
        localStorage.setItem("keys", JSON.stringify(arr));
    }
    else {
        let arr = JSON.parse(localStorage.getItem("keys"));
        let obj = {
            key: a,
            val: b
        };
        arr.push(obj);
        localStorage.setItem("keys", JSON.stringify(arr));
    }
    displayText();
});
function displayText() {
    if (localStorage.getItem("keys") == null) {
        return;
    }
    else {
        let arr = JSON.parse(localStorage.getItem("keys"));
        cardContainer.innerHTML = ``;
        for (let i = 0; i < arr.length; i++) {
            cardContainer.innerHTML += ` <div class="card my-4" id = "${i}"style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${arr[i].key}</h5>
                <p class="card-text">${arr[i].val}</p>
                <a class="btn btn-primary del" id = "${i}" onclick = "delthis(this.id)">Delete</a>
            </div>
        </div>`
        }
    }
}
function delthis(id) {
    let arr = JSON.parse(localStorage.getItem("keys"));
    arr.splice(id, 1);
    localStorage.setItem("keys", JSON.stringify(arr));
    displayText();
}
search.addEventListener("click", (Event) => {
    Event.preventDefault();
    let valu = inputsearch.value;
    inputsearch.value = "";
    if (valu != "") {
        let arr = JSON.parse(localStorage.getItem("keys"));
        cardContainer.innerHTML = ``;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].key.includes(valu) || arr[i].val.includes(valu)) {
                cardContainer.innerHTML += ` <div class="card my-4" id = "${i}"style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${arr[i].key}</h5>
                <p class="card-text">${arr[i].val}</p>
                <a class="btn btn-primary del" id = "${i}" onclick = "delthis(this.id)">Delete</a>
            </div>
        </div>`
            }
        }
    }
});
