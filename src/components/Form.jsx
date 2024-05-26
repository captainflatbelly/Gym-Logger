import React from 'react';
import { useForm } from 'react-hook-form';

const Form = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    const password = watch('password', '');

    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-black shadow-md rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>
                <form id="form" className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
                            {...register("username", { required: "Username is required", minLength: { value: 3, message: "Username must be at least 3 characters" } })}
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                    </div>

                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
                            {...register("email", { 
                                required: "Email is required", 
                                pattern: { 
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 
                                    message: "Invalid email address" 
                                } 
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
                            {...register("password", { 
                                required: "Password is required", 
                                minLength: { value: 6, message: "Password must be at least 6 characters" } 
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
                            {...register("confirmpassword", { 
                                required: "Confirm password is required", 
                                validate: value => value === password || "Passwords do not match" 
                            })}
                        />
                        {errors.confirmpassword && <p className="text-red-500 text-sm mt-1">{errors.confirmpassword.message}</p>}
                    </div>

                    <button className="w-full bg-[#00df9a] text-white py-2 rounded-lg hover:bg-green-500 transition duration-300">Sign Up</button>
                </form>
            </div>
        </section>
    );
};

export default Form;
