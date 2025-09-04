import styled from 'styled-components';
import { AppBar } from '@mui/material';

export const StyledAppBar = styled(AppBar)`
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ThemeToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

