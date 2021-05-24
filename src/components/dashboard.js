import React from 'react'
import { useState, useEffect } from 'react'

import { Navbar, Button, Nav } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const DashBoard = (props) => {
    const history = useHistory();
    const [user, setUser] = useState({})
    const [state, setState] = useState({ message: "" })


    const handleLogout = (e) => {
        localStorage.removeItem("AuthToken");
        localStorage.removeItem("logedInUser");
        
        const removeFrame = document.getElementById("iframe");
        if(removeFrame){
        removeFrame.parentNode.removeChild(removeFrame);
        }
        history.push("/");

    }
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('logedInUser'));
        setUser(user)

    }, [])
   
    window.onmessage = function (event) {
        if (event.data === "closeIframe") {
            const removeFrame = document.getElementById("iframe");
            removeFrame.parentNode.removeChild(removeFrame);

        }
        else {
            setState({ ...state, message: event.data })
        }

    };

    const openFrame = () => {
        let iframe = document.createElement("iframe");
        iframe.src = `http://localhost:5001`;
        iframe.id = "iframe";
        iframe.style.position = "absolute";
        iframe.style.zIndex = "999";
        iframe.style.height = "50%";
        iframe.style.width = "50%";
        iframe.style.top = "15%";
        iframe.style.left = "25%"
        iframe.style.backgroundColor = "white";
        iframe.style.border = "1px";
        document.body.prepend(iframe);
        document.body.style.overflow = "hidden";
    };

    return (
        <div>
            <Navbar bg="light">
                <Navbar.Brand href="#" className="mr-auto">{user.firstName} {user.lastName}</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="mr-2 ml-auto">
                        <Button onClick={handleLogout} >LogOut</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Button onClick={() => openFrame()} variant="secondary" className="m-4" >Open Frame</Button>
            <p className="msg m-4">message : {state.message}</p>

        </div>

    )
}
export default DashBoard;