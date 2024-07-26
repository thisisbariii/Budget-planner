
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BudgetProvider } from './context/BudgetContext';
import Step1UserInfo from './components/Step1UserInfo';
import Step2IncomeExpenses from './components/Step2IncomeExpenses';
import Step3BudgetSummary from './components/Step3BudgetSummary';
import Step4ReviewSave from './components/Step4ReviewSave';

function App() {
  return (
    <BudgetProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Step1UserInfo />} />
            <Route path="/step2" element={<Step2IncomeExpenses />} />
            <Route path="/step3" element={<Step3BudgetSummary />} />
            <Route path="/step4" element={<Step4ReviewSave />} />
          </Routes>
        </div>
      </Router>
    </BudgetProvider>
  );
}

export default App;