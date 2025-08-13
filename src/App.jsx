import { Route, Routes } from "react-router-dom";
import Navigation from "./components/NavBar";
import HomePage from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
