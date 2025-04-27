import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
        >
          Track Your Expenses
        </motion.h1>
        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl"
        >
          A simple and intuitive way to manage your personal finances and gain
          insights into your spending habits.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
        >
          <Button size="lg" onClick={handleGetStarted}>
            Get Started
          </Button>
          {!user && (
            <Link to="/login">
              <Button variant="outline" size="lg">
                Login
              </Button>
            </Link>
          )}
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Home;
