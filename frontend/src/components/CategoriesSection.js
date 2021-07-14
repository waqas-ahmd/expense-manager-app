import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import InputContainer from "./InputContainer";
import ListItem from "./ListItem";
import { Button, Modal, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../store/actions/categoryActions";

const CategoriesSection = () => {
  const [categoryModal, setCategoryModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { categories } = useSelector((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const dispatch = useDispatch();

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setDeleteModal(true);
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setCategoryModal(true);
  };

  const handleUpdate = (category) => {
    setSelectedCategory(category);
    setCategoryModal(true);
  };

  const showToast = (action) => {
    setError(false);
    if (action === -1) {
      setError(true);
    }
    setToast(true);
    setToastMsg(
      action === 0
        ? "Category Deleted"
        : action === 1
        ? "Category Updated"
        : action === 2
        ? "Category Created"
        : "Action Failed"
    );
  };

  useEffect(() => {
    dispatch(getAllCategories());
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
        <Button style={{ flex: 1 }} onClick={handleCreate} className="pBg">
          Add New Category
        </Button>
      </div>
      {categoryModal && (
        <CategoryModal
          show={categoryModal}
          onHide={() => setCategoryModal(false)}
          category={selectedCategory}
          onComplete={showToast}
        />
      )}
      {deleteModal && (
        <DeleteModal
          show={deleteModal}
          onHide={() => setDeleteModal(false)}
          category={selectedCategory}
          onComplete={showToast}
        />
      )}
      {categories.length === 0 ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>No Categories</div>
        </div>
      ) : (
        <div className="customScroll mt-2" style={{ overflow: "auto" }}>
          {categories.map((c, i) => (
            <ListItem key={i}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ color: "#fff" }}>{c.title}</div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div className="px-2">
                    <MdEdit
                      onClick={() => handleUpdate(c)}
                      color="#fff"
                      size={24}
                    />
                  </div>
                  <div className="px-2" onClick={() => handleDelete(c)}>
                    <MdDelete color="#fff" size={24} />
                  </div>
                </div>
              </div>
            </ListItem>
          ))}
        </div>
      )}{" "}
    </div>
  );
};

const CategoryModal = ({ show, onHide, category, onComplete }) => {
  const [title, setTitle] = useState(category ? category.title : "");
  const [description, setDescription] = useState(
    category ? category.description : ""
  );
  const dispatch = useDispatch();

  const handleCreate = async () => {
    onHide();
    const data = await dispatch(createCategory({ title, description }));
    if (!data.error) {
      onComplete(2);
    } else {
      onComplete(-1);
    }
  };

  const handleUpdate = async () => {
    onHide();
    const data = await dispatch(
      updateCategory({ title, description }, category._id)
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
          {category ? "Update" : "Add"} Category
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
        <InputContainer label="Description">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
          onClick={category ? handleUpdate : handleCreate}
        >
          {category ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const DeleteModal = ({ show, onHide, category, onComplete }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    onHide();
    const data = await dispatch(deleteCategory(category._id));
    if (!data.error) {
      onComplete(0);
    } else {
      onComplete(-1);
    }
  };
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header>
        <div style={{ fontWeight: 500, color: "#f44" }}>Delete Category</div>
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

export default CategoriesSection;
