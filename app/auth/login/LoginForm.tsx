"use client"
import { Grid, Field, Text, InputGroup, Input, Button, Flex } from "@chakra-ui/react"
import { MdOutlineEmail } from "react-icons/md"
import { CiLock } from "react-icons/ci"
import { PasswordInput } from './../../../components/ui/password-input';
import Link from "next/link";
import useLogin from "@/app/hooks/useLogin";

const LoginForm = () => {
    const {formik, isLoading} =useLogin()
    return (
        <form noValidate onSubmit={formik.handleSubmit}>
            <Grid gap='20px' w={{sm: "350px", md:'450px'}} bgColor='primary-bgColor' border='1px solid' borderColor='gray.800' p={4} alignItems='center' rounded='xl'>
                <Field.Root required>
                    <Field.Label>
                        <Text fontWeight='bold'>Email</Text>
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup flex='1' startElement={<MdOutlineEmail size='16' />}>
                        <Input
                            type='email'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Enter your email'
                            h='48px'
                            border={formik.touched.email && formik.errors.email ? '1px solid red' : ''}
                        />
                    </InputGroup>
                    {formik.touched.email && formik.errors.email && (
                        <Text color="red" fontSize='0.8rem'>{formik.errors.email}</Text>
                    )} 
                </Field.Root>
    
                <Field.Root required>
                    <Field.Label>
                        <Text fontWeight='bold'>Password</Text>
                        <Field.RequiredIndicator />
                    </Field.Label>

                    <InputGroup flex='1' startElement={<CiLock size='16' color='text-third' />}>
                        <PasswordInput
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='************'
                            h='48px'
                            border={formik.touched.password && formik.errors.password ? '1px solid red' : ''}
                        />
                    </InputGroup>
                    {formik.touched.password && formik.errors.password && (
                        <Text color="red" fontSize='0.8rem'>{formik.errors.password}</Text> 
                    )} 
                </Field.Root>
                <Button
                    disabled={isLoading}
                    loadingText='signing in and redirecting.....'
                    loading={isLoading}
                    type='submit' 
                    bgColor='#b90f32'
                    color='text-primary'
                    _hover={{ bgColor: '#76091f' }}
                    fontWeight='bold' 
                    fontSize='text-base'
                >
                    Sign in
                </Button>
                <Flex gap={2} justifyContent="center">
                    <Text> create an account ?</Text>
                    <Link href='/auth/signup'>
                        <Text color="blue.400">click here</Text>
                    </Link>
                </Flex>
            </Grid>
        </form>
    )
}

export default LoginForm
