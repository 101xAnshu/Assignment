import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";

const NotFound = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
