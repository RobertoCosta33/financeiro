'use client';

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      flexDirection: 'column',
      gap: '24px',
      padding: '24px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '48px', margin: 0 }}>
        💰 Sistema Financeiro
      </h1>
      
      <h2 style={{ fontSize: '24px', color: '#666', margin: 0, textAlign: 'center' }}>
        Aplicação Online Funcionando!
      </h2>

      <div style={{ 
        marginTop: '32px', 
        padding: '24px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px', 
        maxWidth: '400px',
        border: '1px solid #ddd'
      }}>
        <h3 style={{ fontSize: '20px', margin: '0 0 16px 0' }}>
          🎉 Status da Aplicação:
        </h3>
        <p style={{ color: '#4caf50', margin: '8px 0' }}>
          ✅ React funcionando perfeitamente
        </p>
        <p style={{ color: '#4caf50', margin: '8px 0' }}>
          ✅ Next.js carregado
        </p>
        <p style={{ color: '#4caf50', margin: '8px 0' }}>
          ✅ GitHub Pages funcionando
        </p>
        <p style={{ color: '#4caf50', margin: '8px 0' }}>
          ✅ Deploy automático ativo
        </p>
      </div>

      <button 
        style={{
          marginTop: '16px',
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={() => alert('🎉 Interação funcionando perfeitamente!')}
      >
        Testar Interação
      </button>
    </div>
  );
}
