# 🌍 Trivana — Travel Planner Web App  

A beginner-friendly **travel planning web application** built with **React + Vite**.  
Trivana helps users **explore destinations, check weather, search hotels, create itineraries, and manage planned trips** — all with a clean UI powered by **Tailwind CSS**.  

---

## ✨ Features  

- 🏠 **Home Page** — App introduction & navigation.  
- 🔐 **Authentication** — Sign Up & Login using **Firebase Auth**.  
- 📊 **Dashboard** — Personalized home after login.  
- 🗺 **Destinations** — Browse and filter destinations.  
- 🏨 **Hotels Search** — Find hotels for chosen destinations.  
- 📅 **My Itineraries** — View, edit, share, and delete saved trips.  
- ✈️ **Travel Planner** — Plan and save new trips.  
- 🚫 **404 Not Found Page** — Friendly error screen for invalid routes.  

---

## 🛠 Tech Stack  

| Technology            | Purpose |
|-----------------------|---------|
| **React (Vite)**      | Fast, component-based UI |
| **React Router DOM**  | Client-side routing & navigation |
| **Tailwind CSS**      | Utility-first styling |
| **Lucide React**      | Icon library |
| **Firebase Auth**     | User authentication (Login/Signup) |
| **Firebase Firestore**| Store user trips & itineraries |
| **JavaScript (ES6)**  | Beginner-friendly implementation (no TS) |

---

## 🌐 APIs Used  

- 🌍 **GeoDB Cities API** ([Amadeus](https://developers.amadeus.com/))  
  *Search and retrieve city/destination details.*  

- 🌦 **OpenWeather API** ([OpenWeather](https://openweathermap.org/))  
  *Get real-time weather forecasts for destinations.*  

---

## 📂 Project Structure  

src/
┣ components/
┃ ┣ Navbar.jsx
┃ ┣ Footer.jsx
┃ ┣ DestinationCard.jsx
┃ ┗ ProtectedRoute.jsx
┣ pages/
┃ ┣ Home.jsx
┃ ┣ Login.jsx
┃ ┣ Signup.jsx
┃ ┣ Dashboard.jsx
┃ ┣ Destinations.jsx
┃ ┣ Planner.jsx
┃ ┣ MyItineraries.jsx
┃ ┗ NotFound.jsx
┣ App.jsx
┗ main.jsx



---

## 🚀 Getting Started  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/Pokah1/travel-planner.git
cd travel-planner

npm install

###env
Create a .env file in the root directory and add:

VITE_GEODB_API_KEY=your_geodb_api_key
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id


VITE_GEODB_API_KEY=your_geodb_api_key
VITE_TRIPADVISOR_API_KEY=your_tripadvisor_api_key


📖 Example User Flow

User opens the app → lands on Home Page.

Signs up or logs in with Firebase Auth.

Navigates to Dashboard → explores options.

Uses Planner → creates a trip.

Saves the trip → appears in My Itineraries (stored in Firestore).

If user types a wrong URL → redirected to 404 Page.

🎯 Learning Outcomes

🔀 Using React Router for navigation.

🔐 Implementing Firebase Authentication.

☁️ Storing user data in Firestore.

🎨 Styling with Tailwind CSS.

♻️ Building reusable UI components.

🛡 Protecting routes with authentication.

⚡ Handling 404 routes gracefully.

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Pokah Odokwo
🚀 Beginner React developer passionate about building full-stack apps.

