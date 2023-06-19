"use client";

import { BasicCard } from "@/components/BasicCard/BasicCard";
import { Header } from "@/components/Header/Header";
import { fetchData } from "@/services/route";
import { Person } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";


interface Conductor {
    id: number;
    nome: string;
    numeroHabilitacao: string;
    categoriaHabilitacao: string;
    vencimentoHabilitacao: string;
}

interface Params {
    params: {
        conductorId: string;
    }
}


export default function Conductor({ params: { conductorId } }: Params) {

    const [conductor, setConductor] = useState<Conductor>();
    const buttonOff = true;


    async function getData() {
        const data = await fetchData('https://api-deslocamento.herokuapp.com/api/v1/Condutor', Number(conductorId));
        setConductor(data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Box color='primary.light' sx={{ width: '100vw', height: '100vh', backgroundColor: 'primary.main', display: 'flex', flexDirection: 'column' }}>
            <Header />

            <Box sx={{
                backgroundColor: 'primary.main', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', flexGrow: 1,
            }} >
                <Box sx={{ backgroundColor: 'primary.main', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Person sx={{ fontSize: 50 }} color='secondary' />
                    <Typography fontSize={30} textAlign={'center'}>Condutor {conductor?.id}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BasicCard conductor={conductor} buttonOff={buttonOff} />
                </Box>
                <Box />
            </Box>
        </Box>
    )
}