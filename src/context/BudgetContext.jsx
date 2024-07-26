
import React, { createContext, useState, useEffect } from 'react';

export const BudgetContext = createContext();

const initialBudgetData = {
  name: '',
  email: '',
  preferredCurrency: 'USD',
  monthlyIncome: '',
  expenses: [],
  savingsGoal: '',
};

export const BudgetProvider = ({ children }) => {
  const [budgetData, setBudgetData] = useState(() => {
    const savedData = localStorage.getItem('budgetData');
    return savedData ? JSON.parse(savedData) : initialBudgetData;
  });

  useEffect(() => {
    localStorage.setItem('budgetData', JSON.stringify(budgetData));
  }, [budgetData]);

  const resetBudgetData = () => {
    setBudgetData(initialBudgetData);
    localStorage.removeItem('budgetData');
  };

  return (
    <BudgetContext.Provider value={{ budgetData, setBudgetData, resetBudgetData }}>
      {children}
    </BudgetContext.Provider>
  );
};