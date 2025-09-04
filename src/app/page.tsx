'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../templates/theme';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import { LoginForm } from '../components/Auth/LoginForm';
import { useFinancialData } from '../hooks/useFinancialData';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { data, updateTheme, addBalance, addCard, addDebt } = useFinancialData();
  const { user, isAuthenticated, login, logout, loading } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);

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
            Conectando com Supabase...
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
              // Implementar reset no Supabase
              console.log('Reset dados no Supabase');
            }
          }}
          onLogout={logout}
          isAuthenticated={true}
        />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Dashboard />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
