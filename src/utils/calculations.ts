import { BudgetLimit, CreditCard, Debt } from '../types';

export const calculateBudgetPercentage = (limit: number, spent: number): number => {
  if (limit === 0) return 0;
  return (spent / limit) * 100;
};

export const getBudgetColor = (percentage: number): string => {
  if (percentage >= 100) return '#f44336'; // Vermelho
  if (percentage >= 75) return '#ff9800'; // Laranja
  if (percentage >= 50) return '#ffeb3b'; // Amarelo
  return '#4caf50'; // Verde
};

export const calculateWeeklyLimit = (monthlyLimit: number): number => {
  return monthlyLimit / 4.33; // Média de semanas por mês
};

export const getCurrentWeekExpenses = (debts: Debt[], cardId: string): number => {
  const now = new Date();
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
  const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);

  return debts
    .filter(debt => {
      const debtDate = new Date(debt.date);
      return debt.cardId === cardId && 
             debtDate >= startOfWeek && 
             debtDate <= endOfWeek;
    })
    .reduce((total, debt) => total + debt.amount, 0);
};

export const getCurrentMonthExpenses = (debts: Debt[], cardId: string): number => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return debts
    .filter(debt => {
      const debtDate = new Date(debt.date);
      return debt.cardId === cardId && 
             debtDate >= startOfMonth && 
             debtDate <= endOfMonth;
    })
    .reduce((total, debt) => total + debt.amount, 0);
};

export const calculateCardUtilization = (card: CreditCard, totalDebts: number): number => {
  if (!card.limit || card.limit === 0) return 0;
  return (totalDebts / card.limit) * 100;
};

export const formatCurrency = (value: number): string => {
  if (isNaN(value) || value === undefined || value === null) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(0);
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const calculateRemainingDebt = (debt: any): number => {
  if (!debt.remainingInstallments || !debt.installmentValue) {
    return debt.amount || 0;
  }
  return debt.remainingInstallments * debt.installmentValue;
};

export const calculateTotalRemainingDebts = (debts: any[]): number => {
  return debts.reduce((total, debt) => {
    return total + calculateRemainingDebt(debt);
  }, 0);
};

export const calculateMonthlyDebts = (debts: any[]): number => {
  return debts.reduce((total, debt) => {
    // Se a dívida tem parcelas, considera apenas o valor da parcela
    if (debt.installmentValue && debt.installmentValue > 0) {
      return total + debt.installmentValue;
    }
    // Se não tem parcelas, considera o valor total da dívida
    return total + (debt.amount || 0);
  }, 0);
};

