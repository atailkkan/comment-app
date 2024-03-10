"use client"

import { useRef } from "react";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

export default function FormInput({ addComment }: { addComment: any }) {

    const router = useRouter();

    const toast = useRef<Toast>(null);

    const showToast = (val: any) => {
        toast.current?.show({ severity: val.type, summary: val.title, detail: val.message });
    };

    const formik = useFormik({
        initialValues: {
            text: ""
        },
        validate: (values) => {
            let errors: any = {};
            if(!values.text) { errors.text = "Please write a comment!" }
            return errors;
        },
        onSubmit: async (values) => {
            await addComment(values.text)
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
            <form onSubmit={formik.handleSubmit} className="form-group">
                <div className="form-item">
                    <input type="text" name="text" value={formik.values.text} onChange={(e) => formik.handleChange(e)} className={`w-full bg-slate-100 px-6 py-3 rounded-xl outline-none focus:bg-slate-200 ${errorMessage('text') && 'outline-red-500'}`} placeholder="Write your comment" />
                </div>
                <div className="flex justify-end mt-3 form-item">
                    <button type="submit" className="bg-emerald-300 hover:bg-amber-300 px-4 py-2 rounded-xl">Send comment</button>
                </div>
            </form>
        </>
    )
}
