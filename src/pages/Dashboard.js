import { useExpenses } from "../context/ExpenseContext";
import ExpenseCard from "../components/ExpenseCard";

function Dashboard() {
  const { expenses } = useExpenses();

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        expenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))
      )}
    </div>
  );
}

export default Dashboard;
