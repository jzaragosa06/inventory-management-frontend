import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Button from "../components/Button";

function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {isLogin ? 'Sign in to your account' : 'Create new account'}
                    </h2>
                    <div className="mt-2 text-center">
                        <Button
                            className="text-blue-600 hover:text-blue-500"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                        </Button>
                    </div>
                </div>
                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {isLogin ? (
                        <LoginForm onSuccess={() => {
                            // Handle successful login (e.g., redirect to dashboard)
                            console.log('Login successful');
                        }} />
                    ) : (
                        <RegisterForm onSuccess={() => {
                            // Switch to login form after successful registration
                            setIsLogin(true);
                        }} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Auth;