import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <h2>Welcome to our Application</h2>
      <p>
        Please <Link to='/login'>Login</Link> to continue
      </p>
    </div>
  );
};
