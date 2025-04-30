import mockData from "../data/mockData";

export function calculateDebts(expenses) {
  const balances = {};
  mockData.users.forEach((user) => {
    balances[user.id] = 0;
  });

  expenses.forEach((expense) => {
    if (!expense.settled) {
      expense.participants.forEach((participant) => {
        const { userId, orderedAmount, paidAmount } = participant;
        balances[userId] += paidAmount - orderedAmount;
      });
    }
  });

  const debts = [];
  const users = mockData.users;

  Object.keys(balances).forEach((debtorID) => {
    const debtorBalance = balances[debtorID];
    if (debtorBalance < 0) {
      Object.keys(balances).forEach((creditorID) => {
        if (debtorID !== creditorID && balances[creditorID] > 0) {
          const amount = Math.min(-debtorBalance, balances[creditorID]);
          if (amount > 0) {
            const debtor = users.find((u) => u.id === Number(debtorID));
            const creditor = users.find((u) => u.id === Number(creditorID));
            debts.push({
              debtor: debtor.name,
              creditor: creditor.name,
              amount,
            });
            balances[debtorID] += amount;
            balances[creditorID] += amount;
          }
        }
      });
    }
  });
  return debts;
}
