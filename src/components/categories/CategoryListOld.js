import React, { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../managers/CategoryManager";
import "./category.css";

export const CategoryListOld = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedCategory, setEditedCategory] = useState({});

  const handleInputChange = (evt) => {
    const newCategory = { ...category };
    newCategory[evt.target.name] = evt.target.value;
    setCategory(newCategory);
  };

  const handleEditInputChange = (evt) => {
    const categoryToEdit = { ...editedCategory };
    categoryToEdit[evt.target.name] = evt.target.value;
    setEditedCategory(categoryToEdit);
  };

  const createANewCategory = (e) => {
    e.preventDefault();
    if (category.label === "") {
      window.alert("Oops, you need a label!");
    } else {
      createCategory({
        label: category.label,
      })
        .then(() => getCategories())
        .then((data) => {
          const sortedData = data.sort((a, b) =>
            a.label.localeCompare(b.label)
          );
          setCategories(sortedData);
        });
    }
  };

  const handleEditCategory = (id) => {
    setEditingCategory(id);
    const categoryToEdit = categories.find((cat) => cat.id === id);
    setEditedCategory(categoryToEdit);
  };

  const handleDeleteCategory = (id) => {
    deleteCategory(id)
      .then(() => getCategories())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.label.localeCompare(b.label));
        setCategories(sortedData);
      });
  };

  const saveCategory = (e) => {
    e.preventDefault();
    updateCategory(editingCategory, editedCategory)
      .then(() => {
        setEditingCategory(null);
        setEditedCategory({});
        return getCategories();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => a.label.localeCompare(b.label));
        setCategories(sortedData);
      });
  };

  useEffect(() => {
    getCategories().then((data) => {
      const sortedData = data.sort((a, b) => a.label.localeCompare(b.label));
      setCategories(sortedData);
    });
  }, []);

    return <>
        <fieldset className="container">
            <div className="categoryList">
                <h1>Categories</h1>
                {categories.map(category => (
                    <div key={category.id} className="categoryRow">
                        {editingCategory === category.id ? (
                            <form onSubmit={saveCategory}>
                                <input type="text" name="label" required className="form-control"
                                    value={editedCategory.label}
                                    onChange={handleEditInputChange}
                                />
                                <button type="submit" className="btn btn-primary">Save</button>
                            </form>
                        ) : (
                            <>
                                <span>{category.label}</span>
                                <img className="action__button" src="../gear.png" onClick={() => handleEditCategory(category.id)}></img>
                                <img className="action__button" src="../trashcan.png" onClick={() => handleDeleteCategory(category.id)}></img>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div className="categoryForm">
                <form className="" onSubmit={createANewCategory}>
                    <h2 className="">Create A New Category</h2>
                    <fieldset>
                        <div className="category">
                            <label htmlFor="name">Label: </label>
                            <input type="text" name="label" required className="form-control"
                                placeholder="Enter a new category label here"
                                value={category.label || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </fieldset>
                    <button type="submit"
                        className="btn btn-primary">
                        Save New Category
                    </button>
                </form>
            </div>
          </fieldset>
    </>
}
