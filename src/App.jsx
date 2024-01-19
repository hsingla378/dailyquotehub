import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
