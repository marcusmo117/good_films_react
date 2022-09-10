import { Container } from "react-bootstrap";

const ErrorPage = ({ message }) => {
  return (
    <div className="error">
      <Container>
        <h1>{message}</h1>
      </Container>
    </div>
  );
};

export default ErrorPage;
