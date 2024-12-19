import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("motts2003@gmail.com");
    const [password, setPassword] = useState("Yeahitsme@2003");
    const navigate = useNavigate(); // Initialize useNavigate

const handleSubmit = (e) => {
    e.preventDefault();
    // Check the login credentials or logic here (for simplicity, we'll skip it)
    navigate("/main"); // Navigate to MainPage after submit
};

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="example@mail.com"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="MyPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <button
            type="submit"
            className="w-full py-2 px-4 hover:opacity-70 bg-[#635fc7] text-white font-semibold rounded-3xl transition duration-300"
        >
            Submit
        </button>
        </form>
    </div>
    </div>
    );
};

export default Login;