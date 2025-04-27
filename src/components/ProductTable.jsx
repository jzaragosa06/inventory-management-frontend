import React from 'react';
import { UserRole, hasRole } from '../utils/auth';

const ProductTable = ({ products, onDelete, onEdit }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                            <td className="px-6 py-4">{product.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {hasRole([UserRole.AUDITOR]) && (
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                )}
                                {hasRole([UserRole.ADMIN]) && (
                                    <button
                                        onClick={() => onDelete(product.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;