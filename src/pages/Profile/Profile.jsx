import './Profile.scss'
import React, { useEffect, useState } from "react";
import api from "../../api";
const Profile = () => {
    const [user, setUser] = useState(null);
      useEffect(() => {
        const fetchProfile = async () => {
          try {
            const response = await api.get(
              "http://localhost:8080/users/details"
            );
            setUser(response.data);
          } catch (error) {
            // Handle error or redirect to login
          }
        };

        fetchProfile();
      }, []);

      if (!user) {
        return <div>Loading...</div>;
      }
  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <p>Role : {user.role }</p>
      {/* Render other user details */}
    </div>
  );
}

export default Profile