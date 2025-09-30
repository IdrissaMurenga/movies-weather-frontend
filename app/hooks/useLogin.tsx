"use client"
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";

const useLogin = () => {
    const router = useRouter()

    // useState hook to manage loading state
    const [delayLoading, setDelayLoading] = useState(false)

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
        onSubmit: async (values, {setSubmitting}) => {
            try {
                // Auth.js Login Credentials provider
                const res = await signIn("credentials", {
                    email: values.email,
                    password: values.password,
                    redirect: false,
                })

                // if no response or response fails
                if (!res) {
                    toaster.create({
                        title: "Login failed. Try to login again.",
                        type: "error",
                        duration: 3000,
                    });
                    return;
                }

                // check if theres any error on login process or invalid credentials 
                if (res?.error) {
                    toaster.create({
                        title: res.code,
                        type: res.code,
                        duration: 3000,
                    })
                    return
                }
                // if response is successfull set loading state and redirect to dashboard
                setDelayLoading(true);
                router.replace("/pages/dashboard");
            
            } catch (error) {
                toaster.create({
                    title: "Something went wrong. Please Try again.",
                    type: "error",
                    duration:3000
                })
            } finally {
                setSubmitting(false)
            }
        },
    })
    const isLoading = delayLoading || formik.isSubmitting
    return { formik, isLoading }
}

export default useLogin