import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import './TransactionForm.css';

const TransactionForm = ({ currentUser }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const [errors, setErrors] = useState({});

  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Business', 'Gift', 'Misc'];
  const expenseCategories = ['Food', 'Transport', 'Bills', 'Rent', 'Entertainment', 'Shopping', 'Healthcare', 'Education', 'Misc'];

  useEffect(() => {
    if (isEditing) {
      loadTransaction();
    }
  }, [id]);

  const loadTransaction = () => {
    const transactions = JSON.parse(localStorage.getItem(`transactions_${currentUser.id}`) || '[]');
    const transaction = transactions.find(t => t.id === id);
    
    if (transaction) {
      setFormData({
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
        date: transaction.date,
        description: transaction.description || ''
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const transactions = JSON.parse(localStorage.getItem(`transactions_${currentUser.id}`) || '[]');

    if (isEditing) {
      // Update existing transaction
      const updatedTransactions = transactions.map(t => 
        t.id === id ? { ...t, ...formData } : t
      );
      localStorage.setItem(`transactions_${currentUser.id}`, JSON.stringify(updatedTransactions));
    } else {
      // Add new transaction
      const newTransaction = {
        id: Date.now().toString(),
        ...formData,
        userId: currentUser.id,
        createdAt: new Date().toISOString()
      };
      
      transactions.push(newTransaction);
      localStorage.setItem(`transactions_${currentUser.id}`, JSON.stringify(transactions));
    }

    navigate('/transactions');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      const transactions = JSON.parse(localStorage.getItem(`transactions_${currentUser.id}`) || '[]');
      const updatedTransactions = transactions.filter(t => t.id !== id);
      localStorage.setItem(`transactions_${currentUser.id}`, JSON.stringify(updatedTransactions));
      navigate('/transactions');
    }
  };

  const getCategories = () => {
    return formData.type === 'income' ? incomeCategories : expenseCategories;
  };

  return (
    <div className="transaction-form-container">
      <div className="form-header">
        <button onClick={() => navigate('/transactions')} className="back-button">
          <ArrowLeft size={20} />
          Back
        </button>
        <h1>{isEditing ? 'Edit Transaction' : 'Add New Transaction'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amount">Amount *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              placeholder="0.00"
              className={errors.amount ? 'error' : ''}
            />
            {errors.amount && <span className="error-message">{errors.amount}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="type">Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select a category</option>
              {getCategories().map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add a description or notes about this transaction..."
            rows="3"
          />
        </div>

        <div className="form-actions">
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              className="delete-button"
            >
              <Trash2 size={16} />
              Delete Transaction
            </button>
          )}
          
          <button type="submit" className="save-button">
            <Save size={16} />
            {isEditing ? 'Update Transaction' : 'Save Transaction'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm; 