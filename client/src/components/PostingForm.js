import React from "react";

export default function PostingForm({ post }) {

  return (
    <>
      <h1>Postings</h1>
      <form>
        <label htmlFor="title">Title</label>
        <input 
          id="title"
          name="title"
          type="text"
          placeholder="Enter your title here"
        />
        <label htmlFor="description">Description</label>
        <textarea 
          id="description"
          name="description"
          placeholder="Enter your description here"
        />
        <label htmlFor="categories">Categories</label>
        <select 
          id="categories"
          name="categories"
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
          <option value="writing">Writing</option>
        </select>
        <label htmlFor="price">Price</label>
        <input 
          id="price"
          name="price"
          type="number"
          placeholder="Please enter your price"
          min="0"
        />
        <label htmlFor="price-unit">Price Unit</label>
        <select 
          id="price-unit"
          name="price-unit"
        >
          <option value="flat_amount">Flat Amount</option>
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
        </select>
      </form>
      {/* :title, :description, :categories, :price, :price_unit, :project_type, :user_id */}
    </>
  )

}