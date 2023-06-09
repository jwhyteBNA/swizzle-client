import { useState } from "react"
import './category.css'
import { createCategory } from "../../managers/CategoryManager"


export const CategoryForm = ({getAllCategories}) => {
    const [category, setCategory] = useState({})

    const handleInputChange = (evt) => {
        const newCategory = {...category}
        newCategory.name = evt.target.value
        newCategory.description = evt.target.value
        setCategory(newCategory)
    }

    const createANewCategory = () => {
        if (category.name ==="") {
            window.alert("Oops, you need a name!")
        }
        else if (category.description ==="") {
            window.alert("Oops, you need a description!")
        }
        else {
            createCategory({
                name: category.name,
                description: category.description
            })
            .then(() => getAllCategories())
        }
    }

    return <form className="formBorder">
      <h2 className="">Create A New Category</h2>
      <fieldset>
        <div className="category">
          <label htmlFor="name">Name: </label>
          <input type="textarea" name="label" required className="catform-control"
            placeholder="Enter a new category label here"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="category">
          <label htmlFor="name">Description: </label>
          <input type="textarea" name="label" required className="catform-control"
            placeholder="Explain the category"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <button type="submit"
        onClick={evt => {
          evt.preventDefault()
          createANewCategory()
        }}
        className="btn btn-4">
        Save New Category
      </button>
    </form>
    
}