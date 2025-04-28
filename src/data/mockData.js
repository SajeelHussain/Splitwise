const mockData = {
  users: [
    { id: 1, username: "user1", password: "pass1", name: "Alice" },
    { id: 2, username: "user2", password: "pass2", name: "Bob" },
    { id: 3, username: "user3", password: "pass3", name: "Charlie" },
    { id: 4, username: "user4", password: "pass4", name: "David" },
    { id: 5, username: "user5", password: "pass5", name: "Eve" },
    { id: 6, username: "user6", password: "pass6", name: "Frank" },
    { id: 7, username: "user7", password: "pass7", name: "Grace" },
    { id: 8, username: "user8", password: "pass8", name: "Hannah" },
    { id: 9, username: "user9", password: "pass9", name: "Ian" },
    { id: 10, username: "user10", password: "pass10", name: "Jane" },
  ],
  expenses: [],
};

export default mockData;

/*
Expense structure:
{
  id: number, // Unique expense ID
  description: string, // E.g., "Dinner at XYZ"
  totalAmount: number, // E.g., 1000
  date: string, // E.g., "2025-04-26"
  image: string, // Base64 string or URL (optional)
  participants: [
    { userId: number, orderedAmount: number, paidAmount: number }, // E.g., { userId: 1, orderedAmount: 300, paidAmount: 500 }
  ],
  settled: boolean, // True if settled
}
*/
