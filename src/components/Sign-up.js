import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword,doSignInWithGoogle } from "../firebase/auth";
import { useAuth } from "../context/authContext";

const SignUp = () => {
    const {userLoggedIn} = useAuth;
    // const [email, setEmail] = useState("motts2003@gmail.com");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn,setIsSigningIn] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isSigningIn){
        // setIsSigningIn(true);
        await doCreateUserWithEmailAndPassword(email,password);
        navigate("/");
    }
    // Check the login credentials or logic here (for simplicity, we'll skip it)
     // Navigate to MainPage after submit
};

const LoginPage = () => {
    navigate("/");
};


const onGoogleSignIn = async(e) =>{
    e.preventDefault();
    if(!isSigningIn){
        setIsSigningIn(true);
        await doSignInWithGoogle().catch(err => {
            setIsSigningIn(false);
        })
    }
};

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold text-center mb-6">SignUp</h2>
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
        <p className="text-gray-400 font-bold mx-32 m">---or---</p>
        <button
            onClick={LoginPage}
            className="w-32 mx-24 py-1 px-1 hover:underline text-[#635fc7] font-bold rounded-3xl transition duration-300"
        >
            Login
        </button>
        
    </div>
    </div>
    );
};

export default SignUp;