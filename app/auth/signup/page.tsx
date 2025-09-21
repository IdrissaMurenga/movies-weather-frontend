"use client"
import { Grid, Field, Text, InputGroup, Input, Button } from "@chakra-ui/react"
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
                            />
                        </InputGroup>
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
                            />
                        </InputGroup>
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
                            />
                        </InputGroup>
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
                            />
                        </InputGroup>
                    </Field.Root>

                    <Button
                        loadingText='signing up.....'
                        loading={isLoading}
                        bgColor='btn-bgColor'
                        color='text-primary'
                        _hover={{ bgColor: 'teal.900' }}
                        type='submit'
                        fontSize='text-base'
                        cursor='pointer'
                    >
                        Sign up
                    </Button>
                    <Text textAlign="center"> do you have an account? <Link href='/'>login</Link></Text>
                </Grid>
            </form>
        </Grid>
    )
}

export default Signup
