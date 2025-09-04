import styled from 'styled-components';
import { Paper, Table } from '@mui/material';

export const StyledPaper = styled(Paper)`
  width: 100%;
  overflow: auto;
  margin-top: 16px;
`;

export const StyledTable = styled(Table)`
  min-width: 650px;
`;

export const TableContainer = styled.div`
  margin-top: 24px;
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const CardColumn = styled.div`
  min-width: 200px;
  border-right: 1px solid #e0e0e0;
  padding: 8px;
  
  &:last-child {
    border-right: none;
  }
`;

export const CardHeader = styled.div`
  background: linear-gradient(135deg, ${props => props.color || '#1976d2'} 0%, ${props => props.color || '#42a5f5'} 100%);
  color: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  text-align: center;
`;

export const DebtRow = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  padding: 8px 0;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const DebtCell = styled.div`
  min-width: 200px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AddCardButton = styled.div`
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #1976d2;
    background-color: rgba(25, 118, 210, 0.04);
  }
`;
