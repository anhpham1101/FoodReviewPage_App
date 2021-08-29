import '../style/news.css';
import { AiOutlinePlus, AiFillSetting } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { BiNews } from "react-icons/bi";


import logo from '../img/logo.webp';
import avatar from '../img/avatar.jpg';
import cover from '../img/cover.jpg';
import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';


export default function News(props) {
    const user = props.location.state[0]["user"];
    const name = props.location.state[0]["name"];
    const [news, setNews] = useState([]);

    console.log(user, name);

    useEffect(() => {
        postDataFetch();
    }, []);

    // HTTP POST request to get all user data
    const postDataFetch = async () => {
        try {
            const response = await fetch("https://foodreview1101.herokuapp.com/get_news", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'data': "data sent" }),
            })
            const jsonData = await response.json();
            setNews(jsonData);
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

            <div className="News-wrapper">
                {news.map((element, key) => {
                    return (
                        <span className="News" key={key}>
                            <div className="News-tag">
                                <BiNews className="News-icon" />
                            </div>
                            <div className="News-content">
                                <div className="News-restaurant">
                                    <p>{element["title"]}</p>
                                </div>
                                <div className="News-description">
                                    <p>{element["description"]}</p>
                                </div>
                                <div className="News-duration">
                                    <div className="News-duration-content">
                                        <p className="News-duration-time">Upload time:</p>
                                        <p className="News-duration-duration">{element["upload_time"]}</p>
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