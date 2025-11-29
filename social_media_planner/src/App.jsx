import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Register from "./pages/register";
import Login from "./pages/login";
import Footer from "./components/Footer"; 

function App() {
  const location = useLocation();

  
  const hideFooter =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <h2 className="text-center mt-10 text-red-600">
              404 - Page Not Found
            </h2>
          }
        />
      </Routes>

      {/* ✅ Global Footer (hidden on login/register) */}
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
