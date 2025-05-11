import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/api";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const data = await fetchWithAuth("/users/profile");
      if (data) {
        setUser(data);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.fullName}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default ProfilePage;
