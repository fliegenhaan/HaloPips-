import React from "react";

const Profile = ({ params }: { params: { id: string } }) => {
  return <div>Profile {params.id}</div>;
};

export default Profile;
