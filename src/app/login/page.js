'use client';
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function LoginPage(){
    const [formData ,setFormData]=useState({
        email:"",
        password:""
    })
    const router = useRouter();

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res = await fetch("/api/login",{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(formData)
            })
            const data = await res.json();
            if(!res.ok){
                alert("Login Failed: " + data.message || "Invalid credentials");
            }
            else{
                router.push("/admin");
            }
            }catch(error){
                console.error("Login error:", error);
            }
        }

    return(
        <>
        <div className="text-black">
            <h1 className="text-5xl text-center p-10 font-bold">Login</h1>
        </div>

        <div className="mb-8">
            <form className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="mb-4 text-black">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border  border-gray-300 rounded px-3 py-2 mb-2" required />
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input type="password" id="password" name="password" value={formData.password}
                     onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
                    <button  type="submit" className="bg-[#444444] mt-3 text-white w-full px-4 py-3 rounded-full">Login</button>
                </div>
            </form>
        </div>
        </>
    )
}