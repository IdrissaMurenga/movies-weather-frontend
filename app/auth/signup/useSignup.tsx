"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useFormik } from "formik"
import * as Yup from "yup"
import { SIGNUP } from "@/libs/graphql"
import { useMutation } from "@apollo/client/react"

const useSignup = () => {
    const [signup, { error, loading }] = useMutation(SIGNUP);
    const router = useRouter()
    
    // useState hook to manage loading state
    const [delayedLoading, setDelayedLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            city: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email().required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
            city: Yup.string().required('City is required'),
        }),
        onSubmit: async (values) => {
            
            const { data }=await signup({
                variables: { input: values }
            })

            const res = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false
            })

            if (res.ok) {
                setDelayedLoading(true);
                router.replace("/pages/dashboard");
            }
        }
    })
    const isLoading = delayedLoading || formik.isSubmitting

    return { formik, isLoading }
}

export default useSignup