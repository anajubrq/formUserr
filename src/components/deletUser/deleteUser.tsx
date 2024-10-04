
"use client"
import React from "react";


interface IModalDelete {
  isOpenDelete: boolean;
  setOpenDelete: (isOpenDelete: boolean) => void;
  deletePost: () => void;
}

export function ModalDelete({ isOpenDelete, setOpenDelete, deletePost }: IModalDelete) {
  if (isOpenDelete) {
    return (
      <section className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded-[13px] shadow-lg flex flex-col justify-center items-center gap-[15px] h-[270px]">
        <img src="/images/delete.png" className="w-[25px]" alt="Delete" />
          <h1>Are you sure you want to delete this Post?</h1>
          <div className="flex justify-end mt-4 flex-col gap-[4px]">
            <button
              onClick={() => setOpenDelete(!isOpenDelete)}
              className=" bg-gray-300  rounded w-[100px] p-[4px]"
            >
            Cancel
            </button>
            <button
              onClick={() => {
                deletePost(); 
                setOpenDelete(false); 
              }}
              className="bg-red-500 text-white w-[100px] p-[4px] rounded"
            >
            Delete
            </button>
          </div>
        </div>
      </section>
    );
  } else {
    return null;
  }
}
