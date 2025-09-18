"use client"
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";

const useLogin = () => {
    const router = useRouter()
    const [error, setError] = useState('')

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
        onSubmit: async (values, {setFieldError, setSubmitting, setStatus}) => {
            try {
                // Auth.js Login Credentials provider
                const res = await signIn("credentials", {
                    email: values.email,
                    password: values.password,
                    redirect: false,
                })
                console.log('signIn result:', res)

                if (!res) {
                    toaster.create({
                        title: "Login failed. Try again.",
                        type: "error",
                        duration: 3000,
                    });
                    return;
                }
                if (res?.error) {
                    if (res.error === "user not found") {
                        toaster.create({
                            title: "user not found",
                            type: "error",
                            duration: 3000,
                        });
                        return
                    } else if (res.error === "incorrect password") {
                        setFieldError("password", "incorrect password")
                    } else {
                        toaster.create({
                            title: res.error,
                            type: "error",
                            duration:3000
                        })
                    }
                    return
                }
                setDelayedLoading(true);
                router.replace("/pages/dashboard");
            
            } catch (error) {
                toaster.create({
                    title: "Something went wrong. Try again.",
                    type: "error",
                    duration:3000
                })
            } finally {
                setSubmitting(false)
            }
        },
    })
    const isLoading = delayedLoading || formik.isSubmitting
    return { formik, isLoading }
}

export default useLogin