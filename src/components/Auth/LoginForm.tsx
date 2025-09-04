import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const LoginForm = () => {
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login, register, loading } = useAuth();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      if (tabValue === 0) {
        // Login
        const { error } = await login(email, password);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Login realizado com sucesso!');
        }
      } else {
        // Registro
        const { error } = await register(email, password);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Conta criada com sucesso! Verifique seu email para confirmar.');
        }
      }
    } catch (err) {
      setError('Ocorreu um erro inesperado');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 0
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Entrar" />
            <Tab label="Criar Conta" />
          </Tabs>
        </Box>

        <form onSubmit={handleSubmit}>
          <TabPanel value={tabValue} index={0}>
            <Typography variant="h5" gutterBottom textAlign="center">
              Bem-vindo de volta!
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
              Entre com suas credenciais para acessar seus dados financeiros
            </Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h5" gutterBottom textAlign="center">
              Criar Nova Conta
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
              Crie sua conta para salvar seus dados na nuvem
            </Typography>
          </TabPanel>

          <Box sx={{ p: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              disabled={loading}
              helperText="Mínimo 6 caracteres"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : tabValue === 0 ? (
                'Entrar'
              ) : (
                'Criar Conta'
              )}
            </Button>

            <Typography variant="body2" color="text.secondary" textAlign="center">
              {tabValue === 0 ? (
                'Não tem uma conta? '
              ) : (
                'Já tem uma conta? '
              )}
              <Button
                variant="text"
                size="small"
                onClick={() => setTabValue(tabValue === 0 ? 1 : 0)}
                disabled={loading}
              >
                {tabValue === 0 ? 'Criar conta' : 'Fazer login'}
              </Button>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
