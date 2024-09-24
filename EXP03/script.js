let likeCount = 0;
let dislikeCount = 0;
const comments = [];

function updateUI() {
    document.getElementById("likeCount").textContent = likeCount;
    document.getElementById("dislikeCount").textContent = dislikeCount;
    displayComments();
}

function displayComments() {
    const postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";
    comments.forEach(comment => {
        const p = document.createElement("p");
        p.textContent = comment;
        postsDiv.appendChild(p);
    });
}

function addComment() {
    const commentInput = document.getElementById("commentInput");
    const comment = commentInput.value.trim();
    if (comment) {
        comments.push(comment);
        commentInput.value = "";
        saveData();
        updateUI();
    }
}

function likePost() {
    likeCount++;
    saveData();
    updateUI();
}

function dislikePost() {
    dislikeCount++;
    saveData();
    updateUI();
}

function saveData() {
    localStorage.setItem("likes", likeCount);
    localStorage.setItem("dislikes", dislikeCount);
    localStorage.setItem("comments", JSON.stringify(comments));
}

function loadData() {
    likeCount = parseInt(localStorage.getItem("likes")) || 0;
    dislikeCount = parseInt(localStorage.getItem("dislikes")) || 0;
    const savedComments = localStorage.getItem("comments");
    if (savedComments) {
        comments.push(...JSON.parse(savedComments));
    }
    updateUI();
}

// Load data on page load
window.onload = loadData;
