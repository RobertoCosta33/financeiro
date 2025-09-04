'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../templates/theme';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import { LoginForm } from '../components/Auth/LoginForm';

interface UserData {
  id: string;
  email: string;
  name?: string;
}

interface ThemeData {
  mode: 'light' | 'dark';
}

interface AppData {
  theme: ThemeData;
  balances: unknown[];
  cards: unknown[];
  debts: unknown[];
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [data, setData] = useState<AppData>({
    theme: { mode: 'light' },
    balances: [],
    cards: [],
    debts: []
  });
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    // Detectar se estamos no GitHub Pages (sem Supabase)
    const isGitHubPages = window.location.hostname === 'robertocosta33.github.io';
    
    if (isGitHubPages) {
      // Modo local para GitHub Pages
      console.log('GitHub Pages detectado - usando modo local');
      
      // Carregar dados do localStorage
      const savedData = localStorage.getItem('financeiro_local_data');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData) as AppData;
          setData(parsed);
          setIsAuthenticated(true);
        } catch (e) {
          console.error('Erro ao carregar dados:', e);
        }
      }
      
      setLoading(false);
    } else {
      // Modo Supabase para desenvolvimento local
      console.log('Desenvolvimento local - usando Supabase');
      
      // Simular carregamento do Supabase
      setTimeout(() => {
        setLoading(false);
        // Aqui você pode adicionar a lógica real do Supabase
      }, 1000);
    }
  }, []);

  const updateTheme = (newTheme: ThemeData) => {
    const newData = { ...data, theme: newTheme };
    setData(newData);
    localStorage.setItem('financeiro_local_data', JSON.stringify(newData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('financeiro_local_data');
  };

  const handleLogin = (userData: UserData) => {
    setIsAuthenticated(true);
    setUser(userData);
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
            Aguarde um momento...
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
            const newMode: 'light' | 'dark' = data.theme.mode === 'light' ? 'dark' : 'light';
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
