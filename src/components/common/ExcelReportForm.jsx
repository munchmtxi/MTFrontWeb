// C:\Users\munch\Desktop\MTFrontWeb\src\components\common\ExcelReportForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exportReport, scheduleReport } from '../../api/excelApi';
import {
  exportReportStart,
  exportReportSuccess,
  exportReportFailure,
  scheduleReportStart,
  scheduleReportSuccess,
  scheduleReportFailure,
} from '../../features/common/excelSlice';

const ExcelReportForm = () => {
  const dispatch = useDispatch();
  const { reportStatus, scheduleStatus, error } = useSelector((state) => state.excel);

  const [formData, setFormData] = useState({
    reportType: 'orders',
    dateRange: { start: '', end: '' },
    filters: {},
    frequency: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'start' || name === 'end') {
      setFormData((prev) => ({
        ...prev,
        dateRange: { ...prev.dateRange, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleExport = async (e) => {
    e.preventDefault();
    dispatch(exportReportStart());
    try {
      const { reportType, dateRange, filters } = formData;
      const blob = await exportReport({ reportType, dateRange, filters });
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${reportType}_report.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      dispatch(exportReportSuccess());
    } catch (err) {
      dispatch(exportReportFailure(err.message));
    }
  };

  const handleSchedule = async (e) => {
    e.preventDefault();
    dispatch(scheduleReportStart());
    try {
      const { reportType, frequency, email, filters } = formData;
      const response = await scheduleReport({ reportType, frequency, email, filters });
      dispatch(scheduleReportSuccess());
      alert(response.message); // Or use a toast notification
    } catch (err) {
      dispatch(scheduleReportFailure(err.message));
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Generate Excel Report</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Report Type</label>
          <select
            name="reportType"
            value={formData.reportType}
            onChange={handleChange}
            className="mt-1 block w-full border rounded p-2"
          >
            <option value="orders">Orders</option>
            <option value="drivers">Drivers</option>
            <option value="merchants">Merchants</option>
            <option value="inventory">Inventory</option>
            <option value="sales">Sales</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            name="start"
            value={formData.dateRange.start}
            onChange={handleChange}
            className="mt-1 block w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            name="end"
            value={formData.dateRange.end}
            onChange={handleChange}
            className="mt-1 block w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Frequency (for scheduling)</label>
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="mt-1 block w-full border rounded p-2"
          >
            <option value="">Select Frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Email (for scheduling)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border rounded p-2"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleExport}
            disabled={reportStatus === 'loading'}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {reportStatus === 'loading' ? 'Exporting...' : 'Export Now'}
          </button>
          <button
            type="button"
            onClick={handleSchedule}
            disabled={scheduleStatus === 'loading' || !formData.frequency || !formData.email}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {scheduleStatus === 'loading' ? 'Scheduling...' : 'Schedule Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExcelReportForm;