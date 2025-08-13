# 🌍 Travel Planner Web App

A beginner-friendly travel planning web application built with **React** and **Vite**.  
It allows users to explore destinations, create itineraries, and manage planned trips — all styled with **Tailwind CSS**.

---

## 📌 Features

- 🏠 **Home Page** — Introduction & navigation.
- 🗺 **Destinations Page** — Show and filter destinations.
- 📅 **My Itineraries** — View, edit, share, and delete saved trips.
- ✈️ **Travel Planner** — Plan new trips.
- 🚫 **404 Not Found Page** — Friendly error screen for wrong routes.

---

## 🛠 Tech Stack

| Technology        | Purpose |
|-------------------|---------|
| **React**         | Component-based UI |
| **Vite**          | Fast development build tool |
| **React Router DOM** | Navigation & routing |
| **Tailwind CSS**  | Utility-first styling |
| **Lucide React**  | Icon library |
| **JavaScript**    | Simpler code for learning (No TypeScript) |

---
## Authentication and Database
### Firebase Auth and Firestore

## 🌐 APIs Used

### **1. GeoDB Cities API** https://developers.amadeus.com/
- **Purpose:** Search and get destination city details.

---

## 📂 Project Structure

src/
components/
Navbar.jsx
Footer.jsx
TripCard.jsx
pages/
Home.jsx
Destinations.jsx
Planner.jsx
MyItineraries.jsx
NotFound.jsx
App.jsx
main.jsx


---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Pokah1/travel-planner.git
cd travel-planner

###npm install


###env
VITE_GEODB_API_KEY=your_geodb_api_key
VITE_TRIPADVISOR_API_KEY=your_tripadvisor_api_key

npm run dev


📖 Example User Flow
User opens the app → sees Home Page.

Navigates to Destinations to explore options.

Creates a trip in Planner.

Saves the trip → it appears in My Itineraries.

If user types a wrong URL → sees 404 Page.


🎯 Learning Outcomes
Using React Router for navigation.

Passing props and managing component data.

Styling with Tailwind CSS.

Building reusable UI components.

Handling 404 routes in React.



📜 License
This project is licensed under the MIT License.

💡 Author
Pokah Odokwo