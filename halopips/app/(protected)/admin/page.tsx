import React from "react";
import Link from "next/link";

const Admin = () => {
  return (
    <div>
      <Link href="/admin/user">User</Link>
      <br />
      <Link href="/admin/verification">Verfication</Link>
      <br />
      <Link href="/admin/news">News</Link>
      <br />
    </div>
  );
};

export default Admin;
