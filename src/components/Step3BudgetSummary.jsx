
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BudgetContext } from '../context/BudgetContext';
import useCurrencyConversion from '../hooks/useCurrencyConversion';

const Step3BudgetSummary = () => {
  const navigate = useNavigate();
  const { budgetData } = useContext(BudgetContext);
  const [isLoading, setIsLoading] = useState(true);

  const calculateTotalExpenses = () => {
    return budgetData.expenses.reduce((total, expense) => total + (parseFloat(expense.amount) || 0), 0);
  };

  const monthlyIncome = parseFloat(budgetData.monthlyIncome) || 0;
  const totalExpenses = calculateTotalExpenses();
  const remainingBudget = monthlyIncome - totalExpenses;
  const savingsGoal = parseFloat(budgetData.savingsGoal) || 0;

  const convertedIncome = useCurrencyConversion(monthlyIncome, 'USD', budgetData.preferredCurrency);
  const convertedExpenses = useCurrencyConversion(totalExpenses, 'USD', budgetData.preferredCurrency);
  const convertedRemaining = useCurrencyConversion(remainingBudget, 'USD', budgetData.preferredCurrency);
  const convertedSavingsGoal = useCurrencyConversion(savingsGoal, 'USD', budgetData.preferredCurrency);

  useEffect(() => {
    if (convertedIncome !== null && convertedExpenses !== null && convertedRemaining !== null && convertedSavingsGoal !== null) {
      setIsLoading(false);
    }
  }, [convertedIncome, convertedExpenses, convertedRemaining, convertedSavingsGoal]);

  return (
    <div className="container mt-5">
      <h2>Budget Summary</h2>
      {isLoading ? (
        <div>Loading currency conversions...</div>
      ) : (
        <>
          <div className="mb-3">
            <h4>Total Income</h4>
            <p>${monthlyIncome.toFixed(2)} USD ({convertedIncome} {budgetData.preferredCurrency})</p>
          </div>
          <div className="mb-3">
            <h4>Total Expenses</h4>
            <p>${totalExpenses.toFixed(2)} USD ({convertedExpenses} {budgetData.preferredCurrency})</p>
          </div>
          <div className="mb-3">
            <h4>Remaining Budget</h4>
            <p>${remainingBudget.toFixed(2)} USD ({convertedRemaining} {budgetData.preferredCurrency})</p>
          </div>
          <div className="mb-3">
            <h4>Savings Goal</h4>
            <p>${savingsGoal.toFixed(2)} USD ({convertedSavingsGoal} {budgetData.preferredCurrency})</p>
          </div>
          <h4>Expense Breakdown</h4>
          {budgetData.expenses.length > 0 ? (
            <ul className="list-group">
              {budgetData.expenses.map((expense, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {expense.name}
                  <span className="badge bg-primary rounded-pill">${parseFloat(expense.amount).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No expenses added</p>
          )}
          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/step2')}>Previous</button>
            <button type="button" className="btn btn-primary" onClick={() => navigate('/step4')}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Step3BudgetSummary;