'use client';

import { useForm, SubmitHandler } from "react-hook-form"

export default function LoginPage() {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<any>()
    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            const response = await fetch('api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="antialiased bg-gray-200 text-gray-900 font-sans">
            <div className="flex items-center h-screen w-full">
                <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                    <span className="block w-full text-xl uppercase font-bold mb-4">Login</span>
                    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 md:w-full">
                            <label htmlFor="email" className="block text-sm mb-1">Email *</label>
                            <input
                                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                                aria-invalid={errors.email ? "true" : "false"}
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="Email"
                            />
                            {errors.email?.type === "required" && (
                                <p role="alert" style={{ fontSize: 12, color: 'red', paddingTop: 5 }}>Email is required</p>
                            )}
                        </div>
                        <div className="mb-6 md:w-full">
                            <label htmlFor="password" className="block text-sm mb-1">Password *</label>
                            <input
                                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                                type="password"
                                {...register("password", { required: true })}
                                aria-invalid={errors.password ? "true" : "false"}
                                placeholder="Password"
                            />
                            {errors.password?.type === "required" && (
                                <p role="alert" style={{ fontSize: 12, color: 'red', paddingTop: 5 }}>Password is required</p>
                            )}
                        </div>
                        <input value='Submit' type="submit" className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" />
                    </form>
                    <a className="text-blue-700 text-center text-sm" href="/login">Forgot password?</a>
                </div>
            </div>
        </div>
    )
};