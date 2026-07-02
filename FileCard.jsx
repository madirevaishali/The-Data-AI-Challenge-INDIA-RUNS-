import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUpload,
  FaChartBar,
  FaUsers,
  FaBalanceScale,
} from "react-icons/fa";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 bg-white shadow-md p-5">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">
        RecruitAI
      </h2>

      <nav className="space-y-2">
        <NavLink to="/" className={linkClass}>
          <FaHome />
          Home
        </NavLink>

        <NavLink to="/upload" className={linkClass}>
          <FaUpload />
          Upload
        </NavLink>

        <NavLink to="/dashboard" className={linkClass}>
          <FaChartBar />
          Dashboard
        </NavLink>

        <NavLink to="/ranking" className={linkClass}>
          <FaUsers />
          Ranking
        </NavLink>

        <NavLink to="/compare" className={linkClass}>
          <FaBalanceScale />
          Compare
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;