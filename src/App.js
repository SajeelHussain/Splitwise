import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { ExpenseProvider } from "./context/ExpenseContext";
import Navbar from "./components/Navbar";
import Notisfication from "./components/Notisfication";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Reports from "./pages/Report";
import "./styles/App.css";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const [showNotisfication, setShowNotisfication] = useState(!user);

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setShowNotisfication(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container mt-5">
        {showNotisfication && (
          <Notisfication message="You must be logged in to acess this page."></Notisfication>
        )}
        {!showNotisfication && <Navigate to="/" />}
      </div>
    );
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-expense"
              element={
                <ProtectedRoute>
                  <AddExpense />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;
