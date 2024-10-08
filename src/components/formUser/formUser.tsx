"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form";
import { withMask } from 'use-mask-input';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


interface FormUserProps {
  isOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const userRegisterSchema = z.object({
  name: z.string().min(1, { message: 'The name field needs to be filled in' }),
  cpf: z.string().min(1, { message: 'The CPF field needs to be filled in' }),
  cep: z.string().min(1, { message: "The ZIP code field needs to be filled in" }),
  neighborhood: z.string().min(1, { message: "The neighborhood field needs to be filled in" }),
  city: z.string().min(1, { message: "The city field needs to be filled in" }),
  street: z.string().min(1, { message: "The street field needs to be filled in" }),
  dateBirth: z.string().min(1, { message: "The date of birth field needs to be filled in" }) 
});

export type UserRegister = z.infer<typeof userRegisterSchema>;

export default function FormUser({ isOpen, setModalOpen }: FormUserProps) {
  type Inputs = {
    name: string;
    cpf: string;
    cep: string;
    neighborhood: string;
    city: string;
    street: string;
    dateBirth: string; 
  };

 

  const form = useForm<UserRegister>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: { cep: "", name: "", dateBirth: "", neighborhood: "", street: "", cpf: "", city: "" }
  });

  const {
    handleSubmit,
    formState: { isLoading }
  } = form;

  const [users, setUsers] = React.useState<UserRegister[]>([]); 
  const [address, setAddress] = React.useState({ city: '', neighborhood: '', street: '' });
  const [isFieldsDisabled, setIsFieldsDisabled] = React.useState(false);

  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data, "esses são meus dados, valor inicial");
    const userAdaptado = { ...data, id: generateRandomId() }; 
    setUsers((users) => [...users, userAdaptado]); 
    setModalOpen(false);
    console.log(userAdaptado, "Lista de usuários após a adição, id");
    console.log(users)
    form.reset()

    
  
  };

async function handleZipcodeBlur(e: React.FocusEvent<HTMLInputElement>) {
    const zipcode = e.target.value;
  
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${zipcode}/json/`);
  
      if (res.data.erro) {
        throw new Error('CEP não encontrado');
      }
  
      setAddress({
        city: res.data.localidade,
        neighborhood: res.data.bairro,
        street: res.data.logradouro
      });
      setIsFieldsDisabled(true);
    } catch (error) {
      console.error(error);
      
    }
  }
  
  

  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10 ">
      <div className="flex justify-center items-center w-full h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-[22px]">Add customer</CardTitle>
            <CardDescription>Fill in the following information:</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel> Nome </FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="Name of your project" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )} />

                <FormField control={form.control} name="cpf" render={({ field }) => (
                  <FormItem>
                    <FormLabel> CPF </FormLabel>
                    <FormControl>
                      <Input id="cpf" placeholder="Enter your CPF" {...field} ref={withMask('999.999.999-99')} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )} />

                <FormField control={form.control} name="cep" render={({ field }) => (
                  <FormItem>
                    <FormLabel> CEP </FormLabel>
                    <FormControl>
                      <Input id="cep" placeholder="Enter your zip code" {...field} ref={withMask('99999-999')} onBlur={handleZipcodeBlur} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )} />

                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem>
                    <FormLabel> City </FormLabel>
                    <FormControl>
                      <Input id="city" placeholder="Enter your city" disabled={isFieldsDisabled} {...field} value={address.city} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )} />

                <FormField control={form.control} name="neighborhood" render={({ field }) => (
                  <FormItem>
                    <FormLabel> Neighborhood </FormLabel>
                    <FormControl>
                      <Input id="neighborhood" placeholder="Enter your neighborhood"  {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )} />

                <FormField control={form.control} name="street" render={({ field }) => (
                  <FormItem>
                    <FormLabel> Street </FormLabel>
                    <FormControl>
                      <Input id="street" placeholder="Enter your street" disabled={isFieldsDisabled} {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )} />

                <FormField control={form.control} name="dateBirth" render={({ field }) => (
                  <FormItem>
                    <FormLabel> Date of birth </FormLabel>
                    <FormControl>
                      <Input id="dateBirth" type="date" placeholder="Enter your date of birth" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )} />

                <div className="flex justify-center items-center gap-[40px]">
                  <Button type="submit" disabled={isLoading} className="mt-4">
                    Submit
                  </Button>
                  <Button type="button" className="mt-4" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
