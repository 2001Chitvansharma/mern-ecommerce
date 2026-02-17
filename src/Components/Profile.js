import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/protected/profile")
      .then((res) => setUser(res.data))
      .catch(() => alert("Unauthorized"));
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {user ? <pre>{JSON.stringify(user, null, 2)}</pre> : "Loading..."}
    </div>
  );
};

export default Profile;
