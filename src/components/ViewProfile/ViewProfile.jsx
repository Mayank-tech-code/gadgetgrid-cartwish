import { Card, CardContent, Typography, Avatar, Divider } from "@mui/material";

const ViewProfile = ({ user }) => {
  if (!user)
    return <Typography variant="h6">User data not available</Typography>;

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <Card
      sx={{ maxWidth: 400, margin: "auto", padding: 2, textAlign: "center" }}
    >
      <Avatar
        src={
          user.profilePic === "default.jpg"
            ? "/default-profile.png"
            : user.profilePic
        }
        alt={user.name}
        sx={{ width: 80, height: 80, margin: "auto", mb: 2 }}
      />
      <CardContent>
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {user.email}
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Typography variant="body1">
          <b>User ID:</b> {user._id}
        </Typography>
        <Typography variant="body1">
          <b>Admin:</b> {user.isAdmin ? "Yes" : "No"}
        </Typography>
        <Typography variant="body1">
          <b>Issued At:</b> {formatDate(user.iat)}
        </Typography>
        <Typography variant="body1">
          <b>Expires At:</b> {formatDate(user.exp)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ViewProfile;
