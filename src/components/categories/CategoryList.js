import { useEffect, useState } from "react";
import { CategoryForm } from "./CategoryForm";
import "./category.css";
import { deleteCategory, getCategories, updateCategory } from "../../managers/CategoryManager";

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
            {editingCategory === category.id ? (
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
                <span>{category.name}</span>
                <span>{category.description}</span>
                <img
                  className="action__button"
                  src="gear.png"
                  onClick={() => handleEditCategory(category.id)}
                ></img>
                <img
                  className="action__button"
                  src="trashcan.png"
                  onClick={() => handleDeleteCategory(category.id)}
                ></img>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="categoryForm">
        <CategoryForm getAllCategories={getAllCategories} />
      </div>
    </section>
  );
};
