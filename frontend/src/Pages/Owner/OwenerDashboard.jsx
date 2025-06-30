import { addAdmin, addCook, addProduct, deleteAdmin, getallAdmins, getallCooks, updateStatus, updateStock } from '@/Redux/Slices/Admin/adminSlice';
import { getProducts, getStocks, Logout } from '@/Redux/Slices/Common/commonSlice';
import { addRequest, getOnstocks } from '@/Redux/Slices/Cook/cookSlice';
import React, { useEffect, useState } from 'react';
import { FaBoxOpen, FaUtensils, FaSignOutAlt, FaUsers, FaUserShield, FaTrash, FaCheck, FaTimes, FaCrown } from "react-icons/fa";
import { MdAddShoppingCart, MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OwnerDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { getallproducts, getallstocks } = useSelector((state) => state.common);
    const { addrequest, getonstocks } = useSelector((state) => state.cook);
    const { updatestatus,getallcooks,updatestock,getalladmins,deleteadmin,addadmin,addcook,addproduct } = useSelector((state) => state.admin);
     
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getStocks());
        dispatch(getOnstocks());
        dispatch(getallCooks());
        dispatch(getallAdmins());
    }, [addrequest, updatestatus,updatestock,deleteadmin,addadmin,addcook,addproduct]);

    const [formData, setFormData] = useState({ item: '', quantity: '' });
    const [showCookModal, setShowCookModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [cookData, setCookData] = useState({ name: '', email: '', password: '' });
    const [admin, setAdmin] = useState({ name: '', email: '', password: '' });
    const [productData, setProductData] = useState({ name: '', price: '' });
    const [cooks, setCooks] = useState([{ name: "John Doe", email: "john@example.com" }]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const submitstatus = (id, status) => {
        let data = { status, id };
        dispatch(updateStock(data));
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

    const handleDelteadmin = (id)=>{
        dispatch(deleteAdmin(id));
    }

    const handleCookSubmit = (e) => {
        e.preventDefault();
        setCooks([...cooks, { name: cookData.name, email: cookData.email }]);
        setCookData({ name: '', email: '', password: '' });
        setShowCookModal(false);
        dispatch(addCook(cookData))
    };

    const handleAdminSubmit = (e) => {
        e.preventDefault();
        setAdmin({ name: '', email: '', password: '' });
        setShowAdminModal(false);
        dispatch(addAdmin(admin));
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
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 lg:p-8 font-sans relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400 to-cyan-600 rounded-full opacity-15 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full opacity-10 animate-pulse delay-500"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 flex justify-between items-center mb-10">
                <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full shadow-lg">
                        <FaCrown className="text-white text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-lg">
                            Owner Dashboard
                        </h1>
                        <p className="text-gray-300 text-sm mt-1">Manage your restaurant empire</p>
                    </div>
                </div>
                
                <button 
                    onClick={handleLogout} 
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center font-semibold group"
                >
                    <FaSignOutAlt className="mr-2 group-hover:rotate-12 transition-transform duration-300" /> 
                    Logout
                </button>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 flex flex-wrap justify-center gap-4 lg:gap-6 mb-10">
                <button 
                    onClick={() => setShowCookModal(true)} 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center font-semibold group"
                >
                    <FaUtensils className="mr-3 group-hover:rotate-12 transition-transform duration-300" />
                    Add Cook
                </button>
                <button 
                    onClick={() => setShowProductModal(true)} 
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center font-semibold group"
                >
                    <MdAddShoppingCart className="mr-3 group-hover:rotate-12 transition-transform duration-300" />
                    Add Product
                </button>
                <button 
                    onClick={() => setShowAdminModal(true)} 
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center font-semibold group"
                >
                    <FaUserShield className="mr-3 group-hover:rotate-12 transition-transform duration-300" />
                    Add Admin
                </button>
            </div>

            {/* Current Stock Section */}
            <div className="relative z-10 max-w-6xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-10 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 p-3 rounded-full mr-4 shadow-lg">
                        <FaBoxOpen className="text-white text-xl" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">Current Stock</h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/20">
                                <th className="p-4 text-lg font-semibold text-gray-200">Item</th>
                                <th className="p-4 text-lg font-semibold text-gray-200">Quantity [kg / ltr]</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getallstocks?.[0]?.map((stock, index) => (
                                <tr key={stock.id} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-300">
                                    <td className="p-4 font-medium text-white">{stock?.productname}</td>
                                    <td className="p-4">
                                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold">
                                            {stock?.quantity}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Cooks Section */}
            <div className="relative z-10 max-w-6xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-10 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-full mr-4 shadow-lg">
                        <FaUsers className="text-white text-xl" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">All Cooks</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getallcooks?.[0]?.map((cook, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-2 rounded-full">
                                    <FaUtensils className="text-white text-sm" />
                                </div>
                                <h3 className="font-bold text-white text-lg">{cook.name}</h3>
                            </div>
                            <p className="text-gray-300">{cook.email}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Admins Section */}
            <div className="relative z-10 max-w-6xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-10 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-full mr-4 shadow-lg">
                        <FaUserShield className="text-white text-xl" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">All Admins</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getalladmins?.[0]?.map((admin, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105 group">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-2 rounded-full">
                                        <FaUserShield className="text-white text-sm" />
                                    </div>
                                    <h3 className="font-bold text-white text-lg">{admin.name}</h3>
                                </div>
                                <button 
                                    onClick={() => handleDelteadmin(admin?._id)}
                                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                                >
                                    <FaTrash className="text-sm" />
                                </button>
                            </div>
                            <p className="text-gray-300">{admin.email}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Requests Section */}
            <div className="relative z-10 max-w-6xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-10 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full mr-4 shadow-lg">
                        <MdDashboard className="text-white text-xl" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">All Requests</h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/20">
                                <th className="p-4 text-lg font-semibold text-gray-200">Item</th>
                                <th className="p-4 text-lg font-semibold text-gray-200">Quantity [kg / ltr]</th>
                                <th className="p-4 text-lg font-semibold text-gray-200">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getonstocks?.[0]?.map((stock) => (
                                <tr key={stock.id} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-300">
                                    <td className="p-4 font-medium text-white">{stock?.productname}</td>
                                    <td className="p-4">
                                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold">
                                            {stock?.quantity}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2 flex-wrap">
                                            {stock?.status === "pending" ? (
                                                <>
                                                    <button 
                                                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-full font-semibold flex items-center transform hover:scale-105 transition-all duration-300" 
                                                        onClick={() => submitstatus(stock?._id, "Approved")}
                                                    >
                                                        <FaCheck className="mr-2" />
                                                        Approve
                                                    </button>
                                                    <button 
                                                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-full font-semibold flex items-center transform hover:scale-105 transition-all duration-300" 
                                                        onClick={() => submitstatus(stock?._id, "Rejected")}
                                                    >
                                                        <FaTimes className="mr-2" />
                                                        Reject
                                                    </button>
                                                </>
                                            ) : stock?.status === "Approved" ? (
                                                <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full font-semibold flex items-center">
                                                    <FaCheck className="mr-2" />
                                                    Approved
                                                </span>
                                            ) : stock?.status === "processing" ? (
                                                <>
                                                    <button 
                                                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-full font-semibold flex items-center transform hover:scale-105 transition-all duration-300" 
                                                        onClick={() => submitstatus(stock?._id, "Approved")}
                                                    >
                                                        <FaCheck className="mr-2" />
                                                        Approve
                                                    </button>
                                                    <button 
                                                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-full font-semibold flex items-center transform hover:scale-105 transition-all duration-300" 
                                                        onClick={() => submitstatus(stock?._id, "Rejected")}
                                                    >
                                                        <FaTimes className="mr-2" />
                                                        Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="bg-gradient-to-r from-red-400 to-red-500 text-white px-4 py-2 rounded-full font-semibold flex items-center">
                                                    <FaTimes className="mr-2" />
                                                    Rejected
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Cook Modal */}
            {showCookModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md transform animate-pulse">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-full mr-4">
                                <FaUtensils className="text-white text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Add Cook</h2>
                        </div>
                        <form onSubmit={handleCookSubmit} className="space-y-6">
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Name" 
                                value={cookData.name} 
                                onChange={e => setCookData({ ...cookData, name: e.target.value })} 
                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300" 
                                required 
                            />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                value={cookData.email} 
                                onChange={e => setCookData({ ...cookData, email: e.target.value })} 
                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300" 
                                required 
                            />
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={cookData.password} 
                                onChange={e => setCookData({ ...cookData, password: e.target.value })} 
                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300" 
                                required 
                            />
                            <div className="flex justify-end gap-4">
                                <button 
                                    type="button" 
                                    onClick={() => setShowCookModal(false)} 
                                    className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300"
                                >
                                    Add Cook
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Product Modal */}
            {showProductModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md transform animate-pulse">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-3 rounded-full mr-4">
                                <MdAddShoppingCart className="text-white text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Add Product</h2>
                        </div>
                        <form onSubmit={handleProductSubmit} className="space-y-6">
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Product Name" 
                                value={productData.name} 
                                onChange={e => setProductData({ ...productData, name: e.target.value })} 
                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300" 
                                required 
                            />
                            <input 
                                type="number" 
                                name="price" 
                                placeholder="Product Price" 
                                value={productData.price} 
                                onChange={e => setProductData({ ...productData, price: e.target.value })} 
                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300" 
                                required 
                            />
                            <div className="flex justify-end gap-4">
                                <button 
                                    type="button" 
                                    onClick={() => setShowProductModal(false)} 
                                    className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-3 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300"
                                >
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Admin Modal */}
            {showAdminModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md transform animate-pulse">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-full mr-4">
                                <FaUserShield className="text-white text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Add Admin</h2>
                        </div>
                        <form onSubmit={handleAdminSubmit} className="space-y-6">
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Name" 
                                value={admin.name} 
                                onChange={e => setAdmin({ ...admin, name: e.target.value })} 
                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300" 
                                required 
                            />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                value={admin.email} 
                                onChange={e => setAdmin({ ...admin, email: e.target.value })} 
                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300" 
                                required 
                            />
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={admin.password} 
                                onChange={e => setAdmin({ ...admin, password: e.target.value })} 
                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300" 
                                required 
                            />
                            <div className="flex justify-end gap-4">
                                <button 
                                    type="button" 
                                    onClick={() => setShowAdminModal(false)} 
                                    className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300"
                                >
                                    Add Admin
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OwnerDashboard;