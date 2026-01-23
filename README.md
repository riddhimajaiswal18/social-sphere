🌐 SocialSphere

📌 Project Title & Description

SocialSphere is a front-end social media feed application built using HTML, CSS, and Vanilla JavaScript.
It allows users to create posts using images, captions, both, or neither, interact through likes and comments, and switch between multiple users — all while storing data locally in the browser.
The project focuses on mastering DOM manipulation, event handling, conditional rendering, and state management without using any backend or frameworks.


Problem Statement chosen is the interactive web app 

✨ Features Implemented
🧑‍💻 User Management
Switch between multiple users (Kiara, Akansha, Sam)
Likes and comments are tracked per user
📝 Post Creation Options
Users can create:
📷 Image-only posts
✍️ Caption-only posts
🖼️ Image + caption posts
⭕ Empty posts (no image, no caption)
❤️ Engagement Features
Like and unlike posts
Comment on posts
View all comments per post
Like count updates dynamically
💾 Persistent Storage
Uses LocalStorage to persist:
Posts
Likes
Comments
Data remains after page refresh
📱 UI & UX
Responsive grid-based feed
Smooth hover animations
Mobile-friendly layout

🖼️ Image Upload Rules (IMPORTANT)
⚠️ Only valid image URLs are allowed
The image URL must follow ALL the rules below:
Must open as ONLY an image
Must not require login, cookies, or permissions
If a website layout appears → the URL is invalid

🧠 DOM Concepts Used
document.querySelector()
document.createElement()
innerHTML for dynamic rendering
Event listeners (click, change)
Event delegation for likes and comments
Conditional rendering based on data state
DOM traversal (closest, querySelector)
Dynamic class manipulation
Toggling element visibility (style.display)

▶️ Steps to Run the Project
Clone or download the repository
Open the project folder
Double-click index.html
The app runs directly in the browser
(No backend or server required)

⚠️ Known Limitations
No image URL validation (assumes user enters a valid URL)
No authentication or real user accounts
Data stored only in LocalStorage (browser-specific)
No post editing or deletion feature
Empty posts are allowed intentionally

🛠️ Tech Stack
HTML5
CSS3
JavaScript (ES6)
Font Awesome
LocalStorage API
 
