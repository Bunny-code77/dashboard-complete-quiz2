import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const links = [
  
  { to: "/dashboard", label: "Dashboard" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left side - Logo + Links */}
          <div className="flex items-center gap-8">
            
            {/* Logo */}
            <div
              className="text-3xl italic text-purple-700 font-bold tracking-tight select-none"
              style={{ fontFamily: "Libre Baskerville" }}
            >
              PostPlanner
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    "text-sm font-medium transition-colors duration-200 " +
                    (isActive
                      ? "text-purple-700 underline underline-offset-4"
                      : "text-gray-700 hover:text-purple-600")
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right side - Auth Buttons / Logout */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="hidden sm:inline-block px-4 py-2.5 text-sm font-semibold bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="hidden sm:inline-block px-4 py-2.5 text-sm font-semibold bg-gray-100 text-purple-700 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-200"
                >
                  Register
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="hidden sm:inline-block px-5 py-2.5 text-sm font-semibold bg-purple-700 text-white rounded-lg shadow-md hover:bg-purple-800 transition-all duration-200"
              >
                Logout
              </button>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <details className="relative">
                <summary className="cursor-pointer px-3 py-2 text-lg rounded-md bg-gray-100 hover:bg-gray-200 transition-all duration-200">
                  ☰
                </summary>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  {links.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {l.label}
                    </NavLink>
                  ))}
                  {!isLoggedIn ? (
                    <>
                      <button
                        onClick={() => navigate("/login")}
                        className="block w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-gray-50"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => navigate("/register")}
                        className="block w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-gray-50"
                      >
                        Register
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
