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
import { Footer } from "./components/Footer";
import { StudyLanding } from "./pages/StudyLanding";
import { ChangePassword } from "./pages/ChangePassword";

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Router>
        <div className="container" style={{ flex: 1 }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginLanding />} />
            <Route path="/register" element={<Register />} />

            <Route exact path="/study" element={<Study />} />
            <Route path="/studyForgotten" element={<Study forgottenOnly />} />
            <Route path="/studyLevel/:level" element={<Study level />} />


            <Route path="/add" element={<AddCards />} />
            <Route path="/bulk" element={<BulkAddCards />} />

            <Route path="/browse" element={<Browse />} />
            <Route path="/addLanding" element={<AddLanding />} />
            <Route path="/about" element={<About />} />

            <Route path="/newuser" element={<NewUser />} />

            <Route path="/studylanding" element={<StudyLanding />} />

            <Route path="/changepassword" element={<ChangePassword />} />
          </Routes>
        </div>
      </Router>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
