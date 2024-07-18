// const notesContainer =document.querySelector(".notes-container");
// const createBtn =document.querySelector(".btn");
// let notes = document.querySelectorAll(".input-box");


// function showNotes(){
//     notesContainer.innerHTML = localStorage.getItem("notes");
// }
// showNotes();

// function updatestorage(){
//     localStorage.setItem("notes", notesContainer.innerHTML)
// }

// createBtn.addEventListener("click", ()=> {
//     let inputBox = document.createElement("p");
//     let img = document.createElement("img");
//     inputBox.className = "input-box";
//     inputBox.setAttribute("contenteditable", "true");
//     img.src = "https://cdn-icons-png.flaticon.com/128/3221/3221897.png";
//     notesContainer.appendChild(inputBox).appendChild(img);
// })

// notesContainer.addEventListener("click", function(e) {
//     if(e.target.tagName ==="IMG"){
//         e.target.parentElement.remove();
//         updatestorage();
//     }    
//     else if(e.target.tagName === "p"){
//         notes = document.querySelectorAll(".input-box");
//         notes.forEach(nt => {
//             nt.onkeyup = function(){
//                 updatestorage();
//             }
//         })
//     }
// })
const notesContainer = document.querySelector(".notes-container");
const pinnedContainer = document.querySelector(".pinned-notes");
const unpinnedContainer = document.querySelector(".unpinned-notes");
const createBtn = document.querySelector(".btn");
const searchBar = document.querySelector("#search-bar");
const filterOptions = document.querySelector("#filter-options");

function showNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || { pinned: [], unpinned: [] };
    pinnedContainer.innerHTML = notes.pinned.map(note => createNoteHTML(note)).join('');
    unpinnedContainer.innerHTML = notes.unpinned.map(note => createNoteHTML(note)).join('');
}
showNotes();

function updateStorage() {
    const notes = {
        pinned: Array.from(pinnedContainer.children).map(note => note.outerHTML),
        unpinned: Array.from(unpinnedContainer.children).map(note => note.outerHTML),
    };
    localStorage.setItem("notes", JSON.stringify(notes));
}

function createNoteHTML(content) {
    return `<div class="input-box" contenteditable="true">${content}
        <img class="delete-icon" src="https://cdn-icons-png.flaticon.com/128/3221/3221897.png">
        <img class="pin-icon" src="https://cdn-icons-png.flaticon.com/128/1828/1828617.png">
    </div>`;
}

createBtn.addEventListener("click", () => {
    const newNoteHTML = createNoteHTML('');
    unpinnedContainer.innerHTML += newNoteHTML;
    updateStorage();
});

notesContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete-icon")) {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.classList.contains("pin-icon")) {
        const note = e.target.parentElement;
        if (note.parentElement.classList.contains("pinned-notes")) {
            unpinnedContainer.appendChild(note);
        } else {
            pinnedContainer.appendChild(note);
        }
        updateStorage();
    }
});

notesContainer.addEventListener("input", function(e) {
    if (e.target.classList.contains("input-box")) {
        updateStorage();
    }
});
searchBar.addEventListener("input", function(e) {
    const query = e.target.value.toLowerCase();
    filterNotes(query);
});

filterOptions.addEventListener("change", function(e) {
    const filter = e.target.value;
    filterNotes(searchBar.value.toLowerCase(), filter);
});

function filterNotes(query, filter = "all") {
    const pinnedNotes = document.querySelectorAll(".pinned-notes .input-box");
    const unpinnedNotes = document.querySelectorAll(".unpinned-notes .input-box");

    pinnedNotes.forEach(note => {
        const text = note.innerText.toLowerCase();
        const matchesQuery = text.includes(query);
        const matchesFilter = filter === "all" || filter === "pinned";
        note.style.display = matchesQuery && matchesFilter ? 'block' : 'none';
    });

    unpinnedNotes.forEach(note => {
        const text = note.innerText.toLowerCase();
        const matchesQuery = text.includes(query);
        const matchesFilter = filter === "all" || filter === "unpinned";
        note.style.display = matchesQuery && matchesFilter ? 'block' : 'none';
    });
}