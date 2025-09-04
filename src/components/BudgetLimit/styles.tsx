import styled from 'styled-components';
import { Card } from '@mui/material';

export const StyledCard = styled(Card)`
  min-height: 150px;
  padding: 16px;
  margin: 8px;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

export const BudgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const BudgetContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ProgressContainer = styled.div`
  margin-top: 16px;
`;

export const BudgetActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  gap: 8px;
`;

