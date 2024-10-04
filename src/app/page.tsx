"use client"
import { UserRegister } from "@/components/formUser/formUser";
import Header from "@/components/header/header";
import { ListUser } from "@/components/listUser/listUser";
import React from "react";




export default function Home() {
  const [users, setUsers] = React.useState<UserRegister[]>([]); 

  return (
    <div>
      <Header />
      <div>
   
      <ListUser 
      
      setUsers={setUsers}
      user={users}
      />
      </div>
    </div>
  );
}
