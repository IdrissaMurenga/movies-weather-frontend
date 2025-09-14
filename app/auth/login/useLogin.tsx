"use client"
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const useLogin = () => {
    const router = useRouter()

    // useState hook to manage loading state
    const [delayedLoading, setDelayedLoading] = useState(false)

    // useFormik hook from formik to manage form state and validation
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
        }),
        
        // handleSubmit function to handle form submission
        onSubmit: async (values, {setFieldError, setSubmitting}) => {
            try {
                // Auth.js → Credentials provider (no redirect so we can handle errors)
                const res = await signIn("credentials", {
                    email: values.email,
                    password: values.password,
                    redirect: false,
                })
                console.log('signIn result:', res)

                if (!res) {
                    setFieldError("password", "Login failed. Try again.");
                    return;
                }
                if (res.error) {
                    const msg = res.error.toLowerCase();
                    if (msg.includes("user not found")) {
                        setFieldError("email", "No user found with this email");
                    } else if (msg.includes("incorrect password") || msg.includes("password")) {
                        setFieldError("password", "Incorrect password");
                    } else if (msg === "credentialssignin") {
                        // generic: authorize returned null
                        setFieldError("password", "Invalid email or password");
                    } else {
                        setFieldError("password", res.error);
                    }
                    return; // ⛔️ don’t navigate
                }
                if (res?.ok) {

                    setDelayedLoading(true);

                    router.replace("/pages/dashboard");

                }
            } catch (error) {
            } finally {
                setSubmitting(false)
            }
        },
    })
    const isLoading = delayedLoading || formik.isSubmitting
    return { formik, isLoading }
}

export default useLogin