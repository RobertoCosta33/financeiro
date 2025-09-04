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
  StyledAppBar,
  HeaderContent,
  HeaderLeft,
  HeaderRight,
  ThemeToggle
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
      <HeaderContent>
        <HeaderLeft>
          <AccountBalance sx={{ fontSize: 32 }} />
          <Typography variant="h5" component="div" fontWeight="bold">
            Sistema Financeiro
          </Typography>
        </HeaderLeft>

        <HeaderRight>
          <ThemeToggle>
            <Typography variant="body2" color="inherit">
              {theme === 'light' ? 'Claro' : 'Escuro'}
            </Typography>
            <Tooltip title={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}>
              <IconButton
                color="inherit"
                onClick={onThemeToggle}
                size="large"
              >
                {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Tooltip>
          </ThemeToggle>

          <Tooltip title="Resetar Dados">
            <IconButton
              color="inherit"
              onClick={onResetData}
              size="large"
            >
              <Refresh />
            </IconButton>
          </Tooltip>

          <Tooltip title="Configurações">
            <IconButton
              color="inherit"
              onClick={onSettingsClick}
              size="large"
            >
              <Settings />
            </IconButton>
          </Tooltip>

          {isAuthenticated && onLogout && (
            <Tooltip title="Sair">
              <IconButton
                color="inherit"
                onClick={onLogout}
                size="large"
              >
                <Logout />
              </IconButton>
            </Tooltip>
          )}
        </HeaderRight>
      </HeaderContent>
    </StyledAppBar>
  );
};

export default Header;

