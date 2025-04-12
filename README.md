# StenoSafe

StenoSafe is a web application designed for secure **image-based steganography**, allowing users to **hide and retrieve text files within images** using encryption. The application ensures data confidentiality and access control through user authentication and encryption mechanisms.

## 🚀 Features
- **User Authentication**: Secure login via **email/password** using NextAuth.
- **Encryption & Decryption**:
  - Upload an image (converted to PNG for compatibility).
  - Enter a text message containing sensitive information.
  - Optionally set a **secret key** for additional security.
  - Store the encrypted image in the **user's gallery**.
  - Retrieve and decrypt hidden text from an uploaded image.
- **User Profile**:
  - Access previously encrypted images.
  - Delete or download stored encrypted images.
- **Security Enhancements**:
  - MongoDB database to securely store user data and images.
- **Modern UI/UX**:
  - Responsive and user-friendly design.
  
## 🛠️ Tech Stack
- **Frontend**: [Next.js](https://nextjs.org/), Tailwind CSS
- **Backend**: Node.js
- **Database**: MongoDB Atlas
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## 📂 Project Structure
```
StenoSafe/
├── src/
│   ├── app/
│   │   ├── (auth)/        # Authentication pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   ├── about/
│   │   ├── api/           # Backend API routes
│   │   ├── contact/
│   │   ├── decryption/
│   │   ├── encryption/
│   │   ├── gallery/
│   │   ├── layout.jsx
│   │   ├── page.jsx
│   ├── assets/
│   ├── components/        # Reusable UI components
│   ├── lib/               # API handlers & services
│   ├── utils/             # Utility functions for encryption & decryption
│   ├── middleware.js      # Middleware handling
```

## ⚙️ Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/StenoSafe.git
   cd StenoSafe
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```env
   NEXTAUTH_URL=your_deployed_url
   NEXTAUTH_SECRET=your_secret_key
   MONGODB_URI=your_mongodb_connection_string
   
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open **http://localhost:3000** in your browser.

## 🔐 Encryption & Decryption Process
1. **Encryption**
   - Upload an image and a text file.
   - Enter an optional secret key.
   - Click **Encrypt**, and the encoded image is stored in the database.
2. **Decryption**
   - Upload the encrypted image.
   - Enter the secret key (if set).
   - Retrieve the hidden text securely.

## 📌 Future Enhancements
- Implement **AES-based encryption** for added security.
- **Progressive Web App (PWA)** support.
- Advanced sharing options with **access control permissions**.

## 🤝 Contribution Guidelines
- Fork the repository.
- Create a new feature branch (`git checkout -b feature-name`).
- Commit changes (`git commit -m "Added new feature"`).
- Push to the branch (`git push origin feature-name`).
- Open a **Pull Request**.

## 📜 License
This project is licensed under the **MIT License**.

## 👨‍💻 Author
Developed by **Vishal Mishra**

---
🌟 **Feel free to contribute, report issues, and improve StenoSafe!**


