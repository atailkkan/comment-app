"use client"

import { useState, useRef } from "react";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

export default function ReplyFormInput({ addReply }: { addReply: any }) {

    const router = useRouter();

    const toast = useRef<Toast>(null);

    const showToast = (val: any) => {
        toast.current?.show({ severity: val.type, summary: val.title, detail: val.message });
    };

    const [isVisible, setIsVisible] = useState<boolean>(false);

    function showReply() {
        setIsVisible(!isVisible);
    }

    const formik = useFormik({
        initialValues: {
            text: ""
        },
        validate: (values) => {
            let errors: any = {};
            if(!values.text) { errors.text = "Please write a reply!" }
            return errors;
        },
        onSubmit: async (values) => {
            await addReply(values.text)
                .then((res: any) => showToast(res));
            formik.resetForm();
            router.refresh();
        }
    });

    let formikTouched: any = formik.touched;
    let formikErrors: any = formik.errors;

    const isValid = (name: string) => !!(formikTouched[name] && formikErrors[name]);
    const errorMessage = (name: string) => {
        return isValid(name) && <span className="p-error">{formikErrors[name]}</span>;
    };

    return (
        <>
            <Toast ref={toast} position="top-center" />
            <div className="w-full text-[70%] text-right">
                <button className="text-blue-500 hover:text-black" onClick={() => showReply()}>
                    <i className="ri-reply-fill mr-1"></i>
                    <span>Reply</span>
                </button>
                {
                    isVisible && <div className="w-full mt-2 reply-input">
                        <form onSubmit={formik.handleSubmit} className="flex items-center form-group">
                            <div className="w-full mr-2 form-item">
                                <input type="text" name="text" value={formik.values.text} onChange={(e) => formik.handleChange(e)} className={`w-full bg-white px-6 py-3 rounded-xl outline-none ${errorMessage("text") && 'outline-red-500'}`} placeholder="Write your reply" />
                            </div>
                            <div className="flex justify-end form-item">
                                <button type="submit" className="bg-emerald-300 hover:bg-amber-300 px-4 py-3 rounded-xl">Send</button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}
