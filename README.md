<h1 align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com/?lines=AI+Generated+Mail+Sender!&center=true&size=30">
  </a>
</h1>

A full-stack web app that generates professional emails using Google's Gemini 1.5 API and sends them via Gmail. Built with HTML, CSS, JavaScript, Node.js, and Express.

---

## ⚙️ Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- AI: Gemini 1.5 Flash (`@google/generative-ai`)
- Email: Nodemailer + Gmail

---

### Structure
- Create the /client folder
-                         - index.html
                          - script.js
                          - style.css
- Create the /server folder
-                         - .env
                          - index.js
                          - package.json
---
## 🚀 Setup

### 1. Clone & Install
```bash
git clone https://github.com/your-username/email-ai-sender.git
cd email-ai-sender/server
npm install
```
### 2. Add these in /server/.env
```bash
API_KEY=your_gemini_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```
### 3. Start Server
```bash
npm start
App runs at: http://localhost:5000
```
---
<img width="400" height="600" alt="image" src="https://github.com/user-attachments/assets/0af4b0fe-301b-417c-b90e-e6d1ddac4f3b" />

---
## 🙌 Acknowledgements

This project was built to explore practical applications of generative AI in real-world workflows.  
Special thanks to the open-source community, Google AI Studio for providing Gemini APIs, and the maintainers of Node.js, Express, and Nodemailer.
