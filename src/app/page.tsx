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

  // Para GitHub Pages, vamos usar localStorage em vez de Supabase
  const [isLocalMode, setIsLocalMode] = useState(true);
  const [localData, setLocalData] = useState<{
    theme: { mode: 'light' | 'dark' };
    balances: unknown[];
    cards: unknown[];
    debts: unknown[];
  }>({
    theme: { mode: 'light' },
    balances: [],
    cards: [],
    debts: []
  });

  useEffect(() => {
    // Carregar dados do localStorage
    const savedData = localStorage.getItem('financeiro_local_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.theme && (parsed.theme.mode === 'light' || parsed.theme.mode === 'dark')) {
          // @ts-ignore
          setLocalData(parsed);
        }
      } catch (e) {
        console.error('Erro ao carregar dados:', e);
      }
    }
  }, []);

  if (loading && !isLocalMode) {
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

  const theme = localData.theme.mode === 'light' ? lightTheme : darkTheme;

  // Para GitHub Pages, sempre mostrar o dashboard
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header
          theme={localData.theme.mode}
          onThemeToggle={() => {
            const newData = {
              ...localData,
              theme: { mode: localData.theme.mode === 'light' ? 'dark' : 'light' }
            };
            setLocalData(newData);
            localStorage.setItem('financeiro_local_data', JSON.stringify(newData));
          }}
          onSettingsClick={handleSettingsClick}
          onResetData={() => {
            localStorage.removeItem('financeiro_local_data');
            window.location.reload();
          }}
          onLogout={() => {
            localStorage.removeItem('financeiro_local_data');
            window.location.reload();
          }}
          isAuthenticated={true}
        />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Dashboard />
        </Box>
      </Box>
    </ThemeProvider>
  );

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
