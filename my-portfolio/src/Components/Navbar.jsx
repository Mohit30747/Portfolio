import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition-all duration-300 ${
      isActive
        ? "text-blue-400 bg-gray-500"
        : "hover:text-blue-400 hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-700/50 hover:scale-110 hover:underline hover:underline-offset-28 hover:animate"
    }`;

  return (
    <>
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-md text-white px-6 py-0 shadow-lg">
      
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="animate___animated animate-bounce animate_infinite  text-2xl font-bold tracking-wide cursor-progress hover:bg-blue-900 p-3 rounded-lg  shadow-lg transition">
          My Portfolio
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex font-bold text-lg gap-6 p-5 items-center">
          <NavLink className={linkClass} to="/">Home</NavLink>
          <NavLink className={linkClass} to="/about">About</NavLink>
          <NavLink className={linkClass} to="/project">Project</NavLink>
          <NavLink className={linkClass} to="/skills">Skills</NavLink>
          <NavLink className={linkClass} to="/contact">Contact</NavLink>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden flex flex-col items-center  gap-4 mt-4 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0  "
        }`}
      >
        <NavLink   onClick={() => setIsOpen(false)} className={linkClass }  to="/">Home</NavLink>
        <NavLink onClick={() => setIsOpen(false)} className={linkClass} to="/about">About</NavLink>
        <NavLink onClick={() => setIsOpen(false)} className={linkClass} to="/project">Project</NavLink>
        <NavLink onClick={() => setIsOpen(false)} className={linkClass} to="/skills">Skills</NavLink>
        <NavLink onClick={() => setIsOpen(false)} className={linkClass} to="/contact">Contact</NavLink>
      </div>
    </nav>
    </>
  );
}