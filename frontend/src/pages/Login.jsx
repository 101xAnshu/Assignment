import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import Container from "../components/ui/Container";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (location.state?.registrationSuccess) {
      console.log("Registration successful! Please login.");
    }
  }, [location.state]);

  const handleSubmit = async (values) => {
    try {
      await login(values.email, values.password);
      navigate("/dashboard");
    } catch (err) {
      return err;
    }
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto my-12 p-8 bg-white rounded-lg shadow-sm border border-gray-100"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login to Your Account
        </h1>
        {location.state?.registrationSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Registration successful! Please login.
          </div>
        )}
        <AuthForm type="login" onSubmit={handleSubmit} buttonText="Login" />
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </Container>
  );
};

export default Login;
