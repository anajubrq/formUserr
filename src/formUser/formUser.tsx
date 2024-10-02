"usezz"
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
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";

import { withMask } from 'use-mask-input';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface FormUserProps {
  
  isOpen: boolean,
  setModalOpen:  React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormUser({  isOpen,setModalOpen }: FormUserProps) {
  type Inputs = {
  
    name: string;
    cpf: string;
    cep: string;
    neighborhood: string;
    city: string;
    street: string;
    dateBith: string;
  };

  const userRegisterSchema = z.object({
    name: z.string().min(1, { message: 'The name field needs to be filled in' }),
    cpf: z.string().min(1, { message: 'The CPF field needs to be filled in' }).regex(/^\d{3}\.\d{3}-\d{3}-\d{2}$/, 'CPF inválido'),
    cep: z.string().min(1, { message: "The ZIP code field needs to be filled in" }).regex(/^\d{5}-\d{3}$/, 'CEP inválido'),
    neighborhood: z.string().min(1, { message: "The neighborhood code field needs to be filled in" }),
    city: z.string().min(1, { message: "The city code field needs to be filled in" }),
    street: z.string().min(1, { message: "The street code field needs to be filled in" }),
    dateBith: z.string().min(1, { message: "The date of birth code field needs to be filled in" })
  })

  type UserRegister = z.infer<typeof userRegisterSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState: { isLoading },
    reset,
  } = useForm<UserRegister>({ resolver: zodResolver(userRegisterSchema) });

  const [newClient, setNewClient] = React.useState({

    name: "",
    cpf: "",
    cep: "",
    neighborhood: "",
    city: "",
    street: "",
    dateBith: ""
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data, "esses são meus dados, valor inicial");

  
    setNewClient(newClient)

    reset();
  };
  

  const [address, setAddress] = React.useState({ city: '', neighborhood: '', street: '' });
  const [isFieldsDisabled, setIsFieldsDisabled] = React.useState(false); 

  async function handleZipcodeBlur(e: React.FocusEvent<HTMLInputElement>) {
    const zipcode = e.target.value;

    const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${zipcode}`);

    if (res.ok) {
      const data = await res.json();
      setAddress({
        city: data.city,
        neighborhood: data.neighborhood,
        street: data.street
      });
      setIsFieldsDisabled(true); 
    }
  }

  if(!isOpen) return null;

  return (
    <section className="  fixed inset-0 bg-black  bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10 " >
    <div className="flex justify-center items-center w-full h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Add customer</CardTitle>
          <CardDescription>Fill in the following information:</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  {...register("name")}
                />
                {errors.name && <span className="text-red-700">{errors.name?.message}</span>}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="Enter your CPF"
                  {...register("cpf", { required: "CPF is required" })}
                  ref={withMask('999.999.999-99')}
                />
                {errors.cpf && <span>{errors.cpf.message}</span>}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  placeholder="Enter your zip code"
                  {...register("cep", { required: "CEP is required" })}
                  ref={withMask('99999-999')}
                  onBlur={handleZipcodeBlur}
                />
                {errors.cep && <span>{errors.cep.message}</span>}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Enter your city"
                  {...register("city", { required: "City is required" })}
                  value={address.city}
                  disabled={isFieldsDisabled}
                />
                {errors.city && <span>{errors.city.message}</span>}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="neighborhood">Neighborhood</Label>
                <Input
                  id="neighborhood"
                  placeholder="Enter your neighborhood"
                  {...register("neighborhood", {
                    required: "Neighborhood is required",
                  })}
                  value={address.neighborhood}
                  disabled={isFieldsDisabled} 
                />
                {errors.neighborhood && <span>{errors.neighborhood.message}</span>}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  type="street"
                  placeholder="Enter your number"
                  {...register("street", {
                    required: "Number is required",
                  })}
                  value={address.street}
                  disabled={isFieldsDisabled} 
                />
                {errors.street && <span>{errors.street.message}</span>}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="dateBith">Date of birth</Label>
                <Input
                  id="dateBith"
                  type="date"
                  placeholder="Enter your date of birth"
                  {...register("dateBith", {
                    required: "Enter your date of birth",
                  })}
                />
                {errors.dateBith && <span>{errors.dateBith.message}</span>}
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="mt-4" onClick={()=> setModalOpen(false)} >
              Submit
            </Button>
            <Button type="button" className="mt-4" onClick={()=> setModalOpen(false)}>
              Cancel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </section>
  );
}
