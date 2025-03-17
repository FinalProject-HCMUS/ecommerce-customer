import { Outlet } from 'react-router-dom'; // Importing the Outlet component from react-router-dom
import { ToastContainer } from 'react-toastify'; // Importing the ToastContainer component from react-toastify
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/layout/footer';
import Navbar from '../components/layout/Navbar';

/**
 * MainLayout component that serves as the main layout for the application.
 * It includes the Navbar, an Outlet for nested routes, a ToastContainer for notifications, and a Footer.
 */
const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar /> {/* Render the Navbar component */}
      <Outlet /> {/* Render the nested routes */}
      <ToastContainer /> {/* Render the ToastContainer for notifications */}
      <Footer /> {/* Render the Footer component */}
    </div>
  );
};

export default MainLayout; // Export the MainLayout component as the default export.
