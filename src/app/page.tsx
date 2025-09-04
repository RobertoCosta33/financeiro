'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function Home() {
  const [error, setError] = useState<string | null>(null);

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
        🎉 Sistema Financeiro
      </Typography>
      
      <Typography variant="h5" color="text.secondary" textAlign="center">
        Aplicação funcionando no GitHub Pages!
      </Typography>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          Status da Aplicação:
        </Typography>
        <Typography variant="body1" color="success.main">
          ✅ Página carregada com sucesso
        </Typography>
        <Typography variant="body1" color="success.main">
          ✅ React funcionando
        </Typography>
        <Typography variant="body1" color="success.main">
          ✅ Material-UI funcionando
        </Typography>
        <Typography variant="body1" color="success.main">
          ✅ GitHub Pages funcionando
        </Typography>
      </Box>

      <Button 
        variant="contained" 
        size="large"
        onClick={() => alert('Botão funcionando!')}
        sx={{ mt: 2 }}
      >
        Testar Interação
      </Button>

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          Erro: {error}
        </Typography>
      )}
    </Box>
  );
}
