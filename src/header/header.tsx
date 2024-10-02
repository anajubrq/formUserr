import { useState } from "react"
import FormUser from "@/formUser/formUser"
import { Button } from "@/components/ui/button";

export default function Header() {
    const [openModal, setOpenModal] = useState(false);

    return (
        
     <section className=" h-[40px] lg:bg-slate-500" >
      <div className="flex justify-between items-center w-full">
        <h1 className="text-[22px] text-[weight] ml-4 p-2">Posts</h1>
        <Button className="text-[18px] text-[weight] m-5 p-3 bg-blue-700 text-white" onClick={() => setOpenModal(true)}>
          +Add Post
        </Button>
      </div>
      <FormUser isOpen={openModal} 
      setModalOpen={setOpenModal} 
    
      
       />
    </section>
       
    )
}