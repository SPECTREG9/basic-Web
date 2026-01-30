"use client";

import React, { useState } from "react";

function FormPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("กรุณากรอกอีเมลและรหัสผ่าน");
            return;
        }

        if (!email.includes("@")) {
            setError("กรุณากรอกอีเมลที่ถูกต้อง");
            return;
        }

        if (password.length < 6) {
            setError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
            return;
        }

        alert("ลงทะเบียนสำเร็จ!");
        setEmail("");
        setPassword("");
    };
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">ลงทะเบียนเข้าสู่ระบบ</h1>
                <p className="text-center text-gray-600 mb-6">กรุณากรอกข้อมูลของคุณ</p>
                
                {error && (
                    <div className="alert alert-error mb-4">
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-1">กรุณาระบุ E-Mail</label>
                        <input
                            type="email"
                            placeholder="example@email.com"
                            className="input input-bordered w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">กรุณาระบุ รหัสผ่าน</label>
                        <input
                            type="password"
                            placeholder="type here"
                            className="input input-bordered w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">ลงทะเบียน</button>
                </form>
            </div>
        </div>
    );
}

export default FormPage;