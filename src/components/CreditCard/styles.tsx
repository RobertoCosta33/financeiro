import styled from 'styled-components';
import { Card } from '@mui/material';

export const StyledCard = styled(Card)`
  min-height: 200px;
  padding: 16px;
  margin: 8px;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ProgressContainer = styled.div`
  margin-top: 16px;
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  gap: 8px;
`;

