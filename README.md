# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.<img width="1174" height="793" alt="Screenshot 2025-08-08 142656" src="https://github.com/user-attachments/assets/e9b67838-7b52-4be9-ae87-7ffe021ea771" />
<img width="1134" height="822" alt="Screenshot 2025-08-08 142644" src="https://github.com/user-attachments/assets/ce8fd28d-2b6c-4b10-aacc-89cd00181c6b" />
<img width="1155" height="791" alt="Screenshot 2025-08-08 142627" src="https://github.com/user-attachments/assets/6d6222b0-7ebb-4703-9008-6b1a87ffe77d" />
<img width="1177" height="775" alt="Screenshot 2025-08-08 142612" src="https://github.com/user-attachments/assets/34a122ac-98ac-48a8-aa2c-14e8a626bf54" />
<img width="1142" height="848" alt="Screenshot 2025-08-08 142547" src="https://github.com/user-attachments/assets/06fc1172-5a50-44ea-9e50-fdd4cc9e3ded" />


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

  [Click here to view the live project](https://f-tracker-wof.vercel.app/)


## 🚀 Installation & Setup

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd front-end
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

## 📱 Usage Guide

### Getting Started
1. **Register a new account** or **login** with existing credentials
2. **Navigate to Dashboard** to view your financial overview
3. **Add your first transaction** using the "Add Transaction" button

### Adding Transactions
1. Click "Add Transaction" from any page
2. Fill in the required fields:
   - **Amount**: Enter the transaction amount
   - **Type**: Select Income or Expense
   - **Category**: Choose from predefined categories
   - **Date**: Select the transaction date
   - **Description**: Add optional notes
3. Click "Save Transaction"

### Managing Transactions
- **View All**: Navigate to "Transactions" to see all records
- **Filter**: Use the filter panel to find specific transactions
- **Sort**: Click column headers to sort by different criteria
- **Edit**: Click the edit icon to modify a transaction
- **Delete**: Click the delete icon to remove a transaction

### Dashboard Features
- **Summary Cards**: Quick overview of your financial status
- **Charts**: Visual representation of your spending patterns
- **Recent Activity**: Latest transactions for quick reference
