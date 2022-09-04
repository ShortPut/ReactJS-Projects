import React, { useState } from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpesne = (props) => {
  const [isEditing, setisEditing] = useState(false);

  const saveExpenseDataHandler = (enteredExpesnseData) => {
    const expenseData = {
      ...enteredExpesnseData,
      id: Math.random().toString(),
    };

    props.onAddExpense(expenseData);
    setisEditing(false);
  };

  const startEditingHandler = () => {
    setisEditing(true);
  };

  const stopEditingHandler = () => {
    setisEditing(false);
  };

  return (
    <div className="new-expense">
      {!isEditing ? (
        <button onClick={startEditingHandler}>Add New Expense</button>
      ) : (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewExpesne;
