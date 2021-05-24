import React from 'react'
import { Form,Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {useEffect} from 'react'
import {  Link } from "react-router-dom";


const SignUp = (props) => {
    const { register, handleSubmit,formState: { errors } } = useForm();
    useEffect(()=>{
        if(localStorage.getItem("AuthToken"))
        {
            props.history.push("/dashboard")
        }
    },[])

    const onSubmit=(data,e)=>{
        let users= JSON.parse(localStorage.getItem('users'));
				 users=users!=null?users:[]
                 users.push(data);
         localStorage.setItem('users',JSON.stringify(users))
        e.target.reset()
        props.history.push("/")

    }

    return(
        <div className="authForm">
            <div className="authFormInner">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <h1>SignUp</h1>  
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" {...register("firstName", 
                        {required:{value: true, message: "First Name   is required",},})}/>
                    </Form.Group>
                    {errors.firstName && <p className="errorMsg">{errors.firstName.message}</p>}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" {...register("lastName",
                        {required:{value: true, message: "last name  is required",},})}/>
                    </Form.Group>  
                    {errors.lastName && <p className="errorMsg">{errors.lastName.message}</p>}               
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" {...register("email",
                        {required:{value: true, message: "email   is required",},})} />
                    </Form.Group>
                    {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" {...register("password",
                        {required:{value: true, message: "password   is required",},})} />
                    </Form.Group>
                    {errors.password && <p className="errorMsg">{errors.password.message}</p>}
                    <Button variant="primary" type="submit" block>
                        Submit
                    </Button>
                </Form>
                <p className="bottomText text-right">
                    Already registered <Link to="/">sign in</Link>
                </p>
            </div>
        </div>
    )
}
export default SignUp;