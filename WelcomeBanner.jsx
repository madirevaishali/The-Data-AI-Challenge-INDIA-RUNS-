import { NavLink } from "react-router-dom";
import { FiCpu } from "react-icons/fi";
import {
  FiBell,
  FiHome,
  FiUpload,
  FiGrid,
  FiUsers,
  FiBarChart2,
} from "react-icons/fi";

const navItems = [
  { path: "/", label: "Home", icon: <FiHome /> },
  { path: "/dashboard", label: "Dashboard", icon: <FiGrid /> },
  { path: "/upload", label: "Upload", icon: <FiUpload /> },
  { path: "/ranking", label: "Ranking", icon: <FiUsers /> },
  { path: "/compare", label: "Compare", icon: "⚖️" },
  { path: "/analytics", label: "Analytics", icon: <FiBarChart2 /> },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">

      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between w-full">

        {/* Logo */}

        <div className="flex items-center gap-4">
  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
    <FiCpu className="text-white text-2xl" />
  </div>

  <div>
    <h1 className="text-2xl font-bold text-slate-800">
      AI Recruiter
    </h1>

    <p className="text-sm text-slate-500">
      Intelligent Hiring Platform
    </p>
  </div>
</div>

        {/* Navigation */}

        <nav className="hidden lg:flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-2xl p-2">

          {navItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-white hover:text-blue-600"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>

          ))}

        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-6">


          {/* Profile */}

         <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-2 shadow-sm">

  <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
    R
  </div>

  <div className="hidden md:block">
    <p className="font-semibold text-slate-800">
      Recruiter
    </p>

    <p className="text-xs text-slate-500">
      Administrator
    </p>
  </div>

</div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;