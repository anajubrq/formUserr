import { useState } from "react"
import FormUser from "@/components/formUser/formUser"
import { Button } from "@/components/ui/button";

export default function Header() {
    const [openModal, setOpenModal] = useState(false);

    return (
        
     <section className=" bg-slate-400" >
      <div className="flex justify-between items-center w-full">
        <h1 className="text-[22px] text-[weight] ml-4 p-2">Users</h1>
        <Button className="text-[18px] text-[weight] m-5 p-3 bg-blue-700 text-white mr-5 pr-5" onClick={() => setOpenModal(true)}>
          +Add User
        </Button>
      </div>
      <FormUser isOpen={openModal} 
      setModalOpen={setOpenModal} 
    
      
       />
    </section>
       
    )
}