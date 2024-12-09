import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ReportForm from './components/forms/ReportForm';
import QuestionnaireForm from './components/forms/QuestionnaireForm';
import StakeholderForm from './components/stakeholders/StakeholderForm';
import ReportList from './components/reports/ReportList';
import ReportDetails from './components/reports/ReportDetails';
import UNReviewList from './components/un-review/UNReviewList';
import UNReviewDetails from './components/un-review/UNReviewDetails';
import UNQuestionForm from './components/un-review/UNQuestionForm';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit-report" element={<ReportForm />} />
        <Route path="/reports" element={<ReportList />} />
        <Route path="/reports/:id" element={<ReportDetails />} />
        <Route path="/questionnaire" element={<QuestionnaireForm />} />
        <Route path="/stakeholders" element={<StakeholderForm />} />
        <Route path="/un-review" element={<UNReviewList />} />
        <Route path="/un-review/:id" element={<UNReviewDetails />} />
        <Route path="/un-review/new" element={<UNQuestionForm />} />
      </Routes>
    </Layout>
  );
}

export default App;