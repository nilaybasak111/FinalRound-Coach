import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./Pages/LandingPage";
import Dashboard from "./Pages/Home/Dashboard";
import InterviewPrep from "./Pages/InterviewPrep/InterviewPrep";
import UserProvider from "./Context/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <div>
          <Router>
            <Routes>
              {/* Default Route */}
              <Route path="/" element={<LandingPage />} />

              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/interview-prep/:sessionId"
                element={<InterviewPrep />}
              />
            </Routes>
          </Router>

          <Toaster
            toastOptions={{
              className: "",
              style: {
                fontSize: "13px",
              },
            }}
          />
        </div>
      </UserProvider>
    </>
  );
}

export default App;
