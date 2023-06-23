import { useEffect, useState } from "react";
import { CategoryForm } from "./CategoryForm";
import "./category.css";
import { deleteCategory, getCategories, updateCategory } from "../../managers/CategoryManager";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedCategory, setEditedCategory] = useState({});

  useEffect(() => {
    getCategories().then((data) => {
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
      setCategories(sortedData);
    });
  }, []);

  const getAllCategories = () => {
    getCategories().then((data) => {
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
      setCategories(sortedData);
    });
  };

  const handleEditInputChange = (evt) => {
    const categoryEdit = { ...editedCategory };
    categoryEdit[evt.target.name] = evt.target.value;
    setEditedCategory(categoryEdit);
  };

  const handleEditCategory = (id) => {
    setEditingCategory(id);
    const categoryEdit = categories.find((category) => category.id === id);
    setEditedCategory(categoryEdit);
  };

  const handleDeleteCategory = (id) => {
    deleteCategory(id)
      .then(() => getCategories())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(sortedData);
      });
  };

  const saveCategory = (evt) => {
    evt.preventDefault();
    updateCategory(editingCategory, editedCategory)
      .then(() => {
        setEditingCategory(null);
        setEditedCategory({});
        return getCategories();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(sortedData);
      });
  };

  return (
    <section className="container">
      <div className="categoryList">
        <h1 className="categoryHeadline">Categories</h1>
        {categories.map((category) => (
          <div key={category.id} className="categoryRow">
            {category.can_edit ? (
              editingCategory === category.id ? (
                <form onSubmit={saveCategory}>
                  <input
                    type="text"
                    name="name"
                    required
                    className="catform-control"
                    value={editedCategory.name}
                    onChange={handleEditInputChange}
                  />
                  <input
                    type="text"
                    name="description"
                    required
                    className="catform-control"
                    value={editedCategory.description}
                    onChange={handleEditInputChange}
                  />
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </form>
              ) : (
                <>
                  <span className= "span_name">{category.name}</span>
                  <span className= "span_description">{category.description}</span>
                  <span className= "span_buttons">
                  <i
                    className="edit__icon"
                    onClick={() => handleEditCategory(category.id)}
                  ><FaRegEdit /></i>
                  <i
                    className="trash__icon"
                    onClick={() => handleDeleteCategory(category.id)}
                  ><FaTrashAlt/></i>
                  </span>
                </>
              )
            )
            :
            <div>{category.name}</div>
            }
          </div>
        ))}
      </div>
      <div className="categoryForm">
        <CategoryForm getAllCategories={getAllCategories} />
      </div>
    </section>
  );
};
