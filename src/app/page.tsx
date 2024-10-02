"use client"


import Header from "@/header/header";
import { TableDemo, User } from "@/listUser/listUser";
import { useState } from "react";






export default function Home() {
const [clientes,setClientes]=useState<User[]>([]);
  return (
    <div>
    <div>
  <Header />
    </div>
    <div>
      <TableDemo
      setClientes={setClientes}
      user={clientes}
  
   
      />
    </div>
    </div>
  );
}
