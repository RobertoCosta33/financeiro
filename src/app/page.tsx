'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../templates/theme';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import { LoginForm } from '../components/Auth/LoginForm';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState({
    theme: { mode: 'light' as 'light' | 'dark' },
    balances: [],
    cards: [],
    debts: []
  });
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    // Carregamento rápido com localStorage
    console.log('Carregando sistema com localStorage...');
    
    setTimeout(() => {
      setLoading(false);
      
      // Carregar dados do localStorage
      const savedData = localStorage.getItem('financeiro_local_data');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setData(parsed);
          setIsAuthenticated(true);
          console.log('Dados carregados do localStorage');
        } catch (e) {
          console.error('Erro ao carregar dados:', e);
        }
      } else {
        console.log('Nenhum dado salvo encontrado');
      }
    }, 500); // Carregamento rápido de 500ms
  }, []);

  const updateTheme = (newTheme: { mode: 'light' | 'dark' }) => {
    const newData = { ...data, theme: newTheme };
    setData(newData);
    localStorage.setItem('financeiro_local_data', JSON.stringify(newData));
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    const initialData = {
      theme: { mode: 'light' as 'light' | 'dark' },
      balances: [],
      cards: [],
      debts: []
    };
    setData(initialData);
    localStorage.setItem('financeiro_local_data', JSON.stringify(initialData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('financeiro_local_data');
  };

  // Se ainda está carregando, mostrar loading
  if (loading) {
    return (
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography variant="h4" color="primary">
            🚀 Carregando Sistema Financeiro...
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Carregando modo local...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  // Se não está autenticado, mostrar login
  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Box sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          bgcolor: 'background.default'
        }}>
          <Header
            theme="light"
            onThemeToggle={() => {}}
            onSettingsClick={() => {}}
            onResetData={() => {}}
            onLogout={() => {}}
            isAuthenticated={false}
          />
          <Box component="main" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LoginForm />
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  // Se está autenticado, mostrar dashboard
  const theme = data.theme.mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header
          theme={data.theme.mode}
          onThemeToggle={() => {
            const newMode = data.theme.mode === 'light' ? 'dark' : 'light';
            updateTheme({ mode: newMode });
          }}
          onSettingsClick={() => setSettingsOpen(true)}
          onResetData={() => {
            if (window.confirm('Tem certeza que deseja resetar todos os dados?')) {
              localStorage.removeItem('financeiro_local_data');
              window.location.reload();
            }
          }}
          onLogout={handleLogout}
          isAuthenticated={true}
        />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Dashboard />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
