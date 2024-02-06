import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <SnackbarProvider
        iconVariant={{
          success: "✅",
          error: "✖️",
          warning: "⚠️",
          info: "ℹ️",
        }}
      >
        <Header />
        <Outlet />
        <Footer />
      </SnackbarProvider>
    </div>
  );
}

export default App;
