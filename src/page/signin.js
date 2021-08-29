import '../style/signin.css';
import Button from "react-bootstrap/Button";
import image from '../img/mainpage.jpg';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function SignIn() {
    const [users, setUsers] = useState([]);
    const info = "Invalid access information";
    const [showInfo, setShowInfo] = useState(false);

    const history = useHistory();
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        postDataFetch();
    }, []);

    // HTTP POST request to get all user data
    const postDataFetch = async () => {
        try {
            const response = await fetch("https://foodreview1101.herokuapp.com/get_user", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'data': "data sent" }),
            })
            const jsonData = await response.json();
            setUsers(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    const onSubmit = (data, e) => {
        // Check valid
        for (const customer_id in users) {
            if (users[customer_id]["username"] === data["username"] && users[customer_id]["password"] === data["password"]) {
                history.push({
                    pathname: "/dashboard",
                    state: [{
                        'user': users[customer_id]["customer_id"],
                        'name': users[customer_id]["fname"] + " " + users[customer_id]["lname"]
                    }]
                });
                break;
            }
        }
        e.target.reset();
        setShowInfo(true);
        console.log(users);
    };

    return (
        <div className="Wrapper">
            <div className="Introduce-wrapper">
                <div className="Introduce">
                    <div className="Web-name">Review food page</div>
                    <div className="Web-description">Website for review food all around the world ? </div>
                    <div className="Web-image">
                        <img src={image} alt="Cover" className="Image"></img>
                    </div>
                </div>
            </div>
            <div className="Login-form-wrapper">
                <form onSubmit={handleSubmit(onSubmit)} className="Login-form">
                    <div className="Login-field">
                        <p className="Field-title">Username</p>
                        <input {...register("username", { required: true })} placeholder="Username" className="Field-value" />
                    </div>
                    <div className="Login-field">
                        <p className="Field-title">Password</p>
                        <input type="password" {...register("password", { required: true })} placeholder="Password" className="Field-value" />
                    </div>

                    <div className="Forget-password">
                        <p>Forget Password</p>
                    </div>

                    {showInfo ?
                        <div className="Warning-Signin">
                            <p>{info}</p>
                        </div> : null}

                    <Button variant="primary"
                        className="Submit-button"
                        type="submit">
                        <p>Sign in</p>
                    </Button>

                    <div className="Sign-in-method">
                        <p>Or Sign In with</p>
                    </div>

                    <div className="D-Sign-in-method">
                        <div className="Method" id="Google">
                            <FcGoogle className="Icon-Signin" />
                            <div className="Name">Google</div>
                        </div>
                        <div className="Method" id="Facebook">
                            <FaFacebook className="Icon-Signin" />
                            <div className="Name">Facebook</div>
                        </div>
                    </div>

                    <div className="Sign-up-method">
                        <p>Don't have account ?</p>
                    </div>

                    <Button className="Sign-up">
                        <Link to="./signup" className="Link-Signup">
                            <p>Sign up</p>
                        </Link>
                    </Button>
                </form>
            </div>
        </div >
    )
}