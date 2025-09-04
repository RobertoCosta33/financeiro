import { useState, useEffect } from 'react';
import { FinancialData, CreditCard, Income, Debt, BudgetLimit, Balance } from '../types';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';
import { generateId } from '../utils/calculations';
import { saveFinancialData, loadFinancialData } from '../services/supabase';
import { useAuth } from './useAuth';

export const useFinancialData = () => {
  const { user, isAuthenticated } = useAuth();
  const [data, setData] = useState<FinancialData>(() => {
    if (typeof window !== 'undefined') {
      return loadFromLocalStorage();
    }
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
  });

  // Carregar dados do Supabase quando usuário estiver autenticado
  useEffect(() => {
    const loadData = async () => {
      if (isAuthenticated && user) {
        const cloudData = await loadFinancialData(user.id);
        if (cloudData) {
          setData(cloudData);
        }
      }
    };

    loadData();
  }, [isAuthenticated, user]);

  // Salvar dados no Supabase quando autenticado, ou localStorage quando não
  useEffect(() => {
    const saveData = async () => {
      if (isAuthenticated && user) {
        await saveFinancialData(data, user.id);
      } else if (typeof window !== 'undefined') {
        saveToLocalStorage(data);
      }
    };

    saveData();
  }, [data, isAuthenticated, user]);



  const addBalance = (balance: Omit<Balance, 'id'>) => {
    setData(prev => ({
      ...prev,
      balances: [...prev.balances, { ...balance, id: generateId() }]
    }));
  };

  const updateBalance = (id: string, updates: Partial<Balance>) => {
    setData(prev => ({
      ...prev,
      balances: prev.balances.map(balance => 
        balance.id === id ? { ...balance, ...updates } : balance
      )
    }));
  };

  const deleteBalance = (id: string) => {
    setData(prev => ({
      ...prev,
      balances: prev.balances.filter(balance => balance.id !== id)
    }));
  };

  const addCard = (card: Omit<CreditCard, 'id'>) => {
    setData(prev => ({
      ...prev,
      cards: [...prev.cards, { ...card, id: generateId() }]
    }));
  };

  const updateCard = (id: string, updates: Partial<CreditCard>) => {
    setData(prev => ({
      ...prev,
      cards: prev.cards.map(card => 
        card.id === id ? { ...card, ...updates } : card
      )
    }));
  };

  const deleteCard = (id: string) => {
    setData(prev => ({
      ...prev,
      cards: prev.cards.filter(card => card.id !== id),
      debts: prev.debts.filter(debt => debt.cardId !== id)
    }));
  };

  const addDebt = (debt: Omit<Debt, 'id'>) => {
    setData(prev => ({
      ...prev,
      debts: [...prev.debts, { ...debt, id: generateId() }]
    }));
  };

  const updateDebt = (id: string, updates: Partial<Debt>) => {
    setData(prev => ({
      ...prev,
      debts: prev.debts.map(debt => 
        debt.id === id ? { ...debt, ...updates } : debt
      )
    }));
  };

  const deleteDebt = (id: string) => {
    setData(prev => ({
      ...prev,
      debts: prev.debts.filter(debt => debt.id !== id)
    }));
  };

  const addIncome = (income: Omit<Income, 'id'>) => {
    setData(prev => ({
      ...prev,
      incomes: [...prev.incomes, { ...income, id: generateId() }]
    }));
  };

  const updateIncome = (id: string, updates: Partial<Income>) => {
    setData(prev => ({
      ...prev,
      incomes: prev.incomes.map(income => 
        income.id === id ? { ...income, ...updates } : income
      )
    }));
  };

  const deleteIncome = (id: string) => {
    setData(prev => ({
      ...prev,
      incomes: prev.incomes.filter(income => income.id !== id)
    }));
  };

  const addBudgetLimit = (budgetLimit: Omit<BudgetLimit, 'id'>) => {
    setData(prev => ({
      ...prev,
      budgetLimits: [...prev.budgetLimits, { ...budgetLimit, id: generateId() }]
    }));
  };

  const updateBudgetLimit = (id: string, updates: Partial<BudgetLimit>) => {
    setData(prev => ({
      ...prev,
      budgetLimits: prev.budgetLimits.map(budgetLimit => 
        budgetLimit.id === id ? { ...budgetLimit, ...updates } : budgetLimit
      )
    }));
  };

  const deleteBudgetLimit = (id: string) => {
    setData(prev => ({
      ...prev,
      budgetLimits: prev.budgetLimits.filter(budgetLimit => budgetLimit.id !== id)
    }));
  };

  const updateTheme = (theme: Partial<FinancialData['theme']>) => {
    setData(prev => ({
      ...prev,
      theme: { ...prev.theme, ...theme }
    }));
  };

  return {
    data,
    addBalance,
    updateBalance,
    deleteBalance,
    addCard,
    updateCard,
    deleteCard,
    addDebt,
    updateDebt,
    deleteDebt,
    addIncome,
    updateIncome,
    deleteIncome,
    addBudgetLimit,
    updateBudgetLimit,
    deleteBudgetLimit,
    updateTheme
  };
};

