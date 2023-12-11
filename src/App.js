import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExternalBookResults from "./pages/ExternalBookResults";
import ExternalBookDetails from "./pages/ExternalBookDetails";

import "./stylesheets/alignments.css";
import "./stylesheets/theme.css";
import "./stylesheets/sizes.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/form-elements.css";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedHomeRoute from "./components/ProtectedHomeRoute";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import BookDescription from "./pages/BookDescription";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Loader />}

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedHomeRoute>
                <Home />
              </ProtectedHomeRoute>
            }
          />
          <Route
            path="/book/:id"
            element={
              <ProtectedHomeRoute>
                <BookDescription />
              </ProtectedHomeRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/external-results" element={<ExternalBookResults />} />
          <Route path="/book-detail/:bookId" element={<ExternalBookDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
