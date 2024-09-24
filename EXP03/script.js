const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('postsContainer');

let posts = [];

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const postContent = document.getElementById('postContent').value;
    const postImage = document.getElementById('postImage').files[0];
    const postId = Date.now();
    
    const post = {
        id: postId,
        content: postContent,
        image: postImage ? URL.createObjectURL(postImage) : null,
        comments: []
    };
    
    posts.push(post);
    renderPosts();
    postForm.reset();
});

function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        
        postDiv.innerHTML = `
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" style="max-width: 100%;">` : ''}
            <div>
                <h4>Comments:</h4>
                <div id="comments-${post.id}"></div>
                <textarea id="commentInput-${post.id}" placeholder="Add a comment..."></textarea>
                <button onclick="addComment(${post.id})">Comment</button>
            </div>
        `;
        
        postsContainer.appendChild(postDiv);
        renderComments(post);
    });
}

function renderComments(post) {
    const commentsDiv = document.getElementById(`comments-${post.id}`);
    commentsDiv.innerHTML = '';
    
    post.comments.forEach((comment, index) => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
            <p>${comment.text} <span>Likes: ${comment.likes} Dislikes: ${comment.dislikes}</span></p>
            <button class="button" onclick="likeComment(${post.id}, ${index})">Like</button>
            <button class="button" onclick="dislikeComment(${post.id}, ${index})">Dislike</button>
            <button class="button" onclick="deleteComment(${post.id}, ${index})">Delete</button>
        `;
        commentsDiv.appendChild(commentDiv);
    });
}

function addComment(postId) {
    const commentInput = document.getElementById(`commentInput-${postId}`);
    const commentText = commentInput.value;
    
    if (commentText) {
        const post = posts.find(p => p.id === postId);
        post.comments.push({ text: commentText, likes: 0, dislikes: 0 });
        renderPosts();
        commentInput.value = '';
    }
}

function likeComment(postId, commentIndex) {
    const post = posts.find(p => p.id === postId);
    post.comments[commentIndex].likes++;
    renderPosts();
}

function dislikeComment(postId, commentIndex) {
    const post = posts.find(p => p.id === postId);
    post.comments[commentIndex].dislikes++;
    renderPosts();
}

function deleteComment(postId, commentIndex) {
    const post = posts.find(p => p.id === postId);
    post.comments.splice(commentIndex, 1);
    renderPosts();
}
