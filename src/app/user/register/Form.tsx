"use client"

import { useRef } from "react";
import Transition from "@/app/components/Transition";
import Link from "next/link";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";

export default function Form({ registerUser }: { registerUser: any }) {

    const toast = useRef<Toast>(null);

    const showToast = (val: any) => {
        toast.current?.show({ severity: val.type, summary: val.title, detail: val.message });
    };

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            username: "",
            password: ""
        },
        validate: (values: any) => {
            let errors: any = {};
            if(!values.firstname) { errors.firstname = "Firstname is required!" };
            if(!values.lastname) { errors.lastname = "Lastname is required!" };
            if(!values.username) { errors.username = "Username is required!" };
            if(!values.password) { errors.password = "Password is required!" };
            return errors;
        },
        onSubmit: (values: any) => {
            registerUser(values)
                .then((res: any) => showToast(res))
                .catch((err: any) => showToast(err));
        },
    });

    let formikTouched: any = formik.touched;
    let formikErrors: any = formik.errors;

    const isValid = (name: string) => !!(formikTouched[name] && formikErrors[name]);
    const errorMessage = (name: string) => {
        return isValid(name) && <span className="p-error">{formikErrors[name]}</span>;
    };

    return (
        <main className="w-full flex flex-col justify-center flex-grow">
            <Toast ref={toast} position="top-center" />
            <Transition>
                <div className="w-full text-center main-header">
                    <div className="author-info">
                        <h2 className="w-full text-[300%] font-semibold leading-[1] mb-6">Create an Account</h2>
                    </div>
                    <form onSubmit={formik.handleSubmit} className="max-w-[1000px] w-full m-auto grid grid-cols-2 gap-4 login-form">
                        <div className="col-span-1 form-item">
                            <input type="text" name="firstname" value={formik.values.firstname} onChange={(e) => formik.handleChange(e)} className={`w-full outline-none bg-slate-200 focus:bg-slate-300 px-8 py-4 block text-center rounded-xl ${errorMessage('firstname') && 'outline-red-500'}`} placeholder="Enter First Name" />
                        </div>
                        <div className="col-span-1 form-item">
                            <input type="text" name="lastname" value={formik.values.lastname} onChange={(e) => formik.handleChange(e)} className={`w-full outline-none bg-slate-200 focus:bg-slate-300 px-8 py-4 block text-center rounded-xl ${errorMessage('lastname') && 'outline-red-500'}`} placeholder="Enter Last Name" />
                        </div>
                        <div className="col-span-1 form-item">
                            <input type="text" name="username" value={formik.values.username} onChange={(e) => formik.handleChange(e)} className={`w-full outline-none bg-slate-200 focus:bg-slate-300 px-8 py-4 block text-center rounded-xl ${errorMessage('username') && 'outline-red-500'}`} placeholder="Enter Username" />
                        </div>
                        <div className="col-span-1 form-item">
                            <input type="password" name="password" value={formik.values.password} onChange={(e) => formik.handleChange(e)} className={`w-full outline-none bg-slate-200 focus:bg-slate-300 px-8 py-4 block text-center rounded-xl ${errorMessage('password') && 'outline-red-500'}`} placeholder="Enter Password" />
                        </div>
                        <div className="col-span-2 text-center form-item">
                            <button type="submit" className="bg-green-300 hover:bg-blue-300 font-semibold px-8 py-4 rounded-xl inline-block">Register</button>
                        </div>
                    </form>
                    <div className="w-full text-center mt-6">
                        Already a member? <i className="ri-subtract-line"></i> <Link href="/user/login" className="font-semibold hover:underline hover:decoration-dotted">Login</Link>
                    </div>
                </div>
            </Transition>
        </main>
    );
}
