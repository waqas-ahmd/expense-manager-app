import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import InputContainer from "./InputContainer";
import ListItem from "./ListItem";
import { Button, Modal, Spinner, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  updateExpense,
} from "../store/actions/expenseActions";

const ExpensesSection = () => {
  const [expenseModal, setExpenseModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { expenses } = useSelector((state) => state.expenses);
  const { categories } = useSelector((state) => state.categories);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const dispatch = useDispatch();

  const handleDelete = (expense) => {
    setSelected(expense);
    setDeleteModal(true);
  };

  const handleCreate = () => {
    setSelected(null);
    setExpenseModal(true);
  };

  const handleUpdate = (expense) => {
    setSelected(expense);
    setExpenseModal(true);
  };

  const showToast = (action) => {
    setError(false);
    if (action === -1) {
      setError(true);
    }
    setToast(true);
    setToastMsg(
      action === 0
        ? "Expense Item Deleted"
        : action === 1
        ? "Expense Item Updated"
        : action === 2
        ? "Expense Item Created"
        : "Action Failed"
    );
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(false);
      const data = await dispatch(getAllExpenses());
      if (data.error) {
        setError(true);
      }
      setLoading(false);
    })();
  }, [dispatch]);

  return (
    <div className="TabBox">
      <Toast
        className={error ? "toast error" : "toast"}
        animation={true}
        show={toast}
        onClose={() => setToast(false)}
        delay={2000}
        autohide
      >
        {toastMsg}
      </Toast>
      <div className="TabHeader">
        <Button className="pBg" style={{ flex: 1 }} onClick={handleCreate}>
          Add New Expense
        </Button>
      </div>
      {expenseModal && (
        <ExpenseModal
          show={expenseModal}
          onHide={() => setExpenseModal(false)}
          expense={selected}
          categories={categories}
          onComplete={showToast}
        />
      )}
      {deleteModal && (
        <DeleteModal
          show={deleteModal}
          onHide={() => setDeleteModal(false)}
          expense={selected}
          onComplete={showToast}
        />
      )}
      {expenses.length === 0 ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? (
            <Spinner color="black" />
          ) : error ? (
            <div>Failed to Load Expenses</div>
          ) : (
            <div>No Expenses</div>
          )}
        </div>
      ) : (
        <div className="customScroll mt-2" style={{ overflow: "auto" }}>
          {expenses.map((e, i) => (
            <div key={i}>
              <ListItem>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ color: "#fff" }}>
                    <div>{e.title}</div>
                    <div style={{ fontSize: "small" }}>
                      {e.categoryName} - {new Date(e.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 500,
                        fontSize: "large",
                        letterSpacing: 1,
                      }}
                    >
                      ${e.value}
                    </div>
                    <div className="px-2">
                      <MdEdit
                        onClick={() => handleUpdate(e)}
                        color="#fff"
                        size={24}
                      />
                    </div>
                    <div className="px-2" onClick={() => handleDelete(e)}>
                      <MdDelete color="#fff" size={24} />
                    </div>
                  </div>
                </div>
              </ListItem>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ExpenseModal = ({ show, onHide, expense, categories, onComplete }) => {
  const categories2 = [{ title: "Uncategorized", _id: null }, ...categories];

  const [title, setTitle] = useState(expense ? expense.title : "");
  const [value, setValue] = useState(expense ? expense.value : 0);
  const [category, setCategory] = useState(
    expense ? expense.category : categories2[0]._id
  );
  const dispatch = useDispatch();

  const handleCreate = async () => {
    onHide();
    const data = await dispatch(
      createExpense({ title, value, date: new Date(), category })
    );
    if (!data.error) {
      onComplete(2);
    } else {
      onComplete(-1);
    }
  };

  const handleUpdate = async () => {
    onHide();
    const data = await dispatch(
      updateExpense({ title, value, category }, expense._id)
    );
    if (!data.error) {
      onComplete(1);
    } else {
      onComplete(-1);
    }
  };
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header>
        <div style={{ fontWeight: 500 }} className="pC">
          {expense ? "Update" : "Add"} Category
        </div>
      </Modal.Header>
      <Modal.Body>
        <InputContainer label="Title">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputContainer>
        <InputContainer label="Value">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(+e.target.value)}
          />
        </InputContainer>
        <InputContainer label="Category">
          <select
            value={category}
            onChange={(e) => setCategory(e.currentTarget.value)}
          >
            {categories2.map((c, i) => (
              <option key={i} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </InputContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button
          block
          style={{ flex: 1 }}
          variant="secondary"
          className="flex-1 mt-0"
          onClick={onHide}
        >
          Cancel
        </Button>
        <Button
          style={{ flex: 1 }}
          block
          className="ml-1 mt-0 pBg"
          onClick={expense ? handleUpdate : handleCreate}
        >
          {expense ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const DeleteModal = ({ show, onHide, expense, onComplete }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    onHide();
    const data = await dispatch(deleteExpense(expense._id));
    if (!data.error) {
      onComplete(0);
    } else {
      onComplete(-1);
    }
  };
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header>
        <div style={{ fontWeight: 500, color: "#f44" }}>Delete Expense</div>
      </Modal.Header>
      <Modal.Body>Are You Sure?</Modal.Body>
      <Modal.Footer>
        <Button
          block
          style={{ flex: 1 }}
          variant="secondary"
          className="flex-1 mt-0"
          onClick={onHide}
        >
          Cancel
        </Button>
        <Button
          style={{ flex: 1 }}
          block
          className="ml-1 mt-0"
          variant="danger"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExpensesSection;
