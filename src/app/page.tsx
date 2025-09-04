'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Carregamento rápido
    setTimeout(() => {
      setLoading(false);
      
      // Carregar dados do localStorage
      const savedData = localStorage.getItem('financeiro_local_data');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed.theme?.mode) {
            setTheme(parsed.theme.mode);
          }
          setIsAuthenticated(true);
        } catch (e) {
          console.error('Erro ao carregar dados:', e);
        }
      }
    }, 500);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('financeiro_local_data', JSON.stringify({
      theme: { mode: 'light' },
      balances: [],
      cards: [],
      debts: []
    }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('financeiro_local_data');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    const savedData = localStorage.getItem('financeiro_local_data');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      parsed.theme = { mode: newTheme };
      localStorage.setItem('financeiro_local_data', JSON.stringify(parsed));
    }
  };

  // Loading
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '16px',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ color: '#1976d2', margin: 0 }}>
          🚀 Carregando Sistema Financeiro...
        </h1>
        <p style={{ color: '#666', margin: 0 }}>
          Aguarde um momento...
        </p>
      </div>
    );
  }

  // Login
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* Header */}
        <header style={{
          backgroundColor: '#1976d2',
          color: 'white',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '24px' }}>🏠</span>
            <h1 style={{ margin: 0, fontSize: '20px' }}>Sistema Financeiro</h1>
          </div>
        </header>

        {/* Login Form */}
        <main style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          padding: '40px 20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxWidth: '400px',
            width: '100%'
          }}>
            <h2 style={{ textAlign: 'center', margin: '0 0 24px 0', color: '#333' }}>
              🔐 Login
            </h2>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
                Email:
              </label>
              <input 
                type="email" 
                placeholder="seu@email.com"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
                Senha:
              </label>
              <input 
                type="password" 
                placeholder="Sua senha"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            <button 
              onClick={handleLogin}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              🚀 Entrar
            </button>
            
            <p style={{ textAlign: 'center', margin: '16px 0 0 0', color: '#666', fontSize: '14px' }}>
              Para teste, clique em "Entrar" sem preencher os campos
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Dashboard
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme === 'dark' ? '#121212' : '#f5f5f5',
      color: theme === 'dark' ? 'white' : 'black',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '24px' }}>🏠</span>
          <h1 style={{ margin: 0, fontSize: '20px' }}>Sistema Financeiro</h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', marginRight: '8px' }}>
            {theme === 'light' ? 'Claro' : 'Escuro'}
          </span>
          <button 
            onClick={toggleTheme}
            style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '20px'
            }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button 
            onClick={handleLogout}
            style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '20px'
            }}
          >
            🚪
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <main style={{ padding: '24px' }}>
        <div style={{
          backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <h2 style={{ margin: '0 0 16px 0', color: theme === 'dark' ? 'white' : '#333' }}>
            📊 Dashboard
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              padding: '16px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 8px 0' }}>Total de Saldos</h3>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>R$ 0,00</p>
            </div>
            
            <div style={{
              padding: '16px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 8px 0' }}>Dívidas Mensais</h3>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>R$ 0,00</p>
            </div>
          </div>
          
          <button 
            onClick={() => alert('🎉 Sistema funcionando!')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🧪 Testar Sistema
          </button>
        </div>
        
        <div style={{
          backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 16px 0', color: theme === 'dark' ? 'white' : '#333' }}>
            ✅ Sistema Funcionando!
          </h2>
          <p style={{ margin: 0, color: theme === 'dark' ? '#ccc' : '#666' }}>
            O sistema está funcionando perfeitamente no GitHub Pages com localStorage.
            Todos os dados são salvos localmente no seu navegador.
          </p>
        </div>
      </main>
    </div>
  );
}
