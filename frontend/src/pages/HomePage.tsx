import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  return (
    <div>
      <h2>Welcome to our Application</h2>
      <br/>
      <p>
        Please <Link to='/login'>Login</Link> to continue
      </p>
      <br/>
      <p>
        Sign up <Link to='/register'>here</Link> to register
      </p>
    </div>
  );
};
