import '../style/signup.css';
import Button from "react-bootstrap/Button";
import React, { useState } from 'react';
import image from '../img/mainpage.jpg';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function SignUp() {
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const [info, setInfo] = useState("");
    const [showInfo, setShowInfo] = useState(false);

    const validate = (data) => {
        let email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let phone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (data["password"].length <= 8) {
            setInfo("Invalid password. Password must have more than 8 characters");
            return false;
        } else if (!email_regex.test(data["email"])) {
            setInfo("Invalid email format. Ex: myemail@gmail.com");
            return false;
        } else if (!phone_regex.test(data["phone"])) {
            setInfo("Invalid phone number. Phone must have 10 digits");
            return false;
        } else return true;
    }

    const onSubmit = (data, e) => {
        const check = validate(data);
        if (check) {
            postDataFetch(data).then((value) => {
                history.push({
                    pathname: "./dashboard",
                    state: [{
                        'user': value["customer_id"],
                        'name': value['fname'] + " " + value["lname"]
                    }]
                });
            })
        } else {
            setShowInfo(true);
        }
    };

    const postDataFetch = async (data) => {
        try {
            const response = await fetch("https://foodreview1101.herokuapp.com/add_user", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            const jsonData = await response.json();
            return jsonData;
        } catch (err) {
            console.error(err.message);
        }
    }

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

                    <div className="Special-login-field">
                        <div className="Sub-login-field">
                            <p className="Sub-field-title">First name</p>
                            <input {...register("fname", { required: true })} placeholder="First name" className="Sub-field-value" />
                        </div>

                        <div className="Sub-login-field">
                            <p className="Sub-field-title">Last name</p>
                            <input {...register("lname", { required: true })} placeholder="Last name" className="Sub-field-value" />
                        </div>
                    </div>

                    <div className="Login-field">
                        <p className="Field-title">Email</p>
                        <input {...register("email", { required: true })} placeholder="Email" className="Field-value" />
                    </div>

                    <div className="Login-field">
                        <p className="Field-title">Phone</p>
                        <input {...register("phone", { required: true })} placeholder="Phone" className="Field-value" />
                    </div>

                    {showInfo ?
                        <div className="Warning-Signup">
                            <p>{info}</p>
                        </div> : null}

                    <Button variant="primary" type="submit"
                        className="Submit-button">
                        Sign up
                    </Button>

                    <div className="Sign-up-method">
                        <p>Already have account ?</p>
                    </div>

                    <Button className="Sign-in">
                        <Link to="./signin" className="Link-Signin">
                            <p>Sign In</p>
                        </Link>
                    </Button>
                </form>
            </div>
        </div>
    )
}