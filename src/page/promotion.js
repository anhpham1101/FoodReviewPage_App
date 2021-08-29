import '../style/promotion.css';
import { AiFillTags, AiOutlinePlus, AiFillSetting } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";


import logo from '../img/logo.webp';
import avatar from '../img/avatar.jpg';
import cover from '../img/cover.jpg';
import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';


export default function Promotion(props) {
    const user = props.location.state[0]["user"];
    const name = props.location.state[0]["name"];
    console.log(user, name);

    const [promotion, setPromotion] = useState([]);

    useEffect(() => {
        postDataFetch();
    }, []);

    console.log(promotion);

    // HTTP POST request to get all user data
    const postDataFetch = async () => {
        try {
            const response = await fetch("https://foodreview1101.herokuapp.com/get_promotion", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'data': "data sent" }),
            })
            const jsonData = await response.json();
            setPromotion(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="App-feature">
                    <div className="App-Logo">
                        <img src={logo} alt="Logo" className="Logo"></img>
                    </div>
                    <div className="Navbar">
                        <Button className="Navbar-item">
                            <Link className="Link" to={{
                                pathname: "./dashboard",
                                state: [{
                                    'name': name,
                                    'user': user
                                }]
                            }}>
                                <p>Foods</p>
                            </Link>
                        </Button>
                        <Button className="Navbar-item">
                            <Link className="Link" to={{
                                pathname: "./comment",
                                state: [{
                                    'name': name,
                                    'user': user
                                }]
                            }}>
                                <p>Comments</p>
                            </Link>
                        </Button>
                        <Button className="Navbar-item">
                            <Link className="Link" to={{
                                pathname: "./promotion",
                                state: [{
                                    'name': name,
                                    'user': user
                                }]
                            }}>
                                <p>Promotions</p>
                            </Link>
                        </Button>
                        <Button className="Navbar-item">
                            <Link className="Link" to={{
                                pathname: "./news",
                                state: [{
                                    'name': name,
                                    'user': user
                                }]
                            }}>
                                <p>News</p>
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="Add-ons">
                    <div className="User">
                        <div className="Avatar">
                            <img src={avatar} alt="Avatar" className="Avatar-img"></img>
                        </div>
                        <p className="User-name">{name}</p>
                    </div>
                    <div className="Addons-feature">
                        <div className="Feature">
                            <IoIosNotifications className="Addons-icon" />
                        </div>
                        <div className="Feature">
                            <AiOutlinePlus className="Addons-icon" />
                        </div>
                        <div className="Feature">
                            <AiFillSetting className="Addons-icon" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="Cover">
                <img src={cover} alt="Background cover" className="Cover-img"></img>
            </div>

            <div className="Promotion-wrapper">
                {promotion.map((element, key) => {
                    return (
                        <span className="Promotion" key={key}>
                            <div className="Promotion-tag">
                                <AiFillTags className="Promotion-icon" />
                            </div>
                            <div className="Promotion-content">
                                <div className="Promotion-restaurant">
                                    <p>{element["name"]}</p>
                                </div>
                                <div className="Promotion-title">
                                    <p>{element["title"]}</p>
                                </div>
                                <div className="Promotion-description">
                                    <p>{element["description"]}</p>
                                </div>
                                <div className="Promotion-duration">
                                    <div className="Promotion-duration-content">
                                        <p className="Promotion-duration-time">Promotion period:</p>
                                        <p className="Promotion-duration-duration">12/11/2021</p>
                                    </div>
                                </div>
                            </div>
                        </span>
                    )
                })}
            </div>
        </div>
    );
}