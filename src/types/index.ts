export interface CreditCard {
  id: string;
  name: string;
  limit: number;
  currentBalance: number;
  weeklyLimit?: number;
  type: 'credit' | 'debit' | 'checking';
  color: string;
  dueDate: number;
  closingDate: number;
}

export interface Debt {
  id: string;
  cardId: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  isPaid: boolean;
  totalInstallments: number;
  remainingInstallments: number;
  installmentValue: number;
}

export interface Income {
  id: string;
  description: string;
  amount: number;
  type: 'fixed' | 'extra';
  date: string;
  category: string;
}

export interface BudgetLimit {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'weekly' | 'monthly';
  color: string;
}

export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
}

export interface Balance {
  id: string;
  name: string;
  amount: number;
  type: 'salary' | 'bonus' | 'investment' | 'other';
  description: string;
  date: string;
  isRecurring: boolean;
  frequency?: 'monthly' | 'weekly' | 'yearly';
}

export interface FinancialData {
  monthlySalary: number;
  balances: Balance[];
  cards: CreditCard[];
  debts: Debt[];
  incomes: Income[];
  expenses: BudgetLimit[];
  budgetLimits: BudgetLimit[];
  theme: Theme;
}

