import { useExpenses } from "../context/ExpenseContext";
import { calculateDebts } from "../utils/calculateDebts";

function Reports() {
  const { expenses } = useExpenses();
  const debts = calculateDebts(expenses);

  return (
    <div className="container mt-5">
      <h2>Reports</h2>
      {debts.length === 0 ? (
        <p>No debts to settle.</p>
      ) : (
        <ul className="list-group">
          {debts.map((debt, index) => (
            <li key={index} className="list-group-item">
              {debt.debtor} owes {debt.creditor} ${debt.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reports;
