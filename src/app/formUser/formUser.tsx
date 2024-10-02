import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form"; // Importação correta
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const creatUserFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  cpf: z.string().min(1, "O CPF é obrigatório"),
  cep: z.string().min(1, "O CEP é obrigatório"),
  number: z.string().min(1, "O número é obrigatório"),
  bairro: z.string().min(1, "O bairro é obrigatório"),
  city: z.string().min(1, "A cidade é obrigatória"),
  estado: z.string().min(1, "O estado é obrigatório"),
});

type FormData = z.infer<typeof creatUserFormSchema>;

export function FormUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(creatUserFormSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data, errors);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Adicionar Cliente</CardTitle>
          <CardDescription>Preencha as informações a seguir:</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}> {/* A chamada do handleSubmit deve estar aqui */}
            <div className="grid w-full items-center gap-4">
              {/* Campos do formulário aqui */}
              <div className="flex flex-col space-y-1.5">
                <Label id="name">Nome</Label>
                <Input {...register("name")} placeholder="Digite seu nome..." />
                {errors.name && <span>{errors.name.message}</span>}
              </div>
              {/* Repita isso para os outros campos */}
            </div>
            <Button type="submit">Deploy</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
        </CardFooter>
      </Card>
    </div>
  );
}