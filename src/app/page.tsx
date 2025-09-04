'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      flexDirection: 'column',
      gap: 3,
      p: 3
    }}>
      <Typography variant="h3" component="h1" gutterBottom>
        💰 Sistema Financeiro
      </Typography>
      
      <Typography variant="h5" color="text.secondary" textAlign="center">
        Aplicação Online Funcionando!
      </Typography>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          🎉 Status da Aplicação:
        </Typography>
        <Typography variant="body1" color="success.main">
          ✅ React funcionando perfeitamente
        </Typography>
        <Typography variant="body1" color="success.main">
          ✅ Material-UI carregado
        </Typography>
        <Typography variant="body1" color="success.main">
          ✅ GitHub Pages funcionando
        </Typography>
        <Typography variant="body1" color="success.main">
          ✅ Deploy automático ativo
        </Typography>
      </Box>

      <Button 
        variant="contained" 
        size="large"
        onClick={() => alert('🎉 Interação funcionando perfeitamente!')}
        sx={{ mt: 2 }}
      >
        Testar Interação
      </Button>
    </Box>
  );
}
