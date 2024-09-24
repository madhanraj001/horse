const commentsSection = document.getElementById('comments-section');
const commentInput = document.getElementById('comment-input');
const submitButton = document.getElementById('submit-comment');

submitButton.addEventListener('click', () => {
    const commentText = commentInput.value;
    if (commentText) {
        fetch('/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: commentText })
        })
        .then(response => response.json())
        .then(data => {
            displayComment(data);
            commentInput.value = '';
        });
    }
});

function displayComment(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `
        <p>${comment.text}</p>
        <button class="like" onclick="likeComment(${comment.id})">Like (${comment.likes})</button>
        <button class="dislike" onclick="dislikeComment(${comment.id})">Dislike (${comment.dislikes})</button>
    `;
    commentDiv.dataset.id = comment.id;
    commentsSection.prepend(commentDiv);
}

function likeComment(id) {
    fetch(`/comments/${id}/like`, { method: 'POST' })
        .then(response => response.json())
        .then(data => updateComment(data));
}

function dislikeComment(id) {
    fetch(`/comments/${id}/dislike`, { method: 'POST' })
        .then(response => response.json())
        .then(data => updateComment(data));
}

function updateComment(comment) {
    const commentDiv = Array.from(commentsSection.children).find(div => div.dataset.id == comment.id);
    if (commentDiv) {
        commentDiv.querySelector('.like').innerText = `Like (${comment.likes})`;
        commentDiv.querySelector('.dislike').innerText = `Dislike (${comment.dislikes})`;
    }
}
