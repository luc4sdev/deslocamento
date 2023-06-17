"use client";

import { BasicCard } from "@/components/BasicCard/BasicCard";
import { Header } from "@/components/Header/Header";
import { SwapVert } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";


interface Displacement {
        id: number;
        kmInicial: number;
        kmFinal: number;
        inicioDeslocamento: Date;
        fimDeslocamento: Date;
        checkList: string;
        motivo: string;
        observacao: string;
        idCondutor: number;
        idVeiculo: number;
        idCliente: number;
}

interface Params {
    params: {
        displacementId: string;
    }
}


export default function Displacement({ params: { displacementId } }: Params) {

    const [displacement, setDisplacement] = useState<Displacement>();
    const buttonOff = true;

    useEffect(() => {
       
        fetch(`https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${displacementId}`)
        .then((response) => response.json())
        .then((data) => {
            setDisplacement (data);
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }, []);
  

    return (
        <Box color='primary.light' sx={{ width: '100vw', height: '100vh', backgroundColor: 'primary.main', display: 'flex', flexDirection: 'column' }}>
        <Header />
    
        <Box sx={{
            backgroundColor: 'primary.main', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', flexGrow: 1, 
        }} >
            <Box sx={{ backgroundColor: 'primary.main', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <SwapVert sx={{ fontSize: 50 }} color='secondary' />
                <Typography fontSize={50} textAlign={'center'}>Deslocamento {displacement?.id}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BasicCard displacement={displacement} buttonOff={buttonOff}/>
            </Box>
            <Box />
        </Box>
    </Box>
    )
}