import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import './dashboard.css';

const Dashboard = ({ currentUser }) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    avgIncome: 0,
    avgExpenses: 0
  });

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    calculateSummary();
  }, [transactions]);

  const loadTransactions = () => {
    const userTransactions = JSON.parse(localStorage.getItem(`transactions_${currentUser.id}`) || '[]');
    setTransactions(userTransactions);
  };

  const calculateSummary = () => {
    const income = transactions.filter(t => t.type === 'income');
    const expenses = transactions.filter(t => t.type === 'expense');

    const totalIncome = income.reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const totalExpenses = expenses.reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const balance = totalIncome - totalExpenses;

    // Calculate monthly averages
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyIncome = income.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });
    
    const monthlyExpenses = expenses.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const avgIncome = monthlyIncome.length > 0 ? 
      monthlyIncome.reduce((sum, t) => sum + parseFloat(t.amount), 0) / monthlyIncome.length : 0;
    const avgExpenses = monthlyExpenses.length > 0 ? 
      monthlyExpenses.reduce((sum, t) => sum + parseFloat(t.amount), 0) / monthlyExpenses.length : 0;

    setSummary({
      totalIncome,
      totalExpenses,
      balance,
      avgIncome,
      avgExpenses
    });
  };

  const getChartData = () => {
    const categoryData = {};
    
    transactions.forEach(transaction => {
      const category = transaction.category;
      if (!categoryData[category]) {
        categoryData[category] = 0;
      }
      categoryData[category] += parseFloat(transaction.amount);
    });

    return Object.entries(categoryData).map(([category, amount]) => ({
      category,
      amount
    }));
  };

  const getMonthlyData = () => {
    const monthlyData = {};
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { income: 0, expenses: 0 };
      }
      
      if (transaction.type === 'income') {
        monthlyData[monthYear].income += parseFloat(transaction.amount);
      } else {
        monthlyData[monthYear].expenses += parseFloat(transaction.amount);
      }
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses
    }));
  };

  const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899'];

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 >Dashboard</h1>
        <Link to="/add-transaction" className="add-transaction-btn">
          <Plus size={20} />
          Add Transaction
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card income">
          <div className="card-icon">
            <TrendingUp size={24} />
          </div>
          <div className="card-content">
            <h3>Total Income</h3>
            <p className="amount">${summary.totalIncome.toFixed(2)}</p>
            <small>Avg: ${summary.avgIncome.toFixed(2)}/month</small>
          </div>
        </div>

        <div className="summary-card expense">
          <div className="card-icon">
            <TrendingDown size={24} />
          </div>
          <div className="card-content">
            <h3>Total Expenses</h3>
            <p className="amount">${summary.totalExpenses.toFixed(2)}</p>
            <small>Avg: ${summary.avgExpenses.toFixed(2)}/month</small>
          </div>
        </div>

        <div className="summary-card balance">
          <div className="card-icon">
            <DollarSign size={24} />
          </div>
          <div className="card-content">
            <h3>Current Balance</h3>
            <p className={`amount ${summary.balance >= 0 ? 'positive' : 'negative'}`}>
              ${summary.balance.toFixed(2)}
            </p>
            <small>Net position</small>
          </div>
        </div>
      </div>

      {/* Charts Section */}
<div className="charts-section">
  {/* Monthly Overview Bar Chart */}
  <div className="chart-container">
    <h3>Monthly Overview</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={getMonthlyData()}>
        <defs>
          {/* Green gradient for income */}
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={1} />
          </linearGradient>

          {/* Red gradient for expenses */}
          <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f87171" stopOpacity={1} />
            <stop offset="100%" stopColor="#ef4444" stopOpacity={1} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="income" fill="url(#incomeGradient)" name="Income" />
        <Bar dataKey="expenses" fill="url(#expensesGradient)" name="Expenses" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Expense Categories Pie Chart */}
  <div className="chart-container">
    <h3>Expense Categories</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <defs>
          {/* Create multiple gradients dynamically based on COLORS */}
          {COLORS.map((color, index) => (
            <linearGradient id={`pieGradient-${index}`} key={index} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.8} />
              <stop offset="100%" stopColor={color} stopOpacity={1} />
            </linearGradient>
          ))}
        </defs>

        <Pie
          data={getChartData()}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          dataKey="amount"
        >
          {getChartData().map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`url(#pieGradient-${index % COLORS.length})`} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>

      {/* Recent Transactions */}
      <div className="recent-transactions">
        <div className="section-header">
          <h3>Recent Transactions</h3>
          <Link to="/transactions" className="view-all-link">View All</Link>
        </div>
        
        {recentTransactions.length === 0 ? (
          <div className="empty-state">
            <Calendar size={48} />
            <p>No transactions yet</p>
            <Link to="/add-transaction" className="add-first-btn">Add your first transaction</Link>
          </div>
        ) : (
          <div className="transactions-list">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <h4>{transaction.description || transaction.category}</h4>
                  <p className="transaction-category">{transaction.category}</p>
                  <p className="transaction-date">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}${parseFloat(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 