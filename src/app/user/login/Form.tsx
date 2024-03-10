"use client"

import { useRef } from "react";
import Transition from "@/app/components/Transition";
import Link from "next/link";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import { setCookie } from "cookies-next";
import Cryptr from "cryptr";
import { useRouter } from "next/navigation";

export default function Form({ loginUser }: { loginUser: any }) {

    const router = useRouter();

    const toast = useRef<Toast>(null);

    const showToast = (val: any) => {
        toast.current?.show({ severity: val.type, summary: val.title, detail: val.message });
    };

    function createUserCookie(user: any) {
        const { id, username } = user;
        const cryptr = new Cryptr('SECRET_KEY', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });
        const encryptValue = cryptr.encrypt(JSON.stringify({ id, username }));
        setCookie("User", encryptValue, {
            maxAge: 60 * 60,
            path: "/"
        });
        router.refresh();
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPass: ""
        },
        validate: (values: any) => {
            let errors: any = {};
            if(!values.username) { errors.username = "Username is required!" };
            if(!values.password) { errors.password = "Password is required!" };
            if(!values.confirmPass) { errors.confirmPass = "Confirm password is required!" };
            if(values.password !== values.confirmPass) { errors.password = "Passwords are not matching!" };
            return errors;
        },
        onSubmit: (values: any) => {
            loginUser(values)
                .then((res: any) => {
                    if(res.type === "success") {
                        showToast(res);
                        setTimeout(() => {
                            createUserCookie(res.user);
                        }, 3000);
                    } else {
                        showToast(res);
                    }
                })
                .catch((err: any) => showToast(err));
        }
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
                        <h2 className="w-full text-[300%] font-semibold leading-[1] mb-6">Welcome Back</h2>
                    </div>
                    <form onSubmit={formik.handleSubmit} className="max-w-[500px] w-full m-auto grid grid-cols-2 gap-4 login-form">
                        <div className="col-span-2 form-item">
                            <input type="text" name="username" value={formik.values.username} onChange={(e) => formik.handleChange(e)} className={`w-full outline-none bg-slate-200 focus:bg-slate-300 px-8 py-4 block text-center rounded-xl ${errorMessage('username') && 'outline-red-500'}`} placeholder="Enter Username" />
                        </div>
                        <div className="col-span-2 form-item">
                            <input type="password" name="password" value={formik.values.password} onChange={(e) => formik.handleChange(e)} className={`w-full outline-none bg-slate-200 focus:bg-slate-300 px-8 py-4 block text-center rounded-xl ${errorMessage('password') && 'outline-red-500'}`} placeholder="Enter Password" />
                        </div>
                        <div className="col-span-2 form-item">
                            <input type="password" name="confirmPass" value={formik.values.confirmPass} onChange={(e) => formik.handleChange(e)} className={`w-full outline-none bg-slate-200 focus:bg-slate-300 px-8 py-4 block text-center rounded-xl ${errorMessage('confirmPass') && 'outline-red-500'}`} placeholder="Confirm Password" />
                        </div>
                        <div className="col-span-2 form-item">
                            <button type="submit" className="bg-green-300 hover:bg-blue-300 font-semibold px-8 py-4 rounded-xl inline-block">Login</button>
                        </div>
                    </form>
                    <div className="w-full text-center mt-6">
                        Not a member yet? <i className="ri-subtract-line"></i> <Link href="/user/register" className="font-semibold hover:underline hover:decoration-dotted">Register</Link>
                    </div>
                </div>
            </Transition>
        </main>
    )
}
