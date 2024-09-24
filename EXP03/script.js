let likeCount = 0;
let dislikeCount = 0;
const posts = JSON.parse(localStorage.getItem("posts")) || [];

function updateUI() {
    document.getElementById("likeCount").textContent = likeCount;
    document.getElementById("dislikeCount").textContent = dislikeCount;
    displayPosts();
}

function displayPosts() {
    const postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";
    posts.forEach((post, index) => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        
        const img = document.createElement("img");
        img.src = post.imageUrl;
        img.alt = "Uploaded image";
        
        const p = document.createElement("p");
        p.textContent = post.text;

        const commentsDiv = document.createElement("div");
        post.comments.forEach(comment => {
            const commentDiv = document.createElement("div");
            commentDiv.className = "comment";
            commentDiv.textContent = comment;
            commentsDiv.appendChild(commentDiv);
        });

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => removePost(index);

        const likeBtn = document.createElement("button");
        likeBtn.textContent = `👍 (${post.likes})`;
        likeBtn.onclick = () => {
            post.likes++;
            saveData();
            updateUI();
        };

        const dislikeBtn = document.createElement("button");
        dislikeBtn.textContent = `👎 (${post.dislikes})`;
        dislikeBtn.onclick = () => {
            post.dislikes++;
            saveData();
            updateUI();
        };

        postDiv.appendChild(img);
        postDiv.appendChild(p);
        postDiv.appendChild(commentsDiv);
        postDiv.appendChild(removeBtn);
        postDiv.appendChild(likeBtn);
        postDiv.appendChild(dislikeBtn);
        postsDiv.appendChild(postDiv);
    });
}

function addPost() {
    const commentInput = document.getElementById("commentInput");
    const imageInput = document.getElementById("imageInput");

    const commentText = commentInput.value.trim();
    const file = imageInput.files[0];

    if (commentText && file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            posts.push({ text: commentText, imageUrl: e.target.result, comments: [], likes: 0, dislikes: 0 });aaa
            commentInput.value = "";
            imageInput.value = "";
            saveData();
            updateUI();
        };
        reader.readAsDataURL(file);
    }
}

function removePost(index) {
    posts.splice(index, 1);
    saveData();
    updateUI();
}

function saveData() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function loadData() {
    updateUI();
}

// Emoji functionality
function addEmoji(emoji) {
    const commentInput = document.getElementById("commentInput");
    commentInput.value += emoji; // Add the selected emoji to the comment input
}

// Load data on page load
window.onload = loadData;
