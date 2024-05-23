"use client"
import { Input } from "@/components/ui/input";
import { ClienteDTO } from "@/model/ClienteDTO";
import BASE_URL from "@/utils/BASE_URL";
import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState<ClienteDTO[]>([]);


  useEffect(() => {
    
    const getClientes = async ()=>{
      const response = await fetch(`${BASE_URL}/clientes`);
      const data = await response.json();
      setData(data)
    }

    getClientes();
  }, [])


  return (
    <main className="flex">
      <div>
        <Input type="email" placeholder="Email" />

        {JSON.stringify(data)}
      </div>
    </main>
  );
}
