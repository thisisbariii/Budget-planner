// src/components/Step1UserInfo.jsx
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BudgetContext } from '../context/BudgetContext';

const Step1UserInfo = () => {
  const navigate = useNavigate();
  const { budgetData, setBudgetData, resetBudgetData } = useContext(BudgetContext);

  useEffect(() => {
    resetBudgetData();
  }, []);

  const handleChange = (e) => {
    setBudgetData({ ...budgetData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/step2');
  };

  return (
    <div className="container mt-5">
      <h2>User Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={budgetData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={budgetData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Preferred Currency</label>
          <select
            className="form-select"
            name="preferredCurrency"
            value={budgetData.preferredCurrency}
            onChange={handleChange}
            required
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Next</button>
      </form>
    </div>
  );
};

export default Step1UserInfo;