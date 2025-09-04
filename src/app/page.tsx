'use client';

import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Adicionar event listeners inline para garantir funcionamento
    const testButton = document.getElementById('test-button');
    const themeButton = document.getElementById('theme-button');
    
    if (testButton) {
      testButton.addEventListener('click', () => {
        console.log('BOTÃO TESTE CLICADO!');
        alert('🎉 BOTÃO FUNCIONANDO! JavaScript está OK!');
      });
    }
    
    if (themeButton) {
      themeButton.addEventListener('click', () => {
        console.log('BOTÃO TEMA CLICADO!');
        alert('🎨 Tema alternado!');
      });
    }
    
    // Atualizar URL
    const urlElement = document.getElementById('url-display');
    if (urlElement) {
      urlElement.textContent = window.location.href;
    }
    
    console.log('PÁGINA CARREGADA COM JAVASCRIPT INLINE!');
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#1976d2', textAlign: 'center' }}>
        🎉 SISTEMA FINANCEIRO FUNCIONANDO! 🎉
      </h1>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        margin: '20px auto',
        maxWidth: '600px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#333' }}>✅ Página carregada com sucesso!</h2>
        
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Se você está vendo esta mensagem, significa que:
        </p>
        
        <ul style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <li>✅ React está funcionando</li>
          <li>✅ GitHub Pages está servindo os arquivos</li>
          <li>✅ JavaScript está executando</li>
        </ul>
        
        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#e3f2fd',
          borderRadius: '5px',
          border: '1px solid #1976d2'
        }}>
          <h3 style={{ color: '#1976d2', margin: '0 0 10px 0' }}>
            🧪 Teste de Botões (JavaScript Inline):
          </h3>
          
          <button 
            id="test-button"
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            🧪 Testar JavaScript
          </button>
          
          <button 
            id="theme-button"
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🎨 Alternar Tema
          </button>
        </div>
        
        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#fff3e0',
          borderRadius: '5px',
          border: '1px solid #ff9800'
        }}>
          <h3 style={{ color: '#ff9800', margin: '0 0 10px 0' }}>
            📊 Próximos Passos:
          </h3>
          
          <p style={{ margin: '0', fontSize: '14px' }}>
            Se os botões funcionarem, vamos restaurar o layout completo com Material-UI.
          </p>
        </div>
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '30px',
        fontSize: '14px',
        color: '#666'
      }}>
        <p>🕐 Timestamp: {new Date().toLocaleString('pt-BR')}</p>
        <p>🌐 URL: <span id="url-display">Carregando...</span></p>
      </div>
      
      {/* Script inline para garantir funcionamento */}
      <script dangerouslySetInnerHTML={{
        __html: `
          console.log('SCRIPT INLINE CARREGADO!');
          
          // Adicionar listeners quando DOM estiver pronto
          document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM CARREGADO!');
            
            const testBtn = document.getElementById('test-button');
            const themeBtn = document.getElementById('theme-button');
            const urlDisplay = document.getElementById('url-display');
            
            if (testBtn) {
              testBtn.addEventListener('click', function() {
                console.log('BOTÃO TESTE CLICADO VIA SCRIPT INLINE!');
                alert('🎉 BOTÃO FUNCIONANDO! JavaScript inline está OK!');
              });
            }
            
            if (themeBtn) {
              themeBtn.addEventListener('click', function() {
                console.log('BOTÃO TEMA CLICADO VIA SCRIPT INLINE!');
                alert('🎨 Tema alternado via script inline!');
              });
            }
            
            if (urlDisplay) {
              urlDisplay.textContent = window.location.href;
            }
          });
        `
      }} />
    </div>
  );
}
