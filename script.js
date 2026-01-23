/** * DOM Element Selectors 
 * Navigation and Input elements for the SocialSphere application
 */
let homePageIcon = document.querySelector(".home-page-icon");
let createPostIcon = document.querySelector(".create-post-icon");
let imageInput = document.querySelector("#imageInput");
let captionInput = document.querySelector('#captionInput');
let homePage = document.querySelector(".home-page");
let createPost = document.querySelector(".create-post");
let feed = document.querySelector("#feed");
let postBtn = document.querySelector("#postBtn");

/** * Application State 
 * Manages post data and user session
 */
let posts = [];
let users = ["Kiara", "Akansha", "Sam"];
let currentUser = users[0];

/**
 * Initialization Logic
 * Loads persisted data from LocalStorage and triggers initial render
 */
const savedPosts = localStorage.getItem("socialsphere_posts");
if (savedPosts) {
  posts = JSON.parse(savedPosts);
}
renderFeed();

let userSelect = document.querySelector("#userSelect");

/**
 * Event Listener: User Switching
 * Updates the global currentUser variable based on dropdown selection
 */
userSelect.addEventListener("change", function (e) {
  currentUser = e.target.value;
});

/**
 * Core Function: renderFeed
 * Clears the current feed and rebuilds the DOM for all posts.
 * Handles three layouts: No image, No caption, or Both.
 */
function renderFeed() {
  feed.innerHTML = "";

  posts.forEach(function (post, index) {
    let postDiv = document.createElement('div');
    postDiv.setAttribute('class', 'postDiv');

    // Layout Logic: Case 1 - Text Only Post
    if (!post.image) {
      postDiv.innerHTML = `
        <div class="user">${post.currentUser}</div> 
        <p>${post.caption}</p>
        <p class="likes ${post.likedBy.includes(currentUser) ? 'liked' : ''} " data-index="${index}">
          <i class="fa-solid fa-heart"></i> ${post.likedBy.length}
        </p>
        <p class="comments" data-index="${index}">
          <i class="fa-solid fa-comment"></i>
          ${post.commentCount}
        </p>
        <div class="commentArea" style="display: none;">
          <div class="view-comments"></div>
          <input class="commentInput" type="text" placeholder="Share your thoughts" />
          <button class="postCommentBtn">Post your comment</button>
        </div>
      `;
    } 
    // Layout Logic: Case 2 - Image Only Post
    else if (!post.caption) {
      postDiv.innerHTML = `
        <div class="user">${post.currentUser}</div>  
        <img src="${post.image}" />
        <p class="likes ${post.likedBy.includes(currentUser) ? 'liked' : ''} " data-index="${index}">  
          <i class="fa-solid fa-heart"></i> ${post.likedBy.length}
        </p>
        <p class="comments" data-index="${index}">
          <i class="fa-solid fa-comment"></i>
          ${post.commentCount}
        </p>
        <div class="commentArea" style="display: none;">
          <div class="view-comments"></div>
          <input class="commentInput" type="text" placeholder="Share your thoughts" />
          <button class="postCommentBtn">Post your comment</button>
        </div>
      `;
    } 
    // Layout Logic: Case 3 - Image and Caption Post
    else {
      postDiv.innerHTML = `
        <div class="user">${post.currentUser}</div> 
        <img src="${post.image}" />
        <p>${post.caption}</p>
        <p class="likes ${post.likedBy.includes(currentUser) ? 'liked' : ''} " data-index="${index}">
          <i class="fa-solid fa-heart"></i> ${post.likedBy.length}
        </p>
        <p class="comments" data-index="${index}">
          <i class="fa-solid fa-comment"></i>
          ${post.commentCount}
        </p>
        <div class="commentArea" style="display: none;">
          <div class="view-comments"></div>
          <input class="commentInput" type="text" placeholder="Share your thoughts" />
          <button class="postCommentBtn">Post your comment</button>
        </div>
      `;
    }

    /** * Comments Rendering 
     * Generates the HTML list for existing comments on this specific post
     */
    let viewComments = postDiv.querySelector(".view-comments");
    let commentHTML = "";
    for (let i = 0; i < post.comments.length; i++) {
      commentHTML += `
        <p>
          <em>${post.commentsBy[i]}</em>
          <br>
          ${post.comments[i]}
        </p>`;
    }

    viewComments.innerHTML = commentHTML;
    feed.appendChild(postDiv);
  });
}

/**
 * Event Listener: Create New Post
 * Captures input values, adds post to state, saves to storage, and refreshes feed
 */
postBtn.addEventListener('click', function () {
  let image = imageInput.value;
  let caption = captionInput.value;

  posts.unshift({
    image,
    caption,
    currentUser,
    likedBy: [],
    comments: [],
    commentsBy: [],
    commentCount: 0
  });

  localStorage.setItem("socialsphere_posts", JSON.stringify(posts));
  renderFeed();

  // Reset inputs
  captionInput.value = "";
  imageInput.value = "";
});

/**
 * Tab Navigation Logic
 * Toggles visibility between Home Feed and Create Post screens
 */
createPostIcon.addEventListener('click', function () {
  createPost.style.display = "flex";
  homePage.style.display = "none";
});

homePageIcon.addEventListener('click', function () {
  homePage.style.display = "block";
  createPost.style.display = "none";
});

/**
 * Event Delegation: Like Toggle
 * Checks if current user has liked a post and toggles their presence in likedBy array
 */
feed.addEventListener("click", function (e) {
  const likeEl = e.target.closest(".likes");
  if (!likeEl) return;

  const index = likeEl.dataset.index;
  const post = posts[index];

  if (post.likedBy.includes(currentUser)) {
    post.likedBy = post.likedBy.filter(user => user !== currentUser);
  } else {
    post.likedBy.push(currentUser);
  }

  localStorage.setItem("socialsphere_posts", JSON.stringify(posts));
  renderFeed();
});

/**
 * Event Delegation: Comment Visibility
 * Toggles the display of the comment input area and existing comments
 */
feed.addEventListener("click", function (e) {
  const commentIcon = e.target.closest(".comments");
  if (!commentIcon) return;

  const postDiv = commentIcon.closest(".postDiv");
  const commentArea = postDiv.querySelector(".commentArea");

  commentArea.style.display =
    commentArea.style.display === "none" ? "block" : "none";
});

/**
 * Event Delegation: Post New Comment
 * Handles adding a comment string to the specific post index and updating counts
 */
feed.addEventListener("click", function (e) {
  const btn = e.target.closest(".postCommentBtn");
  if (!btn) return;

  const postDiv = btn.closest(".postDiv");
  const input = postDiv.querySelector(".commentInput");
  const index = postDiv.querySelector(".comments").dataset.index;

  const text = input.value.trim();
  if (!text) return;

  posts[index].comments.push(text);
  posts[index].commentsBy.push(currentUser);
  posts[index].commentCount++;

  localStorage.setItem("socialsphere_posts", JSON.stringify(posts));
  renderFeed();
});