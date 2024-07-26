
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BudgetContext } from '../context/BudgetContext';

const Step4ReviewSave = () => {
  const navigate = useNavigate();
  const { budgetData } = useContext(BudgetContext);

  const handleSave = () => {
    alert('Budget data saved successfully!');
    navigate('/');
  };

  const calculateTotalExpenses = () => {
    return budgetData.expenses.reduce((total, expense) => total + (parseFloat(expense.amount) || 0), 0);
  };

  const totalExpenses = calculateTotalExpenses();
  const remainingBudget = parseFloat(budgetData.monthlyIncome) - totalExpenses;

  return (
    <div className="container mt-5">
      <h2>Review and Save</h2>
      <div className="mb-3">
        <h4>User Information</h4>
        <p>Name: {budgetData.name}</p>
        <p>Email: {budgetData.email}</p>
        <p>Preferred Currency: {budgetData.preferredCurrency}</p>
      </div>
      <div className="mb-3">
        <h4>Budget Summary</h4>
        <p>Monthly Income: ${parseFloat(budgetData.monthlyIncome).toFixed(2)}</p>
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p>Remaining Budget: ${remainingBudget.toFixed(2)}</p>
        <p>Savings Goal: ${parseFloat(budgetData.savingsGoal).toFixed(2)}</p>
      </div>
      <div className="mb-3">
        <h4>Expenses</h4>
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
      </div>
      <div className="d-flex justify-content-between mt-4">
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/step3')}>Previous</button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default Step4ReviewSave;