import { FinancialData } from '../types';

const STORAGE_KEY = 'financial_data';

export const saveToLocalStorage = (data: FinancialData): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
};

export const loadFromLocalStorage = (): FinancialData => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // Corrigir dados corrompidos
        if (parsed && typeof parsed === 'object') {
          // Garantir que monthlySalary seja um número
          if (typeof parsed.monthlySalary !== 'number' || isNaN(parsed.monthlySalary)) {
            parsed.monthlySalary = 0;
          }
          
          // Garantir que balances seja um array
          if (!Array.isArray(parsed.balances)) {
            parsed.balances = [];
          }
          
          // Garantir que cada balance tenha todos os campos necessários
          if (parsed.balances) {
            parsed.balances = parsed.balances.map((balance: any) => ({
              id: balance.id || '',
              name: balance.name || '',
              amount: typeof balance.amount === 'number' && !isNaN(balance.amount) ? balance.amount : 0,
              type: balance.type || 'other',
              description: balance.description || '',
              date: balance.date || new Date().toISOString().split('T')[0],
              isRecurring: balance.isRecurring || false,
              frequency: balance.frequency || 'monthly'
            }));
          }
          
          // Garantir que cards seja um array
          if (!Array.isArray(parsed.cards)) {
            parsed.cards = [];
          }
          
          // Garantir que debts seja um array
          if (!Array.isArray(parsed.debts)) {
            parsed.debts = [];
          }
          
          // Garantir que cada debt tenha os campos de parcelas
          if (parsed.debts) {
            parsed.debts = parsed.debts.map((debt: any) => ({
              id: debt.id || '',
              cardId: debt.cardId || '',
              description: debt.description || '',
              amount: typeof debt.amount === 'number' && !isNaN(debt.amount) ? debt.amount : 0,
              date: debt.date || new Date().toISOString().split('T')[0],
              category: debt.category || '',
              isPaid: debt.isPaid || false,
              totalInstallments: typeof debt.totalInstallments === 'number' && !isNaN(debt.totalInstallments) ? debt.totalInstallments : 1,
              remainingInstallments: typeof debt.remainingInstallments === 'number' && !isNaN(debt.remainingInstallments) ? debt.remainingInstallments : 1,
              installmentValue: typeof debt.installmentValue === 'number' && !isNaN(debt.installmentValue) ? debt.installmentValue : (debt.amount || 0)
            }));
          }
          
          // Garantir que cada card tenha todos os campos necessários
          if (parsed.cards) {
            parsed.cards = parsed.cards.map((card: any) => ({
              id: card.id || '',
              name: card.name || '',
              limit: typeof card.limit === 'number' && !isNaN(card.limit) ? card.limit : 0,
              currentBalance: typeof card.currentBalance === 'number' && !isNaN(card.currentBalance) ? card.currentBalance : 0,
              weeklyLimit: (typeof card.weeklyLimit === 'number' && !isNaN(card.weeklyLimit) && card.weeklyLimit > 10) ? card.weeklyLimit : undefined,
              type: card.type || 'credit',
              color: card.color || '#1976d2',
              dueDate: typeof card.dueDate === 'number' && !isNaN(card.dueDate) ? card.dueDate : 1,
              closingDate: typeof card.closingDate === 'number' && !isNaN(card.closingDate) ? card.closingDate : 1
            }));
          }
        }
        
        return parsed;
      }
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
  
  // Retorna dados padrão se não houver dados salvos
  return {
    monthlySalary: 0,
    balances: [],
    cards: [],
    debts: [],
    incomes: [],
    expenses: [],
    budgetLimits: [],
    theme: {
      mode: 'light',
      primaryColor: '#1976d2',
      secondaryColor: '#dc004e'
    }
  };
};

export const clearLocalStorage = (): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
  }
};

export const resetToDefaultData = (): void => {
  try {
    if (typeof window !== 'undefined') {
      const defaultData: FinancialData = {
        monthlySalary: 0,
        balances: [],
        cards: [],
        debts: [],
        incomes: [],
        expenses: [],
        budgetLimits: [],
        theme: {
          mode: 'light',
          primaryColor: '#1976d2',
          secondaryColor: '#dc004e'
        }
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    }
  } catch (error) {
    console.error('Erro ao resetar dados:', error);
  }
};

