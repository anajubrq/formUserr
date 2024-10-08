"use client"
import React, { useState } from "react";
import FormUser, { UserRegister } from "@/components/formUser/formUser";
import Header from "@/components/header/header";
import { ListUser } from "@/components/listUser/listUser";


export default function Home() {
  const [users, setUsers] = useState<UserRegister[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const addUser = (newUser: UserRegister) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const deletePost = (id: string) => {
    console.log("Usuário deletado com ID:", id);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  

  return (
    <div>
      <Header setOpenModal={handleOpenModal} />
      <ListUser user={users} 
       deletePost={deletePost}
       
       />
      <FormUser
        isOpen={openModal}
        setModalOpen={setOpenModal}
        onAddUser={addUser}
      />
    </div>
  );
}