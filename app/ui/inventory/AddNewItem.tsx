"use client";

import { set } from 'mongoose';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  productName: string;
  brandName: string;
  category: string;
  buyingPrice: string;
  quantity: string;
  maxSellingPrice: string;
}

interface AddNewItemButtonProps {
  setter: (value: boolean) => void;
}
const AddNewItemButton: React.FC<AddNewItemButtonProps> = ({ setter }) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    brandName: '',
    category: '',
    buyingPrice: '',
    quantity: '',
    maxSellingPrice: ''
  });
  const [error, setError] = useState<string>('');

  const handleAddItemClick = () => {
    setter(true);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setError('');
    setFormData({
      productName: '',
      brandName: '',
      category: '',
      buyingPrice: '',
      quantity: '',
      maxSellingPrice: ''
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form data before submission
    if (!formData.productName || !formData.brandName || !formData.category || !formData.buyingPrice || !formData.quantity || !formData.maxSellingPrice) {
      setError('All fields are required.');
      return;
    }

    const newItemData = {
      ...formData,
      buyingPrice: parseFloat(formData.buyingPrice),
      quantity: parseInt(formData.quantity),
      maxSellingPrice: parseFloat(formData.maxSellingPrice),
    };

    try {
      // Example: Call API endpoint to add new item (replace with your API endpoint)
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItemData)
      });

      if (!response.ok) {
        throw new Error('Failed to add new item.');
      }

      setter(false);

      console.log('New Item Added:', newItemData);

      // Reset form data and close dialog
      handleDialogClose();
    } catch (error) {
      setError('Failed to add new item. Please try again.');
    }
  };

  return (
    <div>
      <button
        className="select-none rounded-xl px-2 py-1 mx-4 bg-gray-900 text-center align-middle text-lg  text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={handleAddItemClick}
      >
        + Add New Item
      </button>

      {/* Add new item dialog */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-60"
          onClick={handleDialogClose}
        >
          <div
            className="relative flex flex-col w-full max-w-[24rem] bg-white rounded-xl text-gray-700 shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleFormSubmit} className="p-6">
              <h4 className="text-2xl font-semibold text-blue-gray-900">Add New Item</h4>
              {error && <p className="text-red-600 mb-3">{error}</p>}
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md border-blue-gray-200 focus:border-gray-900 focus:outline-none"
                  placeholder="Product Name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800">Brand Name</label>
                <input
                  type="text"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md border-blue-gray-200 focus:border-gray-900 focus:outline-none"
                  placeholder="Brand Name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md border-blue-gray-200 focus:border-gray-900 focus:outline-none"
                  placeholder="Category"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800">Buying Price (₹)</label>
                <input
                  type="number"
                  name="buyingPrice"
                  min="0"
                  step="0.01"
                  value={formData.buyingPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md border-blue-gray-200 focus:border-gray-900 focus:outline-none"
                  placeholder="Buying Price"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  min="0"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md border-blue-gray-200 focus:border-gray-900 focus:outline-none"
                  placeholder="Quantity"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800">Max Selling Price (₹)</label>
                <input
                  type="number"
                  name="maxSellingPrice"
                  min="0"
                  step="0.01"
                  value={formData.maxSellingPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md border-blue-gray-200 focus:border-gray-900 focus:outline-none"
                  placeholder="Max Selling Price"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-[90%] py-3 text-xs font-bold text-white bg-gray-900 rounded-md shadow-md  hover:shadow-lg focus:outline-none"
              >
                Add Item
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewItemButton;
