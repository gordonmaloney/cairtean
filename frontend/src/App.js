import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import AddCards from "./pages/AddCards";
import BulkAddCards from "./pages/BulkAddCards";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Review from "./pages/Review";
import { Review2 } from "./pages/Review2";
import { Review3 } from "./pages/Review3";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/study" element={<Review3 />} />

            <Route path="/add" element={<AddCards />} />
            <Route path="/bulk" element={<BulkAddCards />} />

          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
