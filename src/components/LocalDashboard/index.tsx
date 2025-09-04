import React, { useState } from 'react';
import {
  Typography,
  Button,
  IconButton,
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer as MuiTableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccountBalance as AccountBalanceIcon
} from '@mui/icons-material';
import { formatCurrency } from '../../utils/calculations';

interface LocalDashboardProps {
  data: {
    balances: any[];
    cards: any[];
    debts: any[];
  };
  onUpdateData: (newData: any) => void;
}

const LocalDashboard: React.FC<LocalDashboardProps> = ({ data, onUpdateData }) => {
  const [balanceFormOpen, setBalanceFormOpen] = useState(false);

  const handleAddBalance = () => {
    // Implementar adição de saldo
    console.log('Adicionar saldo - CLICADO!');
    alert('Botão "Adicionar Saldo" foi clicado!');
  };

  const totalBalances = data.balances.reduce((sum: number, balance: any) => sum + (balance.amount || 0), 0);
  const totalDebts = data.debts.reduce((sum: number, debt: any) => sum + (debt.amount || 0), 0);
  const monthlyDebts = data.debts.reduce((sum: number, debt: any) => sum + (debt.amount || 0), 0);
  const availableBalance = totalBalances - monthlyDebts;

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 3, marginBottom: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 3, 
          flexWrap: 'wrap', 
          gap: 2 
        }}>
          <Typography variant="h5" fontWeight="bold">
            <AccountBalanceIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Controle de Saldos e Disponibilidade Mensal
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddBalance}
          >
            Adicionar Saldo
          </Button>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: 2, 
          marginBottom: 3 
        }}>
          <Box sx={{
            padding: 2,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textAlign: 'center'
          }}>
            <Typography variant="h6" fontWeight="bold">
              Total de Saldos
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {formatCurrency(totalBalances)}
            </Typography>
            <Typography variant="body2">
              {data.balances.length} saldo{data.balances.length !== 1 ? 's' : ''} cadastrado{data.balances.length !== 1 ? 's' : ''}
            </Typography>
          </Box>

          <Box sx={{
            padding: 2,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            textAlign: 'center'
          }}>
            <Typography variant="h6" fontWeight="bold">
              Dívidas Mensais
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {formatCurrency(monthlyDebts)}
            </Typography>
            <Typography variant="body2">
              {data.debts.length} dívida{data.debts.length !== 1 ? 's' : ''} pendente{data.debts.length !== 1 ? 's' : ''}
            </Typography>
          </Box>

          <Box sx={{
            padding: 2,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textAlign: 'center'
          }}>
            <Typography variant="h6" fontWeight="bold">
              Total de Dívidas
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {formatCurrency(totalDebts)}
            </Typography>
            <Typography variant="body2">
              Valor total restante
            </Typography>
          </Box>

          <Box sx={{
            padding: 2,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            textAlign: 'center'
          }}>
            <Typography variant="h6" fontWeight="bold">
              Saldo Disponível
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {formatCurrency(availableBalance)}
            </Typography>
            <Typography variant="body2">
              {availableBalance >= 0 ? 'Saldo positivo' : 'Saldo negativo'}
            </Typography>
          </Box>
        </Box>

        <MuiTableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nome</strong></TableCell>
                <TableCell><strong>Tipo</strong></TableCell>
                <TableCell><strong>Valor</strong></TableCell>
                <TableCell><strong>Data</strong></TableCell>
                <TableCell><strong>Recorrente</strong></TableCell>
                <TableCell><strong>Descrição</strong></TableCell>
                <TableCell><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.balances.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Box py={4}>
                      <Typography variant="body1" color="text.secondary">
                        Nenhum saldo cadastrado ainda.
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAddBalance}
                        sx={{ mt: 2 }}
                      >
                        Adicionar Primeiro Saldo
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </MuiTableContainer>
      </Paper>

      <Paper sx={{ padding: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 3 
        }}>
          <Typography variant="h5" fontWeight="bold">
            Controle de Dívidas por Cartão
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              console.log('Adicionar cartão - CLICADO!');
              alert('Botão "Adicionar Cartão" foi clicado!');
            }}
          >
            Adicionar Cartão
          </Button>
        </Box>
        
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Nenhum cartão cadastrado ainda.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LocalDashboard;
