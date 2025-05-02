import { useExpenses } from "../context/ExpenseContext";
function ExpenseCard({ expense }) {
  const { settleExpense } = useExpenses();

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{expense.decription}</h5>
        <p className="card-text">Total: ${expense.totalAmount}</p>
        <p className="card-text">Date: {expense.date}</p>
        <p className="card-text">Settled: {expense.settled ? "Yes" : "No"}</p>
        {!expense.settled && (
          <button
            className="btn btn-success"
            onClick={() => settleExpense(expense.id)}
          >
            Settle
          </button>
        )}
      </div>
    </div>
  );
}
export default ExpenseCard;
