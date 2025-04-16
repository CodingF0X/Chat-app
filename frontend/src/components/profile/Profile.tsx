import React, { useState } from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Input,
  IconButton,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useGetMe } from "../../hooks/useGetMe";
import { API_URL } from "../../constants/urls";

const Profile: React.FC = () => {
  const { data } = useGetMe();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`${API_URL}/users/image`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error("Failed to upload image");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile data:", formData);
    // Add your submission logic here
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* Profile Picture Section */}
        <Box sx={{ position: "relative", mb: 3 }}>
          <Avatar
            src={profileImagePreview || undefined}
            sx={{
              width: 120,
              height: 120,
              border: "2px solid",
              borderColor: "primary.main",
            }}
          />
          <Input
            id="profile-image-upload"
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={handleImageUpload}
            sx={{ display: "none" }}
          />
          <label htmlFor="profile-image-upload">
            <IconButton
              component="span"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              <CameraAltIcon sx={{ color: "common.white" }} />
            </IconButton>
          </label>
        </Box>

        <Typography variant="h5" component="h1" gutterBottom>
          Profile Settings
        </Typography>

        {/* Form Fields */}
        <TextField
          name="username"
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleInputChange}
          required
        />

        <TextField
          name="email"
          label={data?.GET_ME.email}
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <TextField
          name="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ mt: 3, px: 4, alignSelf: "stretch" }}
        >
          Update Profile
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;
