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

        const commentInput = document.createElement("input");
        commentInput.type = "text";
        commentInput.placeholder = "Add a comment";

        const addCommentButton = document.createElement("button");
        addCommentButton.textContent = "Submit Comment";
        addCommentButton.onclick = () => {
            if (commentInput.value.trim()) {
                post.comments.push(commentInput.value.trim());
                saveData();
                updateUI();
                commentInput.value = ""; // Clear input after submitting
            }
        };

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => removePost(index);

        postDiv.appendChild(img);
        postDiv.appendChild(p);
        postDiv.appendChild(commentsDiv);
        postDiv.appendChild(commentInput);
        postDiv.appendChild(addCommentButton);
        postDiv.appendChild(removeBtn);
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
            posts.push({ text: commentText, imageUrl: e.target.result, comments: [] });
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

function addEmoji(emoji) {
    const commentInput = document.getElementById("commentInput");
    commentInput.value += emoji; // Add the selected emoji to the comment input
}

function likeAll() {
    likeCount++;
    updateUI();
}

function dislikeAll() {
    dislikeCount++;
    updateUI();
}

// Load data on page load
window.onload = updateUI;
