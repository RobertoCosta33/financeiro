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
import { Balance, Debt } from '../../types';
import { formatCurrency, calculateTotalRemainingDebts, calculateMonthlyDebts } from '../../utils/calculations';
import BalanceForm from '../BalanceForm';
import {
  StyledPaper,
  TableContainer,
  TableHeader,
  SummaryContainer,
  SummaryCard,
  SummaryCardRed,
  SummaryCardGreen
} from './styles';

interface BalanceTableProps {
  balances: Balance[];
  debts: Debt[];
  onAddBalance: (balance: Omit<Balance, 'id'>) => void;
  onUpdateBalance: (id: string, updates: Partial<Balance>) => void;
  onDeleteBalance: (id: string) => void;
}

const BalanceTable: React.FC<BalanceTableProps> = ({
  balances,
  debts,
  onAddBalance,
  onUpdateBalance,
  onDeleteBalance
}) => {
  const [balanceFormOpen, setBalanceFormOpen] = useState(false);
  const [editingBalance, setEditingBalance] = useState<Balance | null>(null);

  const handleAddBalance = (balanceData: Omit<Balance, 'id'>) => {
    if (editingBalance) {
      onUpdateBalance(editingBalance.id, balanceData);
      setEditingBalance(null);
    } else {
      onAddBalance(balanceData);
    }
    setBalanceFormOpen(false);
  };

  const handleEditBalance = (balance: Balance) => {
    setEditingBalance(balance);
    setBalanceFormOpen(true);
  };

  const handleDeleteBalance = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este saldo?')) {
      onDeleteBalance(id);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'salary': return 'Salário';
      case 'bonus': return 'Bônus';
      case 'investment': return 'Investimento';
      default: return 'Outro';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'salary': return 'primary';
      case 'bonus': return 'success';
      case 'investment': return 'warning';
      default: return 'default';
    }
  };

  const totalBalances = balances.reduce((sum, balance) => sum + balance.amount, 0);
  const totalDebts = calculateTotalRemainingDebts(debts);
  const monthlyDebts = calculateMonthlyDebts(debts);
  const availableBalance = totalBalances - monthlyDebts;

  return (
    <StyledPaper>
      <TableHeader>
        <Typography variant="h5" fontWeight="bold">
          <AccountBalanceIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Controle de Saldos e Disponibilidade Mensal
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setBalanceFormOpen(true)}
        >
          Adicionar Saldo
        </Button>
      </TableHeader>

      <SummaryContainer>
        <SummaryCard>
          <Typography variant="h6" fontWeight="bold">
            Total de Saldos
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {formatCurrency(totalBalances)}
          </Typography>
          <Typography variant="body2">
            {balances.length} saldo{balances.length !== 1 ? 's' : ''} cadastrado{balances.length !== 1 ? 's' : ''}
          </Typography>
        </SummaryCard>

        <SummaryCardRed>
          <Typography variant="h6" fontWeight="bold">
            Dívidas Mensais
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {formatCurrency(monthlyDebts)}
          </Typography>
          <Typography variant="body2">
            {debts.length} dívida{debts.length !== 1 ? 's' : ''} pendente{debts.length !== 1 ? 's' : ''}
          </Typography>
        </SummaryCardRed>

        <SummaryCard>
          <Typography variant="h6" fontWeight="bold">
            Total de Dívidas
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {formatCurrency(totalDebts)}
          </Typography>
          <Typography variant="body2">
            Valor total restante
          </Typography>
        </SummaryCard>

        <SummaryCardGreen>
          <Typography variant="h6" fontWeight="bold">
            Saldo Disponível
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {formatCurrency(availableBalance)}
          </Typography>
          <Typography variant="body2">
            {availableBalance >= 0 ? 'Saldo positivo' : 'Saldo negativo'}
          </Typography>
        </SummaryCardGreen>
      </SummaryContainer>

      <TableContainer>
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
              {balances.map((balance) => (
                <TableRow key={balance.id} hover>
                  <TableCell>
                    <Typography variant="body1" fontWeight="medium">
                      {balance.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getTypeLabel(balance.type)}
                      color={getTypeColor(balance.type) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="primary">
                      {formatCurrency(balance.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(balance.date).toLocaleDateString('pt-BR')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={balance.isRecurring ? 'Sim' : 'Não'}
                      color={balance.isRecurring ? 'success' : 'default'}
                      size="small"
                    />
                    {balance.isRecurring && balance.frequency && (
                      <Typography variant="caption" display="block" color="text.secondary">
                        {balance.frequency === 'weekly' ? 'Semanal' : 
                         balance.frequency === 'monthly' ? 'Mensal' : 'Anual'}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {balance.description || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleEditBalance(balance)}
                        color="primary"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteBalance(balance.id)}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {balances.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Box py={4}>
                      <Typography variant="body1" color="text.secondary">
                        Nenhum saldo cadastrado ainda.
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => setBalanceFormOpen(true)}
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
      </TableContainer>

      <BalanceForm
        open={balanceFormOpen}
        onClose={() => {
          setBalanceFormOpen(false);
          setEditingBalance(null);
        }}
        onSubmit={handleAddBalance}
        balance={editingBalance}
      />
    </StyledPaper>
  );
};

export default BalanceTable;
