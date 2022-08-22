import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import AddCards from "./pages/AddCards";
import BulkAddCards from "./pages/BulkAddCards";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Browse } from "./pages/Browse";
import { AddLanding } from "./pages/AddLanding";
import { Study } from "./pages/Study";
import { LoginLanding } from "./pages/LoginLanding";
import { About } from "./pages/About";
import { NewUser } from "./pages/NewUser";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginLanding />} />
            <Route path="/register" element={<Register />} />

            <Route path="/study" element={<Study />} />

            <Route path="/add" element={<AddCards />} />
            <Route path="/bulk" element={<BulkAddCards />} />

            <Route path="/browse" element={<Browse />} />
            <Route path="/addLanding" element={<AddLanding />} />
            <Route path="/about" element={<About />} />

            <Route path="/newuser" element={<NewUser />} />


          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
