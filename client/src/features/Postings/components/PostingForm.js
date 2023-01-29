import React, { useState } from "react";
import { useSystemMode } from "../../../SystemModeContext";

export default function PostingForm({ posting, onSubmit, onCancel }) {
  const systemMode = useSystemMode()

  const [currentPosting, setCurrentPosting] = useState(() => {
    if (posting) {
      return {
        title: posting.title,
        description: posting.description,
        categories: posting.categories,
        price: parseInt(posting.price),
        price_unit: posting.price_unit.replace(" ", "_").toLowerCase(),
      };
    } else {
      return {
        title: "",
        description: "",
        categories: "Accounting",
        price: "0",
        price_unit: "Hourly",
      };
    }
  });

  function handleChange(e) {
    const name = e.target.name.replace("-", "_");
    let value = e.target.value;

    if (name === "price-unit") {
      value = value.replace(" ", "_").toLowerCase();
    }

    setCurrentPosting({
      ...currentPosting,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <form className="posting__form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={currentPosting.title}
          onChange={(e) => handleChange(e)}
          placeholder="Enter your title here"
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={currentPosting.description}
          onChange={(e) => handleChange(e)}
          placeholder="Enter your description here"
        />
        <label htmlFor="categories">Categories</label>
        <select
          id="categories"
          name="categories"
          value={currentPosting.categories}
          onChange={(e) => handleChange(e)}
        >
          <option value="accounting">Accounting</option>
          <option value="administrative">Administrative</option>
          <option value="bookkeeping">Bookkeeping</option>
          <option value="data-entry">Data Entry</option>
          <option value="education">Education</option>
          <option value="graphic-design">Graphic Design</option>
          <option value="information-technology">Information Technology</option>
          <option value="marketing">Marketing</option>
          <option value="project-management">Project Management</option>
          <option value="recruiting">Recruiting</option>
          <option value="sales">Sales</option>
          <option value="software-development">Software Development</option>
          <option value="therapy">Therapy</option>
          <option value="web-development">Web Development</option>
          <option value="writing">Writing</option>
        </select>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          value={currentPosting.price}
          onChange={(e) => handleChange(e)}
          placeholder="Please enter your price"
          min="0"
        />
        <label htmlFor="price-unit">Price Unit</label>
        <select
          id="price-unit"
          name="price-unit"
          value={currentPosting.price_unit}
          onChange={(e) => handleChange(e)}
        >
          <option value="flat_amount">Flat Amount</option>
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
        </select>
        <div className="form-action-buttons">
          <input type="submit" value="Submit" className={`colors-${systemMode.toLowerCase()}`}/>
          <button className="cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
