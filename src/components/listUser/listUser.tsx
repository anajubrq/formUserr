"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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
export interface ListUserProps {
    user: User[]
    isOpen: boolean,
  setModalOpen:  React.Dispatch<React.SetStateAction<boolean>>

}

export interface ListTabelaProps {
    user : User[],
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
   
}

export function ListUser({ user }: ListTabelaProps) {
    console.log(user, " user tabela")
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
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}