'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../templates/theme';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import LocalDashboard from '../components/LocalDashboard';
import { LoginForm } from '../components/Auth/LoginForm';
import { useFinancialData } from '../hooks/useFinancialData';
import { useAuth } from '../hooks/useAuth';
import { resetToDefaultData } from '../utils/storage';

export default function Home() {
  const { data, updateTheme } = useFinancialData();
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Hook local para gerenciar dados no GitHub Pages
  const [localFinancialData, setLocalFinancialData] = useState({
    balances: [],
    cards: [],
    debts: []
  });

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
    // Script inline para testar JavaScript
    console.log('PÁGINA CARREGADA!');
    
    // Adicionar listener global para testar cliques
    const handleGlobalClick = (event: MouseEvent) => {
      console.log('CLIQUE DETECTADO:', event.target);
      if (event.target instanceof HTMLElement) {
        if (event.target.textContent?.includes('TESTE')) {
          alert('BOTÃO HTML SIMPLES FUNCIONA!');
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    // Carregar dados do localStorage
    const savedData = localStorage.getItem('financeiro_local_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.theme && (parsed.theme.mode === 'light' || parsed.theme.mode === 'dark')) {
          setLocalData(parsed as typeof localData);
        }
        if (parsed.balances) {
          setLocalFinancialData({
            balances: parsed.balances || [],
            cards: parsed.cards || [],
            debts: parsed.debts || []
          });
        }
      } catch (e) {
        console.error('Erro ao carregar dados:', e);
      }
    }

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

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

  const theme = localData.theme.mode === 'light' ? lightTheme : darkTheme;

  // Para GitHub Pages, sempre mostrar o dashboard
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header
          theme={localData.theme.mode}
          onThemeToggle={() => {
            console.log('Tema alternado - CLICADO!');
            const newMode: 'light' | 'dark' = localData.theme.mode === 'light' ? 'dark' : 'light';
            const newData = {
              ...localData,
              theme: { mode: newMode }
            };
            setLocalData(newData);
            localStorage.setItem('financeiro_local_data', JSON.stringify(newData));
            alert(`Tema alterado para: ${newMode}`);
          }}
          onSettingsClick={handleSettingsClick}
          onResetData={() => {
            console.log('Reset dados - CLICADO!');
            if (window.confirm('Tem certeza que deseja resetar todos os dados?')) {
              localStorage.removeItem('financeiro_local_data');
              window.location.reload();
            }
          }}
          onLogout={() => {
            console.log('Logout - CLICADO!');
            if (window.confirm('Tem certeza que deseja sair?')) {
              localStorage.removeItem('financeiro_local_data');
              window.location.reload();
            }
          }}
          isAuthenticated={true}
        />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <LocalDashboard 
            data={localFinancialData}
            onUpdateData={(newData) => {
              const updatedData = { ...localData, ...newData };
              setLocalData(updatedData);
              setLocalFinancialData(newData);
              localStorage.setItem('financeiro_local_data', JSON.stringify(updatedData));
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
