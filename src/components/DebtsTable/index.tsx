import React, { useState } from 'react';
import {
  Typography,
  Button,
  IconButton,
  Chip,
  Box,
  LinearProgress,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AddCard as AddCardIcon
} from '@mui/icons-material';
import { CreditCard, Debt } from '../../types';
import { formatCurrency, calculateCardUtilization, getBudgetColor, calculateRemainingDebt } from '../../utils/calculations';
import CardForm from '../CardForm';
import DebtForm from '../DebtForm';
import {
  TableContainer,
  TableHeader,
  CardColumn,
  CardHeader,
  DebtRow,
  DebtCell,
  AddCardButton
} from './styles';

interface DebtsTableProps {
  cards: CreditCard[];
  debts: Debt[];
  onAddCard: (card: Omit<CreditCard, 'id'>) => void;
  onUpdateCard: (id: string, updates: Partial<CreditCard>) => void;
  onDeleteCard: (id: string) => void;
  onAddDebt: (debt: Omit<Debt, 'id'>) => void;
  onUpdateDebt: (id: string, updates: Partial<Debt>) => void;
  onDeleteDebt: (id: string) => void;
}

const DebtsTable: React.FC<DebtsTableProps> = ({
  cards,
  debts,
  onAddCard,
  onUpdateCard,
  onDeleteCard,
  onAddDebt,
  onUpdateDebt,
  onDeleteDebt
}) => {
  const [cardFormOpen, setCardFormOpen] = useState(false);
  const [debtFormOpen, setDebtFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CreditCard | null>(null);
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const handleAddCard = (cardData: Omit<CreditCard, 'id'>) => {
    if (editingCard) {
      onUpdateCard(editingCard.id, cardData);
      setEditingCard(null);
    } else {
      onAddCard(cardData);
    }
    setCardFormOpen(false);
  };

  const handleAddDebt = (debtData: Omit<Debt, 'id'>) => {
    if (editingDebt) {
      onUpdateDebt(editingDebt.id, debtData);
      setEditingDebt(null);
    } else {
      onAddDebt(debtData);
    }
    setDebtFormOpen(false);
  };

  const handleEditCard = (card: CreditCard) => {
    setEditingCard(card);
    setCardFormOpen(true);
  };

  const handleEditDebt = (debt: Debt) => {
    setEditingDebt(debt);
    setDebtFormOpen(true);
  };

  const handleDeleteCard = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cartão e todas as suas dívidas?')) {
      onDeleteCard(id);
    }
  };

  const handleDeleteDebt = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta dívida?')) {
      onDeleteDebt(id);
    }
  };

  const getCardDebts = (cardId: string) => {
    return (debts || []).filter(debt => debt.cardId === cardId);
  };

  const getCardTotal = (cardId: string) => {
    return getCardDebts(cardId).reduce((sum, debt) => sum + calculateRemainingDebt(debt), 0);
  };

  const getCardWeeklySpent = (cardId: string) => {
    const card = (cards || []).find(c => c.id === cardId);
    if (!card) return 0;
    
    const now = new Date();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);

    return getCardDebts(cardId)
      .filter(debt => {
        const debtDate = new Date(debt.date);
        return debtDate >= startOfWeek && debtDate <= endOfWeek;
      })
      .reduce((sum, debt) => sum + debt.amount, 0);
  };

  return (
    <TableContainer>
      <TableHeader>
        <Typography variant="h5" fontWeight="bold">
          Controle de Dívidas por Cartão
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCardIcon />}
          onClick={() => setCardFormOpen(true)}
        >
          Adicionar Cartão
        </Button>
      </TableHeader>

             <Box display="flex" overflow="auto" gap={0}>
         {(cards || []).map((card) => {
          const cardDebts = getCardDebts(card.id);
          const cardTotal = getCardTotal(card.id);
          const cardWeeklySpent = getCardWeeklySpent(card.id);
          const utilization = calculateCardUtilization(card, cardTotal);
                     const weeklyUtilization = (card.weeklyLimit && card.weeklyLimit > 10) ? (cardWeeklySpent / card.weeklyLimit) * 100 : 0;

          return (
            <CardColumn key={card.id}>
              <CardHeader color={card.color}>
                <Typography variant="h6" fontWeight="bold">
                  {card.name}
                </Typography>
                <Typography variant="body2">
                  {card.type === 'credit' ? 'Crédito' : card.type === 'debit' ? 'Débito' : 'Conta'}
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <IconButton
                    size="small"
                    onClick={() => handleEditCard(card)}
                    sx={{ color: 'white' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteCard(card.id)}
                    sx={{ color: 'white' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardHeader>

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Limite: {formatCurrency(card.limit)}
                </Typography>
                                 <Typography variant="body2" color="text.secondary">
                   Saldo: {formatCurrency(cardTotal)} (restante)
                 </Typography>
                <Typography variant="body2" color="text.secondary">
                  Disponível: {formatCurrency(card.limit - cardTotal)}
                </Typography>
                <Box mt={1}>
                  <Typography variant="caption" color="text.secondary">
                    Utilização: {utilization.toFixed(1)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(utilization, 100)}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getBudgetColor(utilization),
                      }
                    }}
                  />
                </Box>
              </Box>

                             {card.weeklyLimit && card.weeklyLimit > 10 && (
                 <Box mb={2}>
                   <Typography variant="body2" color="text.secondary">
                     Limite Semanal: {formatCurrency(card.weeklyLimit)}
                   </Typography>
                   <Typography variant="body2" color="text.secondary">
                     Gasto Semanal: {formatCurrency(cardWeeklySpent)}
                   </Typography>
                   <Box mt={1}>
                     <Typography variant="caption" color="text.secondary">
                       Semanal: {weeklyUtilization.toFixed(1)}%
                     </Typography>
                     <LinearProgress
                       variant="determinate"
                       value={Math.min(weeklyUtilization, 100)}
                       sx={{
                         height: 4,
                         borderRadius: 2,
                         backgroundColor: 'rgba(0,0,0,0.1)',
                         '& .MuiLinearProgress-bar': {
                           backgroundColor: getBudgetColor(weeklyUtilization),
                         }
                       }}
                     />
                   </Box>
                 </Box>
               )}

              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => {
                  setSelectedCardId(card.id);
                  setDebtFormOpen(true);
                }}
                fullWidth
                sx={{ mb: 2 }}
              >
                Adicionar Dívida
              </Button>

              <Box>
                <Typography variant="body2" fontWeight="bold" mb={1}>
                  Dívidas ({cardDebts.length})
                </Typography>
                {cardDebts.map((debt) => (
                  <Box
                    key={debt.id}
                    p={1}
                    mb={1}
                    border="1px solid #e0e0e0"
                    borderRadius={1}
                    bgcolor={debt.isPaid ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" fontWeight="bold">
                        {debt.description}
                      </Typography>
                      <Chip
                        label={debt.isPaid ? 'Pago' : 'Pendente'}
                        size="small"
                        color={debt.isPaid ? 'success' : 'error'}
                      />
                    </Box>
                                         <Typography variant="body2" color="text.secondary">
                       {formatCurrency(debt.amount)}
                     </Typography>
                     <Typography variant="caption" color="text.secondary">
                       {new Date(debt.date).toLocaleDateString('pt-BR')}
                     </Typography>
                     <Typography variant="caption" color="text.secondary">
                       Parcelas: {debt.remainingInstallments}/{debt.totalInstallments} 
                       ({formatCurrency(debt.installmentValue)} cada)
                     </Typography>
                    <Box display="flex" gap={1} mt={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleEditDebt(debt)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteDebt(debt.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardColumn>
          );
        })}

        <AddCardButton onClick={() => setCardFormOpen(true)}>
          <Box textAlign="center">
            <AddCardIcon sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Adicionar Cartão
            </Typography>
          </Box>
        </AddCardButton>
      </Box>

      <CardForm
        open={cardFormOpen}
        onClose={() => {
          setCardFormOpen(false);
          setEditingCard(null);
        }}
        onSubmit={handleAddCard}
        card={editingCard}
      />

      <DebtForm
        open={debtFormOpen}
        onClose={() => {
          setDebtFormOpen(false);
          setEditingDebt(null);
          setSelectedCardId(null);
        }}
        onSubmit={handleAddDebt}
        debt={editingDebt}
        selectedCardId={selectedCardId}
        cards={cards}
      />
    </TableContainer>
  );
};

export default DebtsTable;
