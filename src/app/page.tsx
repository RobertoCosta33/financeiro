'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme } from '../templates/theme';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Typography variant="h4">Carregando...</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            💰 Sistema Financeiro
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Aplicação Online Funcionando!
          </Typography>
        </Box>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            🎉 Status da Aplicação:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            🚀 Próximos Passos:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body1">
              1. Configure as variáveis de ambiente do Supabase
            </Typography>
            <Typography variant="body1">
              2. Ative a autenticação e persistência na nuvem
            </Typography>
            <Typography variant="body1">
              3. Acesse todas as funcionalidades da aplicação
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ textAlign: 'center' }}>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => alert('🎉 Interação funcionando perfeitamente!')}
            sx={{ mr: 2 }}
          >
            Testar Interação
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            onClick={() => window.open('https://github.com/RobertoCosta33/financeiro', '_blank')}
          >
            Ver Código
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
