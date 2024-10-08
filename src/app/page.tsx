"use client"

import Header from "@/components/header/header";
import { ListUser, User } from "@/components/listUser/listUser";
import React from "react";




export default function Home() {
  const [users, setUsers] = React.useState<User[]>([]); 

  return (
    <div>
      <Header />
      <div>
   
      <ListUser 
      user={users}
      setUsers={setUsers}
      />
    </div>
  );
}