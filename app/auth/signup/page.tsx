"use client"
import { Grid, Field, Text, InputGroup, Input, Button, Flex } from "@chakra-ui/react"
import { MdOutlineEmail } from "react-icons/md"
import { PasswordInput } from "@/components/ui/password-input"
import { CiLock } from "react-icons/ci"
import { GrMapLocation } from "react-icons/gr"
import Link from "next/link"
import useSignup from "@/app/hooks/useSignup"

const Signup = () => {
    const { formik, isLoading } = useSignup()
    const { handleBlur, handleSubmit, handleChange, touched, errors, values } = formik;

    return (
        <Grid height='100vh' placeItems='center'>
            <form noValidate onSubmit={handleSubmit}>
                <Grid gap='20px' bgColor='primary-bgColor' border='1px solid' borderColor='gray.800' w='450px' p={4} alignItems='center' mx='auto' rounded='xl'>
                    <Field.Root required>
                        <Field.Label>
                            <Text fontWeight='bold'>name</Text>
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <InputGroup flex='1' startElement=''>
                            <Input
                                type='text'
                                name='name'
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='user name'
                                h='48px'
                                border={touched.name && errors.name ? '1px solid red' : ''}
                            />
                        </InputGroup>
                        {touched.name && errors.name && (
                            <Text color="red" fontSize='0.8rem'>{errors.name}</Text>
                        )} 
                    </Field.Root>
                    
                    <Field.Root required>
                        <Field.Label>
                            <Text fontWeight='bold'>Email</Text>
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <InputGroup flex='1' startElement={<MdOutlineEmail size='16' color='text-third' />}>
                            <Input
                                type='text'
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Enter your email'
                                h='48px'
                                border={touched.email && errors.email ? '1px solid red' : ''}
                            />
                        </InputGroup>
                        {touched.email && errors.email && (
                            <Text color="red" fontSize='0.8rem'>{errors.email}</Text>
                        )} 
                    </Field.Root>
        
                    <Field.Root required>
                        <Field.Label>
                            <Text fontWeight='bold'>Password</Text>
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <InputGroup flex='1' startElement={<CiLock size='16' color='text-third' />}>
                            <PasswordInput 
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='************'
                                h='48px'
                                border={touched.password && errors.password ? '1px solid red' : ''}
                            />
                        </InputGroup>
                        {touched.password && errors.password && (
                            <Text color="red" fontSize='0.8rem'>{errors.password}</Text>
                        )} 
                    </Field.Root>
                    <Field.Root required>
                        <Field.Label>
                            <Text fontWeight='bold'>City</Text>
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <InputGroup flex='1' startElement={<GrMapLocation size='16' color='text-third' />}>
                            <Input 
                                name='city'
                                placeholder="enter your city"
                                h='48px'
                                value={values.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                border={touched.city && errors.city ? '1px solid red' : ''}
                            />
                        </InputGroup>
                        {touched.city && errors.city && (
                            <Text color="red" fontSize='0.8rem'>{errors.city}</Text>
                        )} 
                    </Field.Root>

                    <Button
                        loadingText='signing up.....'
                        loading={isLoading}
                        bgColor='blue.500'
                        color='text-primary'
                        _hover={{ bgColor: 'blue.900' }}
                        type='submit'
                        fontSize='text-base'
                        cursor='pointer'
                    >
                        Sign up
                    </Button>
                    <Flex gap={2} justifyContent="center">
                        <Text> already have an account ?</Text>
                        <Link href='/auth/signup'>
                            <Text color="blue.400">login</Text>
                        </Link>
                    </Flex>
                </Grid>
            </form>
        </Grid>
    )
}

export default Signup
