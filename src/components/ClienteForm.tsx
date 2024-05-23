"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ClienteDTO } from "@/model/ClienteDTO";
import BASE_URL from "@/utils/BASE_URL";
import axios, { AxiosResponse } from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { Toaster } from "./ui/toaster";
import { ToastAction } from "@radix-ui/react-toast";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Usuário deve ter mais de 2 caracteres",
    })
    .max(20, {
      message: "Usuário deve ter no máximo 20 caracteres",
    }),
  cep: z
    .string()
    .trim()
    .regex(/^\d{8}$/, {
      message: "Cep deve conter apenas números",
    })
    .length(8, {
      message: "Cep deve conter 8 digitos",
    }),
});

interface Props {
  setReload: Dispatch<SetStateAction<boolean>>;
}

export function ClienteForm(props: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    setDisebleBtn(true);

    axios
      .post(
        `${BASE_URL}/clientes`,
        {
          nome: values.username,
          endereco: {
            cep: values.cep,
          },
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res: AxiosResponse<ClienteDTO[]>) => {
        console.log(res);
        props.setReload((previus) => !previus);
      })
      .catch((err) => {
        setDisebleBtn(false);
        console.error(err);
        toast({
          title: "Algo deu errado",
          description: `verifique as informações preenchidas - ${Date.now()}`,
          action: (
            <ToastAction altText="tentar novamente">
              tentar novamente
            </ToastAction>
          ),
        });
      });
  }

  const [disableBtn, setDisebleBtn] = useState<boolean>(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input placeholder="nome usuário" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cep</FormLabel>
              <FormControl>
                <Input placeholder="cep" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormDescription>
          Ao preencher e enviar seu lougradorou será exibido com os demais
          clientes.
        </FormDescription>
        <div>
          <Button type="submit" disabled={disableBtn}>
            Submit
          </Button>
          {disableBtn && (
            <Button
              type="button"
              onClick={() => {
                setDisebleBtn((prev) => !prev);
              }}
            >
              Adicionar outro
            </Button>
          )}
        </div>
      </form>
      <Toaster />
    </Form>
  );
}
