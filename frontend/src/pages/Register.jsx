import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import Container from "../components/ui/Container";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Register = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (values) => {
    try {
      await register(values.name, values.email, values.password);
      navigate("/login", { state: { registrationSuccess: true } });
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
          Create an Account
        </h1>
        <AuthForm
          type="register"
          onSubmit={handleSubmit}
          buttonText="Register"
        />
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </Container>
  );
};

export default Register;
