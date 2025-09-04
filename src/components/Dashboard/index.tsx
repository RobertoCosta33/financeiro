import React from 'react';
import { Container } from '@mui/material';
import { useFinancialData } from '../../hooks/useFinancialData';
import BalanceTable from '../BalanceTable';
import DebtsTable from '../DebtsTable';
import { StyledContainer } from './styles';

const Dashboard: React.FC = () => {
  const {
    data,
    addBalance,
    updateBalance,
    deleteBalance,
    addCard,
    updateCard,
    deleteCard,
    addDebt,
    updateDebt,
    deleteDebt
  } = useFinancialData();

  return (
    <StyledContainer maxWidth="xl">
      <DebtsTable
        cards={data.cards}
        debts={data.debts}
        onAddCard={addCard}
        onUpdateCard={updateCard}
        onDeleteCard={deleteCard}
        onAddDebt={addDebt}
        onUpdateDebt={updateDebt}
        onDeleteDebt={deleteDebt}
      />
    </StyledContainer>
  );
};

export default Dashboard;
