import { useEffect, useState } from "react";
import { TagForm } from "./TagForm";
import { deleteTag, getTags, updateTag } from "../../managers/TagManager";
import "./tag.css";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";

export const TagList = () => {
  const [tags, setTags] = useState([]);
  const [editingTag, setEditingTag] = useState(null);
  const [editedTag, setEditedTag] = useState({});

  useEffect(() => {
    getTags().then((data) => {
      const sortedData = data.sort((a, b) => a.label.localeCompare(b.label));
      setTags(sortedData);
    });
  }, []);

  const getAllTags = () => {
    getTags().then((data) => {
      const sortedData = data.sort((a, b) => a.label.localeCompare(b.label));
      setTags(sortedData);
    });
  };

  const handleEditInputChange = (evt) => {
    const tagEdit = { ...editedTag };
    tagEdit[evt.target.name] = evt.target.value;
    setEditedTag(tagEdit);
  };

  const handleEditTag = (id) => {
    setEditingTag(id);
    const tagEdit = tags.find((tag) => tag.id === id);
    setEditedTag(tagEdit);
  };

  const handleDeleteTag = (id) => {
    deleteTag(id)
      .then(() => getTags())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.label.localeCompare(b.label));
        setTags(sortedData);
      });
  };

  const saveTag = (evt) => {
    evt.preventDefault();
    updateTag(editingTag, editedTag)
      .then(() => {
        setEditingTag(null);
        setEditedTag({});
        return getTags();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => a.label.localeCompare(b.label));
        setTags(sortedData);
      });
  };

  return (
    <section className="container">
      <div className="tagList">
        <h1 className="tagHeadline">Tags</h1>
        {tags.map((tag) => (
  <div key={tag.id} className="tagRow">
    {tag.can_edit ? (
      editingTag === tag.id ? (
        <form onSubmit={saveTag}>
          <input
            type="text"
            name="label"
            required
            className="form-control"
            value={editedTag.label}
            onChange={handleEditInputChange}
          />
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      ) : (
        <>
          <span className="span_tag_name">{tag.label}</span>
          <span className="span_buttons">
          <i
            className="edit__icon"
            onClick={() => handleEditTag(tag.id)}
          ><FaRegEdit /></i>
          <i
            className="trash__icon"
            onClick={() => handleDeleteTag(tag.id)}
          ><FaTrashAlt/></i>
          </span>
        </>
      )
    ) : 
    <div>{tag.label}</div>}
  </div>
))}

      </div>
      <div className="tagForm">
        <TagForm getAllTags={getAllTags} />
      </div>
    </section>
  );
};
