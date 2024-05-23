"use client";
import { ClienteForm } from "@/components/ClienteForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClienteDTO } from "@/model/ClienteDTO";
import BASE_URL from "@/utils/BASE_URL";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const [data, setData] = useState<ClienteDTO[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/clientes`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res: AxiosResponse<ClienteDTO[]>) => {
        setData(res.data.reverse());
      })
      .catch((err) => {
        console.error(err);
      });
  }, [reload]);

  return (
    <main className="h-screen flex flex-wrap justify-center gap-10">
      <nav className="w-screen h-16 border-b flex items-center justify-between pl-2 pr-2">
        <h1 className="text-xl">DEV - emersonjps</h1>

        <div className="flex gap-3">
          <Link href={"https://www.linkedin.com/in/emersonjps/"}>
            <CiLinkedin size={30} />
          </Link>
          <Link href={"https://github.com/emersonjps"}>
            <FaGithub size={30} />
          </Link>
        </div>
      </nav>

      <Card className="w-64 h-max p-5">
        <CardHeader className="-p-5 mb-5">
          <CardTitle>Crie sua usuário</CardTitle>
          <CardDescription>Encontre seu logradouro via cep.</CardDescription>
        </CardHeader>
        <ClienteForm setReload={setReload} />
      </Card>
      <section className="flex flex-col h-96 overflow-auto pr-5">
        {data &&
          data.map((cliente, i) => {
            return (
              <Card key={i} className="w-72 md:w-96 p-2 mb-1">
                <CardHeader>
                  <CardTitle>{cliente.nome}</CardTitle>
                  <CardDescription className="flex flex-wrap gap-1">
                    {Object.entries(cliente.endereco).map((el, i) => {
                      return (
                        <p key={i}>
                          {el[0]}: {el[1]}
                        </p>
                      );
                    })}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
      </section>
    </main>
  );
}
