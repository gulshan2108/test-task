import React from 'react'
import { Form,Button } from 'react-bootstrap';
import {useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


const SignIn =(props)=>{
    const { register, handleSubmit } = useForm();
    const [state,setState]=useState({loginErr:""})
    useEffect(()=>{
        if(localStorage.getItem("AuthToken"))
        {
            props.history.push("/dashboard")
        }
    },[])

    
    const onSubmit=(data,e)=>{
         
        let users= JSON.parse(localStorage.getItem('users'));
        if(!users){
            setState({...state,loginErr:"invalid password or email"})
        }
        users.map((item)=>
             	{
             		if(item.email===data.email&&item.password===data.password)
             		{
                        const user={
                             "firstName": item.firstName,
                             "lastName":item.lastName,
                             "email":item.email,
                        }
                        localStorage.setItem('AuthToken',"logedIn")
                        localStorage.setItem('logedInUser',JSON.stringify(user))
             			props.history.push("/dashboard")
             		}
             		else
             		{
             			setState({...state,loginErr:"invalid password or email"})
             	    }
            	}
            )
         e.target.reset()
    }

    return (
        <div className="authForm">
            <div className="authFormInner">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <h1>SignIn</h1>
                    <p className="errorMsg">{state.loginErr}</p>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" {...register("email")} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" {...register("password")} />
                    </Form.Group>
                    <Button variant="primary" type="submit" block>
                        SignIn
                    </Button>
                </Form>
                <p className="bottomText text-right">
                    If you not SignUp please  <Link to="/signup">sign up</Link>
                </p>
            </div>
        </div>
    )
}
export default SignIn;