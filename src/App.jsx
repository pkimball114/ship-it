import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <div>
      <nav style={{ borderBottom: "1px solid #eee", padding: 12 }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", gap: 12 }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
