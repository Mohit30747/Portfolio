import Navbar from "./Navbar";
import Footer from "../Pages/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      
      <Navbar />

      <div className="grow p-6 pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />

    </div>
  );
}