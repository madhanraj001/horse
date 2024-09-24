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
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        
        const img = document.createElement("img");
        img.src = comment.imageUrl;
        img.alt = "Uploaded image";
        
        const p = document.createElement("p");
        p.textContent = comment.text;

        postDiv.appendChild(img);
        postDiv.appendChild(p);
        postsDiv.appendChild(postDiv);
    });
}

function addComment() {
    const commentInput = document.getElementById("commentInput");
    const imageInput = document.getElementById("imageInput");

    const commentText = commentInput.value.trim();
    const file = imageInput.files[0];

    if (commentText && file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            comments.push({ text: commentText, imageUrl: e.target.result });
            commentInput.value = "";
            imageInput.value = "";
            saveData();
            updateUI();
        };
        reader.readAsDataURL(file);
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
