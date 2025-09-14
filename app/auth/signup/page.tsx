import { Grid, Field, Text, InputGroup, Input, Button } from "@chakra-ui/react"
import { MdOutlineEmail } from "react-icons/md"
import { PasswordInput } from "@/components/ui/password-input"
import { CiLock } from "react-icons/ci"
import Link from "next/link"

const Signup = () => {
    return (
        <Grid height='100vh' placeItems='center'>
            <form>
                <Grid gap='20px' bgColor='primary-bgColor' border='1px solid' borderColor='gray.800' w='450px' p={4} alignItems='center' mx='auto' rounded='xl'>                
                    <Field.Root required>
                        <Field.Label>
                            <Text fontWeight='bold'>name</Text>
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <InputGroup flex='1' startElement=''>
                            <Input
                                type='text'
                                name='userName'
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
                                placeholder='************'
                                h='48px'
                            />
                        </InputGroup>
                    </Field.Root>

                    <Button
                        loadingText='signing up.....'
                        bgColor='gray.900'
                        color='text-primary'
                        _hover={{ bgColor: 'btn-bgColor' }}
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
