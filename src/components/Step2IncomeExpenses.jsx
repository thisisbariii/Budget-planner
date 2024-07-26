// src/components/Step2IncomeExpenses.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BudgetContext } from '../context/BudgetContext';

const Step2IncomeExpenses = () => {
  const navigate = useNavigate();
  const { budgetData, setBudgetData } = useContext(BudgetContext);

  const handleChange = (e) => {
    setBudgetData({ ...budgetData, [e.target.name]: e.target.value });
  };

  const handleExpenseChange = (index, e) => {
    const newExpenses = [...budgetData.expenses];
    newExpenses[index][e.target.name] = e.target.value;
    setBudgetData({ ...budgetData, expenses: newExpenses });
  };

  const addExpense = () => {
    setBudgetData({
      ...budgetData,
      expenses: [...budgetData.expenses, { name: '', amount: '' }]
    });
  };

  const removeExpense = (index) => {
    const newExpenses = budgetData.expenses.filter((_, i) => i !== index);
    setBudgetData({ ...budgetData, expenses: newExpenses });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/step3');
  };

  return (
    <div className="container mt-5">
      <h2>Income and Expenses</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Monthly Income</label>
          <input
            type="number"
            className="form-control"
            name="monthlyIncome"
            value={budgetData.monthlyIncome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Savings Goal</label>
          <input
            type="number"
            className="form-control"
            name="savingsGoal"
            value={budgetData.savingsGoal}
            onChange={handleChange}
            required
          />
        </div>
        <h4>Expenses</h4>
        {budgetData.expenses.map((expense, index) => (
          <div key={index} className="mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Expense name"
                name="name"
                value={expense.name}
                onChange={(e) => handleExpenseChange(index, e)}
                required
              />
              <input
                type="number"
                className="form-control"
                placeholder="Amount"
                name="amount"
                value={expense.amount}
                onChange={(e) => handleExpenseChange(index, e)}
                required
              />
              <button type="button" className="btn btn-danger" onClick={() => removeExpense(index)}>Remove</button>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={addExpense}>Add Expense</button>
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/step1')}>Previous</button>
          <button type="submit" className="btn btn-primary">Next</button>
        </div>
      </form>
    </div>
  );
};

export default Step2IncomeExpenses;