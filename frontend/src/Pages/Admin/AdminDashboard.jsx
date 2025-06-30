import { addCook, addProduct, getallCooks, updateStatus } from '@/Redux/Slices/Admin/adminSlice';
import { getProducts, getStocks, Logout } from '@/Redux/Slices/Common/commonSlice';
import { addRequest, getOnstocks } from '@/Redux/Slices/Cook/cookSlice';
import React, { useEffect, useState } from 'react';
import { FaBoxOpen, FaUtensils, FaSignOutAlt } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { getallproducts, getallstocks } = useSelector((state) => state.common);
    const { addrequest, getonstocks } = useSelector((state) => state.cook);
    const { updatestatus,getallcooks,addcook } = useSelector((state) => state.admin);


    useEffect(() => {
        dispatch(getProducts());
        dispatch(getStocks());
        dispatch(getOnstocks());
        dispatch(getallCooks());
    }, [addrequest, updatestatus,addcook]);

    const [formData, setFormData] = useState({ item: '', quantity: '' });
    const [showCookModal, setShowCookModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [cookData, setCookData] = useState({ name: '', email: '', password: '' });
    const [productData, setProductData] = useState({ name: '', price: '' });
    const [cooks, setCooks] = useState([{ name: "John Doe", email: "john@example.com" }]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const submitstatus = (id, status) => {
        let data = { status, id };
        dispatch(updateStatus(data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { item, quantity } = formData;
        let data = { productname: item, quantity };

        dispatch(addRequest(data)).then((res) => {
            if (res.payload) {
                setFormData({ item: '', quantity: '' });
                toast.success("Product request sent");
            }
        });
    };

    const handleCookSubmit = (e) => {
        e.preventDefault();
        setCooks([...cooks, { name: cookData.name, email: cookData.email }]);
        setCookData({ name: '', email: '', password: '' });
        setShowCookModal(false);
        dispatch(addCook(cookData))
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        const {name,price} = productData;
        let data = {
            "productname":name,
            "productprice":price
        }
        setShowProductModal(false);
        dispatch(addProduct(data));
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
            <button onClick={handleLogout} className="absolute cursor-pointer  top-4 right-6 text-red-700 hover:text-red-900 flex items-center font-semibold">
                <FaSignOutAlt className="mr-2" /> Logout
            </button>

            <h1 className="text-4xl font-bold mb-10 text-center text-red-800 drop-shadow">Admin Dashboard</h1>

            <div className="flex justify-center gap-6 my-8">
                <button onClick={() => setShowCookModal(true)} className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition">Add Cook</button>
                <button onClick={() => setShowProductModal(true)} className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">Add Product</button>
            </div>

            <div className="max-w-4xl mx-auto bg-white/90 shadow-xl rounded-xl p-6 mb-10 border border-red-200 backdrop-blur">
                <div className="flex items-center mb-4 text-red-600 text-xl font-semibold">
                    <FaBoxOpen className="mr-2" /> Current Stock
                </div>
                <table className="w-full text-left border-separate border-spacing-y-2">
                    <thead className="bg-red-100 text-red-800 rounded">
                        <tr>
                            <th className="p-3">Item</th>
                            <th className="p-3">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getallstocks?.[0]?.map((stock) => (
                            <tr key={stock.id} className="bg-white shadow hover:shadow-md rounded-lg transition">
                                <td className="p-3 font-medium text-gray-700">{stock?.productname}</td>
                                <td className="p-3 text-gray-600">{stock?.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6 mb-10 border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">👨‍🍳 All Cooks</h2>
                <ul className="space-y-2">
                    {getallcooks?.[0]?.map((cook, idx) => (
                        <li key={idx} className="border p-3 rounded bg-gray-50">
                            <strong>{cook.name}</strong> — {cook.email}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="max-w-4xl mx-auto bg-white/90 shadow-xl rounded-xl p-6 mb-10 border border-red-200 backdrop-blur">
                <div className="flex items-center mb-4 text-red-600 text-xl font-semibold">
                    <FaBoxOpen className="mr-2" /> All Requests
                </div>
                <table className="w-full text-left border-separate border-spacing-y-2">
                    <thead className="bg-red-100 text-red-800 rounded">
                        <tr>
                            <th className="p-3">Item</th>
                            <th className="p-3">Quantity</th>
                            <th className='p-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getonstocks?.[0]?.map((stock) => (
                            <tr key={stock.id} className="bg-white shadow hover:shadow-md rounded-lg transition">
                                <td className="p-3 font-medium text-gray-700">{stock?.productname}</td>
                                <td className="p-3 text-gray-600">{stock?.quantity}</td>
                                <td className="p-3 text-gray-600 flex gap-4">
                                    {stock?.status === "pending" ? (
                                        <>
                                            <button className='px-4 py-2 bg-green-600 text-white rounded-lg' onClick={() => submitstatus(stock?._id, "Approved")}>Approve</button>
                                            <button className='px-4 py-2 bg-red-500 text-white rounded-lg' onClick={() => submitstatus(stock?._id, "Rejected")}>Reject</button>
                                        </>
                                    ) : stock?.status === "Approved" ? (
                                        <button className='px-4 py-2 text-green-500 rounded-lg'>Approved</button>
                                    ) : stock?.status === "processing" ? (
                                        <button className='px-4 py-2 text-red-500 rounded-lg'>Sent to Owner</button>
                                    ) : (
                                        <button className='px-4 py-2 text-red-500 rounded-lg'>Rejected</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Cook Modal */}
            {showCookModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Add Cook</h2>
                        <form onSubmit={handleCookSubmit} className="space-y-4">
                            <input type="text" name="name" placeholder="Name" value={cookData.name} onChange={e => setCookData({ ...cookData, name: e.target.value })} className="w-full border p-2 rounded" required />
                            <input type="email" name="email" placeholder="Email" value={cookData.email} onChange={e => setCookData({ ...cookData, email: e.target.value })} className="w-full border p-2 rounded" required />
                            <input type="password" name="password" placeholder="Password" value={cookData.password} onChange={e => setCookData({ ...cookData, password: e.target.value })} className="w-full border p-2 rounded" required />
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => setShowCookModal(false)} className="text-red-500">Cancel</button>
                                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Product Modal */}
            {showProductModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
                        <form onSubmit={handleProductSubmit} className="space-y-4">
                            <input type="text" name="name" placeholder="Product Name" value={productData.name} onChange={e => setProductData({ ...productData, name: e.target.value })} className="w-full border p-2 rounded" required />
                            <input type="number" name="price" placeholder="Product Price" value={productData.price} onChange={e => setProductData({ ...productData, price: e.target.value })} className="w-full border p-2 rounded" required />
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => setShowProductModal(false)} className="text-red-500">Cancel</button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
