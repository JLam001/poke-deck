export const Profile = ({ user }) => {
  return (
    <div>
      <h2>User Profile</h2>
      <p>User Name: {user.user_name}</p>
      <p>User ID: {user.user_id}</p>
      <p>Email: {user.email}</p>
      {/* In a real-world scenario, you wouldn't display the password and refreshToken */}
      <p>Password: {user.password}</p>
      <p>Refresh Token: {user.refreshToken}</p>
    </div>
  );
};
