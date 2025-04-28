function ExpenseCard({ expense }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{expense.description}</h5>
        <p className="card-text"> Total: ${expense.totalAmount}</p>
        <p className="card-text"> Date:{expense.date}</p>
        <p className="card-text">Settled: {expense.settled ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}
export default ExpenseCard;
