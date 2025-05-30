import React, { useState, useEffect } from "react";
import api from "../api/axios";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import { UserRole, hasRole, getUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Home() {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [user] = useState(getUser());
    const navigate = useNavigate(); 


    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await api.get(`/products/search?query=${searchQuery}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const handleCreate = async (formData) => {
        try {
            await api.post('/products', formData);
            fetchProducts();
            setShowForm(false);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleUpdate = async (formData) => {
        try {
            await api.patch(`/products/${editingProduct.id}`, formData);
            fetchProducts();
            setEditingProduct(null);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 flex justify-between items-center">

                <div className="flex flex-col text-sm text-gray-700">
                    <p className="font-semibold">{user?.email}</p>
                    <p className="text-gray-500 capitalize">{user?.role}</p>
                    <div onClick={handleLogout} className="text-sm font-medium text-red-500 underline cursor-grab">
                        Log out
                    </div>
                </div>


                <h1 className="text-3xl font-bold text-gray-900 text-center flex-1">
                    Product Management
                </h1>

            </div>


            <div className="mb-6">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="flex-1 p-2 border rounded-md"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Search
                    </button>

                    {hasRole([UserRole.ADMIN, UserRole.USER]) && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ml-4"
                        >
                            Add Product
                        </button>
                    )}
                </div>

            </div>

            {(showForm || editingProduct) && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <ProductForm
                            onSubmit={editingProduct ? handleUpdate : handleCreate}
                            initialData={editingProduct}
                        />
                        <button
                            onClick={() => {
                                setShowForm(false);
                                setEditingProduct(null);
                            }}
                            className="mt-4 w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <ProductTable
                products={products}
                onDelete={handleDelete}
                onEdit={setEditingProduct}
            />
        </div>
    );
}

export default Home;