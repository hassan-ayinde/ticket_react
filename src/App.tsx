import "./App.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Features from "./components/Features";
import Video from "./components/Video";
import EmailUpdate from "./components/EmailUpdate";
// import Footer from "./components/Footer";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import TicketPortal from "./components/ticketPortal";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      {/* <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Header />
                <Features />
                <Video />
                <EmailUpdate />
                <Footer />
              </Layout>
            }
          />
        </Routes>
      </Layout> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <>
                <Header />
                <Features />
                <Video />
                <EmailUpdate />
              </>
            }
          />
          <Route path="login" element={<Login />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="ticketportal" element={<TicketPortal />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
