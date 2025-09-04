'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../templates/theme';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import { LoginForm } from '../components/Auth/LoginForm';
import { useFinancialData } from '../hooks/useFinancialData';
import { useAuth } from '../hooks/useAuth';
import { resetToDefaultData } from '../utils/storage';

export default function Home() {
  const { data, updateTheme } = useFinancialData();
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleThemeToggle = () => {
    const newMode = data.theme.mode === 'light' ? 'dark' : 'light';
    updateTheme({ mode: newMode });
  };

  const handleSettingsClick = () => {
    setSettingsOpen(true);
  };

  const handleResetData = () => {
    if (window.confirm('Tem certeza que deseja resetar todos os dados? Esta ação não pode ser desfeita.')) {
      resetToDefaultData();
      window.location.reload();
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      await logout();
    }
  };

  if (loading) {
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

  const theme = data.theme.mode === 'light' ? lightTheme : darkTheme;

  // Se não estiver autenticado, mostrar tela de login
  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <LoginForm />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header
          theme={data.theme.mode}
          onThemeToggle={handleThemeToggle}
          onSettingsClick={handleSettingsClick}
          onResetData={handleResetData}
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
        />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Dashboard />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
