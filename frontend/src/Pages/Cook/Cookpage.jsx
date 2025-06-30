import {
  getProducts,
  getStocks,
  Logout,
  userVerify,
   // Make sure this is defined in your Redux slice
} from '@/Redux/Slices/Common/commonSlice';
import {
  addRequest,
  getOnstocks,
  updateStock
} from '@/Redux/Slices/Cook/cookSlice';
import React, { useEffect, useState } from 'react';
import {
  FaBoxOpen,
  FaUtensils,
  FaSignOutAlt
} from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CookDashboard = () => {
  const dispatch = useDispatch();
  const { getallproducts, getallstocks } = useSelector((state) => state.common);
  const { addrequest, getonstocks,reducestocks } = useSelector((state) => state.cook);
  const { userverify } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ item: '', quantity: '' });
  const [editedStocks, setEditedStocks] = useState({});

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getStocks());
    dispatch(getOnstocks());
    dispatch(userVerify());
  }, [addrequest,reducestocks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStockChange = (id, newQuantity) => {
    setEditedStocks(prev => ({
      ...prev,
      [id]: newQuantity
    }));
  };

  const handleUpdateStock = (id, productname, currentQuantity) => {
    const quantity = parseInt(editedStocks[id]);
    if (isNaN(quantity) || quantity < 0 || quantity > currentQuantity) {
      return toast.error("Invalid quantity: must be a positive number and less than current stock");
    }

    const updatedQuantity = currentQuantity - quantity;

    const data = {
      id,
      productname,
      quantity: updatedQuantity
    };

    dispatch(updateStock(data)).then((res) => {
      if (res.payload) {
        toast.success("Stock updated");
        dispatch(getStocks());
        setEditedStocks(prev => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { item, quantity } = formData;
    let data = {
      productname: item,
      quantity
    };

    dispatch(addRequest(data)).then((res) => {
      if (res.payload) {
        setFormData({ item: '', quantity: '' });
        toast.success("Product request sent");
      }
    });
  };

  const handleLogout = () => {
    dispatch(Logout()).then((res) => {
      if (res.payload) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-yellow-50 to-red-200 p-8 font-sans relative">

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="absolute cursor-pointer top-4 right-6 text-red-700 hover:text-red-900 flex items-center font-semibold"
      >
        <FaSignOutAlt className="mr-2" />
        Logout
      </button>

      <h1 className="text-4xl font-bold mb-10 text-center text-red-800 drop-shadow">
        🍽️ Cook Dashboard
      </h1>

      {/* Stock Table */}
      <div className="max-w-4xl mx-auto bg-white/90 shadow-xl rounded-xl p-6 mb-10 border border-red-200 backdrop-blur">
        <div className="flex items-center mb-4 text-red-600 text-xl font-semibold">
          <FaBoxOpen className="mr-2" />
          Current Stock
        </div>

        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead className="bg-red-100 text-red-800 rounded">
            <tr>
              <th className="p-3">Item</th>
              <th className="p-3">Current Qty</th>
              <th className="p-3">Reduce By</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {getallstocks?.[0]?.map((stock) => {
              const inputValue = editedStocks[stock.id] ?? "";
              const numericValue = parseInt(inputValue);
              const isInvalid =
                isNaN(numericValue) || numericValue < 0 || numericValue > stock.quantity;

              return (
                <tr key={stock.id} className="bg-white shadow hover:shadow-md rounded-lg transition">
                  <td className="p-3 font-medium text-gray-700">{stock?.productname}</td>
                  <td className="p-3 text-gray-600">{stock?.quantity}</td>
                  <td className="p-3 text-gray-600">
                    <input
                      type="number"
                      min="0"
                      max={stock.quantity}
                      value={inputValue}
                      onChange={(e) => handleStockChange(stock.id, e.target.value)}
                      className="w-20 px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="p-3">
                    <button
                      disabled={isInvalid || inputValue === ""}
                      onClick={() =>
                        handleUpdateStock(stock.id, stock.productname, stock.quantity)
                      }
                      className={`px-2 py-1 text-xs text-white rounded ${
                        isInvalid || inputValue === ""
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      Reduce
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Request Stock Form */}
      <div className="max-w-2xl mx-auto bg-white/90 shadow-xl rounded-xl p-6 border border-yellow-200 backdrop-blur">
        <div className="flex items-center mb-4 text-yellow-700 text-xl font-semibold">
          <MdAddShoppingCart className="mr-2" />
          Request Stock
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Item Quantity</label>
            <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
              <FaUtensils className="text-gray-400 mr-2" />
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full focus:outline-none"
                placeholder="e.g. 5"
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Item Name</label>
            <select
              name="item"
              id="item"
              value={formData.item}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="" disabled>Select Item</option>
              {getallproducts?.[0]?.map((element) => (
                <option key={element?._id} value={element?.productname}>
                  {element?.productname}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-yellow-400 text-white py-2 rounded-md font-semibold shadow-md hover:shadow-lg hover:scale-[1.01] transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CookDashboard;
