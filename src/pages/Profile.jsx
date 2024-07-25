import { Button } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import Dashboard from "./../components/Dashboard";

const Profile = () => {
  const { username2, password2, logout } = useAuth();
  return (
    <div style={{ display: "flex" }} className="container">
      <Dashboard />
      <div
        style={{
          left: "300px",
          position: "absolute",
          paddingTop: "100px",
          display: "flex",
          flexDirection: "column",
          fontSize: "22px",
          gap: "15px",
        }}>
        <h1>Username: {username2?.username || "N/A"}</h1>
        <h1>Password: {password2?.password || "N/A"}</h1>
        <Button
          variant="contained"
          color="error"
          onClick={logout}
          size="large"
          sx={{ maxWidth: "150px" }}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
