import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout";
import Footer from "./Pages/Footer";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Project from "./Pages/Project";
import Skills from "./Pages/Skills";
import Contact from "./Pages/Contact";
import Messages from "./Pages/Messages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="project" element={<Project />} />
          <Route path="skills" element={<Skills />} />
          <Route path="contact" element={<Contact />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}