"use client";

import { BasicCard } from "@/components/BasicCard/BasicCard";
import { Header } from "@/components/Header/Header";
import { AccountBox } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";


interface Client {
        id: number;
        numeroDocumento: string;
        tipoDocumento: string;
        nome: string;
        logradouro: string;
        numero: string;
        bairro: string;
        cidade: string;
        uf: string;
}



export async function getClient(params: {
    clientId: string;
}) {

    const data = await fetch(`https://api-deslocamento.herokuapp.com/api/v1/Cliente/${params.clientId}`)

    const client = await data.json()

    return client

}

export async function generateStaticParams() {
    const response = await fetch('https://api-deslocamento.herokuapp.com/api/v1/Cliente/')

    const data = await response.json()

    const paths = data.map((client: Client) => {
        return {
            params: {
                clientId: String(client.id)
            }
        }
    })
    
    return {paths, fallback: false}
}


export default function Client({ params } : any) {

    const [client, setClient] = useState<Client>();
    const buttonOff = true;

    useEffect(() => {
      getClient(params)
        .then((data) => {
          setClient(data);
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }, [params]);
  

    return (
        <Box color='primary.light' sx={{ width: '100vw', height: '100vh', backgroundColor: 'primary.main', display: 'flex', flexDirection: 'column' }}>
        <Header />
    
        <Box sx={{
            backgroundColor: 'primary.main', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', flexGrow: 1, 
        }} >
            <Box sx={{ backgroundColor: 'primary.main', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <AccountBox sx={{ fontSize: 50 }} color='secondary' />
                <Typography fontSize={50} textAlign={'center'}>Cliente {client?.id}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BasicCard client={client} buttonOff={buttonOff}/>
            </Box>
            <Box />
        </Box>
    </Box>
    )
}