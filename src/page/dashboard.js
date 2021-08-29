import '../style/dashboard.css';
import { AiOutlinePlus, AiFillSetting, AiFillTags, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { GiBarbecue } from "react-icons/gi";
import { BiDownArrow } from "react-icons/bi";

import logo from '../img/logo.webp';
import avatar from '../img/avatar.jpg';
import cover from '../img/cover.jpg';
import React, { useState } from 'react';

import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import food from '../img/food_and_drink.jpg';

export default function Dashboard(props) {
    const [restaurant, setRestaurant] = useState([]);

    const user = props.location.state[0]["user"];
    const name = props.location.state[0]["name"];
    console.log(user, name);

    useEffect(() => {
        postDataFetch();
    }, []);

    // HTTP POST request to get all restaurant data
    const postDataFetch = async () => {
        try {
            const response = await fetch("https://foodreview1101.herokuapp.com/get_restaurant", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'data': "data sent" }),
            })
            const jsonData = await response.json();
            setRestaurant(jsonData);
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

            <div className="App-body">
                <div className="Body-wrapper">
                    <div className="App-food-category">
                        <div className="Category-title">
                            <div className="Title-left">
                                <div className="Icon-Border-BBQ">
                                    <GiBarbecue className="Icon" />
                                </div>
                                <div className="Title-name">
                                    <p>Barbecue</p>
                                </div>
                            </div>
                            <div className="Title-right">
                                <button className="Option">
                                    <p className="Intext-Button">Search</p>
                                    <BiDownArrow />
                                </button>
                                <button className="Option">
                                    <p className="Intext-Button">Favorite</p>
                                    <BiDownArrow />
                                </button>
                            </div>
                        </div>
                        <div className="Category-content">
                            <div className="Content">
                                <div className="Left-button">
                                    <AiOutlineArrowLeft className="Direction-button" />
                                </div>
                                <div className="Middle">
                                    <div className="Content-detailed">
                                        {restaurant.map((element, key) => {
                                            if (element["restaurant_type"] === 1) {
                                                return (
                                                    <div className="Tag" key={key}>
                                                        <div className="Tag-image">
                                                            <img src={food} alt="pic" className="Image-Config"></img>
                                                        </div>
                                                        <div className="Tag-information">
                                                            <div className="Store">
                                                                <p>{element["name"]}</p>
                                                            </div>
                                                            <div className="Address">
                                                                <p>{element["address"]}</p>
                                                            </div>
                                                            <div className="Classification">
                                                                <AiFillTags className="Category-Tags" />
                                                                <p className="Tags">{element["tag"]}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            } else return null;
                                        })}
                                    </div>
                                </div>
                                <div className="Right-button">
                                    <AiOutlineArrowRight className="Direction-button" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="App-food-category">
                        <div className="Category-title">
                            <div className="Title-left">
                                <div className="Icon-Border-Hotpot">
                                    <GiBarbecue className="Icon" />
                                </div>
                                <div className="Title-name">
                                    <p>Hotpot</p>
                                </div>
                            </div>
                            <div className="Title-right">
                                <button className="Option">
                                    <p className="Intext-Button">Search</p>
                                    <BiDownArrow />
                                </button>
                                <button className="Option">
                                    <p className="Intext-Button">Favorite</p>
                                    <BiDownArrow />
                                </button>
                            </div>
                        </div>
                        <div className="Category-content">
                            <div className="Content">
                                <div className="Left-button">
                                    <AiOutlineArrowLeft className="Direction-button" />
                                </div>
                                <div className="Middle">
                                    <div className="Content-detailed">
                                        {restaurant.map((element) => {
                                            if (element["restaurant_type"] === 2) {
                                                return (
                                                    <div className="Tag">
                                                        <div className="Tag-image">
                                                            <img src={food} alt="pic" className="Image-Config"></img>
                                                        </div>
                                                        <div className="Tag-information">
                                                            <div className="Store">
                                                                <p>{element["name"]}</p>
                                                            </div>
                                                            <div className="Address">
                                                                <p>{element["address"]}</p>
                                                            </div>
                                                            <div className="Classification">
                                                                <AiFillTags className="Category-Tags" />
                                                                <p className="Tags">{element["tag"]}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            } else return null;
                                        })}
                                    </div>
                                </div>
                                <div className="Right-button">
                                    <AiOutlineArrowRight className="Direction-button" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="App-food-category">
                        <div className="Category-title">
                            <div className="Title-left">
                                <div className="Icon-Border-Street">
                                    <GiBarbecue className="Icon" />
                                </div>
                                <div className="Title-name">
                                    <p>Fastfood</p>
                                </div>
                            </div>
                            <div className="Title-right">
                                <button className="Option">
                                    <p className="Intext-Button">Search</p>
                                    <BiDownArrow />
                                </button>
                                <button className="Option">
                                    <p className="Intext-Button">Favorite</p>
                                    <BiDownArrow />
                                </button>
                            </div>
                        </div>
                        <div className="Category-content">
                            <div className="Content">
                                <div className="Left-button">
                                    <AiOutlineArrowLeft className="Direction-button" />
                                </div>
                                <div className="Middle">
                                    <div className="Content-detailed">
                                        {restaurant.map((element) => {
                                            if (element["restaurant_type"] === 3) {
                                                return (
                                                    <div className="Tag">
                                                        <div className="Tag-image">
                                                            <img src={food} alt="pic" className="Image-Config"></img>
                                                        </div>
                                                        <div className="Tag-information">
                                                            <div className="Store">
                                                                <p>{element["name"]}</p>
                                                            </div>
                                                            <div className="Address">
                                                                <p>{element["address"]}</p>
                                                            </div>
                                                            <div className="Classification">
                                                                <AiFillTags className="Category-Tags" />
                                                                <p className="Tags">{element["tag"]}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            } else return null;
                                        })}
                                    </div>
                                </div>
                                <div className="Right-button">
                                    <AiOutlineArrowRight className="Direction-button" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="App-food-category">
                        <div className="Category-title">
                            <div className="Title-left">
                                <div className="Icon-Border-Vegan">
                                    <GiBarbecue className="Icon" />
                                </div>
                                <div className="Title-name">
                                    <p>Vegatarian</p>
                                </div>
                            </div>
                            <div className="Title-right">
                                <button className="Option">
                                    <p className="Intext-Button">Search</p>
                                    <BiDownArrow />
                                </button>
                                <button className="Option">
                                    <p className="Intext-Button">Favorite</p>
                                    <BiDownArrow />
                                </button>
                            </div>
                        </div>
                        <div className="Category-content">
                            <div className="Content">
                                <div className="Left-button">
                                    <AiOutlineArrowLeft className="Direction-button" />
                                </div>
                                <div className="Middle">
                                    <div className="Content-detailed">
                                        {restaurant.map((element) => {
                                            if (element["restaurant_type"] === 4) {
                                                return (
                                                    <div className="Tag">
                                                        <div className="Tag-image">
                                                            <img src={food} alt="pic" className="Image-Config"></img>
                                                        </div>
                                                        <div className="Tag-information">
                                                            <div className="Store">
                                                                <p>{element["name"]}</p>
                                                            </div>
                                                            <div className="Address">
                                                                <p>{element["address"]}</p>
                                                            </div>
                                                            <div className="Classification">
                                                                <AiFillTags className="Category-Tags" />
                                                                <p className="Tags">{element["tag"]}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            } else return null;
                                        })}
                                    </div>
                                </div>
                                <div className="Right-button">
                                    <AiOutlineArrowRight className="Direction-button" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}