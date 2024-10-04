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

export const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

export interface User {
    id: string;
    name: string;
    cpf: string;
    cep: string;
    neighborhood: string;
    city: string;
    street: string;
    dateBith: string; 
}
export interface ListUserProps {
    user: User[]
    isOpen: boolean,
  setModalOpen:  React.Dispatch<React.SetStateAction<boolean>>

}

export interface ListTabelaProps {
    user : User[],
   
}

export function ListUser({ user }: ListTabelaProps) {
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader >
                <TableRow >
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>CEP</TableHead>
                    <TableHead className="text-right">Neighborhood</TableHead>
                    <TableHead className="text-right">City</TableHead>
                    <TableHead className="text-right">Number</TableHead>
                    <TableHead className="text-right">Date of birth</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {user.map((singleUser) => ( 
                    <TableRow key={singleUser.id}>
                        <TableCell className="font-medium">{singleUser.name}</TableCell>
                        <TableCell>{singleUser.cpf}</TableCell>
                        <TableCell>{singleUser.cep}</TableCell>
                        <TableCell className="text-right">{singleUser.neighborhood}</TableCell>
                        <TableCell className="text-right">{singleUser.city}</TableCell>
                        <TableCell className="text-right">{singleUser.street}</TableCell>
                        <TableCell className="text-right">{singleUser.dateBith}</TableCell>
                        
             

             
                    </TableRow>
                ))}
            </TableBody>
            
        </Table>
    )
}
