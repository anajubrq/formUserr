"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { ModalDelete } from "../deletUser/deleteUser";
import { UserRegister } from "../formUser/formUser";
import EditUser from "../editUser/editUser";

export interface User {
    id?: string;
    name: string;
    cpf: string;
    cep: string;
    neighborhood: string;
    city: string;
    street: string;
    dateBirth: string;
}

export interface ListTabelaProps {
    user: User[];
    deletePost: (id: string) => void;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    
}

export function ListUser({ user, deletePost, setUsers }: ListTabelaProps) {
    const [openDelete, setOpenDelete] = useState<string | null>(null);
    const [postEdit, setPostEdit] = useState<UserRegister | undefined>(undefined);



   const onUpdateUser = (updatedUser: User) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            )
        );
    };

    return (
        <Table>
            <TableCaption>Lista de usuários cadastrados</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>CEP</TableHead>
                    <TableHead>Bairro</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Rua</TableHead>
                    <TableHead>Data de Nascimento</TableHead>
                    <TableHead>Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {user.map((singleUser, index) => (
                    <TableRow key={singleUser.id || index}>
                        <TableCell className="font-medium">{singleUser.name}</TableCell>
                        <TableCell>{singleUser.cpf}</TableCell>
                        <TableCell>{singleUser.cep}</TableCell>
                        <TableCell>{singleUser.neighborhood}</TableCell>
                        <TableCell>{singleUser.city}</TableCell>
                        <TableCell>{singleUser.street}</TableCell>
                        <TableCell>{singleUser.dateBirth}</TableCell>
                        <TableCell>


                            
                            <button onClick={() => setPostEdit(singleUser)}>
                                <img src="/images/edit.png" className="w-[25px]" alt="Edit" />
                            </button>
                            {postEdit && (
                                <EditUser
                                    isOpen={!!postEdit}
                                    setModalOpen={() => setPostEdit(undefined)}
                                    onAddUser={(user) =>  {
                                        console.log(user)
                                        onUpdateUser(user);
                                        setPostEdit(undefined);
                                    }}
                                    user={postEdit}
                                />
                            )}

                            <button onClick={() => setOpenDelete(singleUser.id)}>
                                <img src="/images/delete.png" className="w-[20px]" alt="Delete" />
                            </button>
                            <ModalDelete
                                isOpenDelete={openDelete === singleUser.id}
                                setOpenDelete={() => setOpenDelete(null)}
                                deletePost={() => {
                                    if (singleUser.id) {
                                        deletePost(singleUser.id);
                                    }
                                }}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
