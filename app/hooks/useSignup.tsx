"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useFormik } from "formik"
import * as Yup from "yup"
import { SIGNUP } from "@/libs/graphql"
import { useMutation } from "@apollo/client/react"
import { toaster } from "@/components/ui/toaster"

interface SignupInput {
    name: string;
    email: string;
    password: string;
    city: string;
}

interface SignupResponse {
    signup: {
        token: string;
        user: {
            id: string;
            email: string;
        };
    };
}

const useSignup = () => {
    const [signup] = useMutation<SignupResponse, { input: SignupInput }>(SIGNUP);
    const router = useRouter();
    const [delayLoading, setDelayLoading] = useState(false);

    const formik = useFormik<SignupInput>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            city: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, 'Name must be at least 2 characters')
                .required('Name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                )
                .required('Password is required'),
            city: Yup.string()
                .required('City is required'),
        }),
        onSubmit: async (values) => {
            try {
                const { data, error } = await signup({
                    variables: { input: values },
                });

                if (error) {
                    toaster.create({
                        title: "Signup failed",
                        description: error?.message,
                        type: "error",
                        duration: 3000,
                    });
                    return;
                }

                if (!data?.signup?.token) {
                    toaster.create({
                        title: "Signup failed",
                        description: "Unable to create account. Please try again.",
                        type: "error",
                        duration: 3000,
                    });
                    return;
                }

                const signInResult = await signIn("credentials", {
                    email: values.email,
                    password: values.password,
                    redirect: false,
                });

                if (signInResult?.error) {
                    toaster.create({
                        title: "Auto-login failed",
                        description: "Account created but unable to log in automatically. Please try logging in manually.",
                        type: "warning",
                        duration: 5000,
                    });
                    router.push("/login");
                    return;
                }

                toaster.create({
                    title: "Success",
                    description: "Account created successfully!",
                    type: "success",
                    duration: 3000,
                });

                setDelayLoading(true);
                router.replace("/pages/dashboard");

            } catch (error) {
                console.error("Signup error:", error);
                toaster.create({
                    title: "Error",
                    description: "An unexpected error occurred. Please try again.",
                    type: "error", 
                    duration: 3000,
                });
            }
        }
    });

    return {
        formik,
        isLoading: delayLoading || formik.isSubmitting
    };
};

export default useSignup;