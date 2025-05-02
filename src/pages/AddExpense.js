/* import { useState } from "react";
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
 */

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useExpenses } from "../context/ExpenseContext";
import { Formik, Form, Field, FieldArray } from "formik";
import mockData from "../data/mockData";

function AddExpense() {
  const { user } = useAuth();
  const { addExpense } = useExpenses();
  const navigate = useNavigate();

  const initialValues = {
    description: "",
    totalAmount: "",
    date: "",
    image: "",
    participants: [{ userId: user.id, orderedAmount: "", paidAmount: "" }],
  };

  const validate = (values) => {
    const errors = {};
    if (!values.description) errors.description = "Required";
    if (!values.totalAmount) errors.totalAmount = "Required";
    else if (values.totalAmount <= 0) errors.totalAmount = "Must be positive";
    if (!values.date) errors.date = "Required";
    if (!values.participants.length)
      errors.participants = "At least one participant required";
    else {
      const totalPaid = values.participants.reduce(
        (sum, p) => sum + Number(p.paidAmount || 0),
        0
      );
      if (totalPaid !== Number(values.totalAmount)) {
        errors.participants =
          "Total paid amount must equal total expense amount";
      }
      values.participants.forEach((p, index) => {
        if (!p.userId) errors[`participants[${index}].userId`] = "Required";
        if (!p.orderedAmount)
          errors[`participants[${index}].orderedAmount`] = "Required";
        else if (p.orderedAmount < 0)
          errors[`participants[${index}].orderedAmount`] =
            "Must be non-negative";
        if (!p.paidAmount)
          errors[`participants[${index}].paidAmount`] = "Required";
        else if (p.paidAmount < 0)
          errors[`participants[${index}].paidAmount`] = "Must be non-negative";
      });
    }
    return errors;
  };

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFieldValue("image", reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Expense</h2>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values) => {
          const expense = {
            description: values.description,
            totalAmount: Number(values.totalAmount),
            date: values.date,
            image: values.image,
            participants: values.participants.map((p) => ({
              userId: Number(p.userId),
              orderedAmount: Number(p.orderedAmount),
              paidAmount: Number(p.paidAmount),
            })),
          };
          addExpense(expense);
          navigate("/dashboard");
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <Field
                type="text"
                name="description"
                className={`form-control ${
                  touched.description && errors.description ? "is-invalid" : ""
                }`}
              />
              {touched.description && errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="totalAmount" className="form-label">
                Total Amount
              </label>
              <Field
                type="number"
                name="totalAmount"
                className={`form-control ${
                  touched.totalAmount && errors.totalAmount ? "is-invalid" : ""
                }`}
                min="0"
              />
              {touched.totalAmount && errors.totalAmount && (
                <div className="invalid-feedback">{errors.totalAmount}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <Field
                type="date"
                name="date"
                className={`form-control ${
                  touched.date && errors.date ? "is-invalid" : ""
                }`}
              />
              {touched.date && errors.date && (
                <div className="invalid-feedback">{errors.date}</div>
              )}
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
                onChange={(e) => handleImageChange(e, setFieldValue)}
              />
            </div>
            <h4>Participants</h4>
            {errors.participants && typeof errors.participants === "string" && (
              <div className="alert alert-danger">{errors.participants}</div>
            )}
            <FieldArray name="participants">
              {({ push, remove }) => (
                <>
                  {values.participants.map((_, index) => (
                    <div key={index} className="mb-3 border p-3">
                      <div className="mb-2">
                        <label className="form-label">User</label>
                        <Field
                          as="select"
                          name={`participants[${index}].userId`}
                          className={`form-control ${
                            touched.participants?.[index]?.userId &&
                            errors[`participants[${index}].userId`]
                              ? "is-invalid"
                              : ""
                          }`}
                        >
                          <option value="">Select User</option>
                          {mockData.users.map((u) => (
                            <option key={u.id} value={u.id}>
                              {u.name}
                            </option>
                          ))}
                        </Field>
                        {touched.participants?.[index]?.userId &&
                          errors[`participants[${index}].userId`] && (
                            <div className="invalid-feedback">
                              {errors[`participants[${index}].userId`]}
                            </div>
                          )}
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Ordered Amount</label>
                        <Field
                          type="number"
                          name={`participants[${index}].orderedAmount`}
                          className={`form-control ${
                            touched.participants?.[index]?.orderedAmount &&
                            errors[`participants[${index}].orderedAmount`]
                              ? "is-invalid"
                              : ""
                          }`}
                          min="0"
                        />
                        {touched.participants?.[index]?.orderedAmount &&
                          errors[`participants[${index}].orderedAmount`] && (
                            <div className="invalid-feedback">
                              {errors[`participants[${index}].orderedAmount`]}
                            </div>
                          )}
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Paid Amount</label>
                        <Field
                          type="number"
                          name={`participants[${index}].paidAmount`}
                          className={`form-control ${
                            touched.participants?.[index]?.paidAmount &&
                            errors[`participants[${index}].paidAmount`]
                              ? "is-invalid"
                              : ""
                          }`}
                          min="0"
                        />
                        {touched.participants?.[index]?.paidAmount &&
                          errors[`participants[${index}].paidAmount`] && (
                            <div className="invalid-feedback">
                              {errors[`participants[${index}].paidAmount`]}
                            </div>
                          )}
                      </div>
                      {values.participants.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-secondary mb-3"
                    onClick={() =>
                      push({ userId: "", orderedAmount: "", paidAmount: "" })
                    }
                  >
                    Add Participant
                  </button>
                </>
              )}
            </FieldArray>
            <div>
              <button type="submit" className="btn btn-primary">
                Save Expense
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddExpense;
