import React from 'react';
import {
  Typography,
  IconButton,
  Tooltip,
  Box
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  AccountBalance,
  Settings,
  Refresh,
  Logout
} from '@mui/icons-material';
import {
  StyledAppBar
} from './styles';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onSettingsClick: () => void;
  onResetData: () => void;
  onLogout?: () => void;
  isAuthenticated?: boolean;
}

const Header: React.FC<HeaderProps> = ({ theme, onThemeToggle, onSettingsClick, onResetData, onLogout, isAuthenticated }) => {
  return (
    <StyledAppBar position="static" elevation={0}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '0 24px', 
        height: '56px' 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AccountBalance sx={{ fontSize: 28 }} />
          <Typography variant="h6" component="div" fontWeight="bold">
            Sistema Financeiro
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" color="inherit" sx={{ mr: 0.5 }}>
            {theme === 'light' ? 'Claro' : 'Escuro'}
          </Typography>
          <Tooltip title={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}>
            <IconButton
              color="inherit"
              onClick={onThemeToggle}
              size="small"
            >
              {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Resetar Dados">
            <IconButton
              color="inherit"
              onClick={onResetData}
              size="small"
            >
              <Refresh />
            </IconButton>
          </Tooltip>

          <Tooltip title="Configurações">
            <IconButton
              color="inherit"
              onClick={onSettingsClick}
              size="small"
            >
              <Settings />
            </IconButton>
          </Tooltip>

          {isAuthenticated && onLogout && (
            <Tooltip title="Sair">
              <IconButton
                color="inherit"
                onClick={onLogout}
                size="small"
              >
                <Logout />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </StyledAppBar>
  );
};

export default Header;

