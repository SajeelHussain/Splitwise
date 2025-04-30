import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useExpenses } from "../context/ExpenseContext";
import mockData from "../data/mockData";

function AddExpense() {
  const { user } = useAuth();
  const { addExpense } = useExpenses();

  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [participants, setParticipants] = useState([
    { userId: user.id, orderedAmount: "", paidAmount: "" },
  ]);
  const [error, setError] = useState("");

  const handleAddParticipant = () => {
    setParticipants([
      ...participants,
      { userId: "", orderedAmount: "", paidAmount: "" },
    ]);
  };

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index][field] = value;
    setParticipants(updatedParticipants);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPaid = participants.reduce(
      (sum, p) => sum + Number(p.paidAmount || 0),
      0
    );
    if (totalPaid !== Number(totalAmount)) {
      setError("Total paid amount must equal total expense amount");
      return;
    }
    const expense = {
      description,
      totalAmount: Number(totalAmount),
      date,
      image,
      participants: participants.map((p) => ({
        userId: Number(p.userId),
        orderedAmount: Number(p.orderedAmount),
        paidAmount: Number(p.paidAmount),
      })),
    };
    addExpense(expense);
    navigate("/dashboard");
  };

  return (
    <div className="container mt-5">
      <h2>Add Expense</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="totalAmount" className="form-label">
            Total Amount:
          </label>
          <input
            type="number"
            className="form-control"
            id="totalAmount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
            min="0"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image (optional)
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <h4>Participants</h4>
        {participants.map((participant, index) => (
          <div key={index} className="border rounded p-2 mb-3">
            <div className="mb-2">
              <label className="form-label">User</label>
              <select
                className="form-control"
                value={participant.userId}
                onChange={(e) =>
                  handleParticipantChange(index, "userId", e.target.value)
                }
                required
              >
                <option value="">Select User</option>
                {mockData.users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label">Ordered Amount</label>
              <input
                type="number"
                className="form-control"
                value={participant.orderedAmount}
                onChange={(e) =>
                  handleParticipantChange(index, "orderedAmount", e.target.value)
                }
                required
                min="0"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Paid Amount</label>
              <input
                type="number"
                className="form-control"
                value={participant.paidAmount}
                onChange={(e) =>
                  handleParticipantChange(index, "paidAmount", e.target.value)
                }
                required
                min="0"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={handleAddParticipant}
        >
          Add Participant
        </button>
        <div>
          <button type="submit" className="btn btn-primary">
            Save Expense
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddExpense;
