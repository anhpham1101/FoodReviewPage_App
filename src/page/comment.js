import '../style/comment.css';
import { AiOutlinePlus, AiFillSetting } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";

import logo from '../img/logo.webp';
import avatar from '../img/avatar.jpg';
import cover from '../img/cover.jpg';
import React, { useState, useEffect } from 'react';

import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

export default function Comment(props) {
    const user = props.location.state[0]["user"];
    const name = props.location.state[0]["name"];
    console.log(user, name);

    const [show_status, onchange_show] = useState(false);
    const add_comment_status = "Success add new comment";
    const [comment, setComment] = useState([]);

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        postDataFetch();
    }, []);

    console.log(comment);

    // HTTP POST request to get all user data
    const postDataFetch = async () => {
        try {
            const response = await fetch("https://foodreview1101.herokuapp.com/get_comment", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'data': "data sent" }),
            })
            const jsonData = await response.json();
            setComment(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const postDataInsert = async (data) => {
        try {
            const response = await fetch("https://foodreview1101.herokuapp.com/add_comment", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            const jsonData = await response.json();
            console.log(jsonData);
            window.location.reload();
        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteDataDelete = async (id) => {
        try {
            const response = await fetch(`https://foodreview1101.herokuapp.com/delete_comment/${id}`, {
                method: 'DELETE'
            })
            console.log(response);
            window.location.reload();
        } catch (err) {
            console.error(err.message);
        }
    }

    const onSubmit = (data, e) => {
        let date = new Date().getDate(); //Current Date
        let month = new Date().getMonth() + 1; //Current Month
        let year = new Date().getFullYear(); //Current Year
        let hours = new Date().getHours(); //Current Hours
        let min = new Date().getMinutes(); //Current Minutes
        let sec = new Date().getSeconds(); //Current Seconds

        const data_insert = {
            'customer_id': user,
            'restaurant': data['restaurant'],
            'title': data['title'],
            'description': data['comment'],
            'score': data['score'],
            'comment_time': hours + ":" + min + ":" + sec,
            'date_comment': date + "/" + month + "/" + year
        };

        postDataInsert(data_insert);
        onchange_show(true);
        e.target.reset();
    };

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
                    <div className="Comment-wrapper">
                        <div className="Comment-menu">
                            <div className="Menu-title">
                                <div className="Menu-logo">
                                    <img src={logo} alt="Menu logo" className="Menu-logo-img"></img>
                                </div>
                                <p className="Menu-text">Comments</p>
                            </div>
                            <div className="New-comment-menu">
                                <form onSubmit={handleSubmit(onSubmit)} className="Comment-form">
                                    <div className="Item-field">
                                        <p className="Item-title">Restaurant</p>
                                        <input {...register("restaurant", { required: true })} className="Item-value" />
                                    </div>
                                    <div className="Item-field">
                                        <p className="Item-title">Title</p>
                                        <input {...register("title", { required: true })} className="Item-value" />
                                    </div>
                                    <div className="Item-field-special">
                                        <p className="Item-title">Comment</p>
                                        <textarea {...register("comment", { required: true })} className="Item-value-special" />
                                    </div>
                                    <div className="Item-field">
                                        <p className="Item-title">Score</p>
                                        <input {...register("score", { required: true })} className="Item-value" />
                                    </div>

                                    <div className="Button-group-wrapper">
                                        <div className="Button-group">
                                            <Button variant="primary"
                                                className="Add-button"
                                                type="submit">
                                                <p>Add</p>
                                            </Button>

                                            <Button variant="secondary"
                                                className="Reset-button"
                                                type="reset">
                                                <p>Reset</p>
                                            </Button>
                                        </div>
                                    </div>

                                    {show_status ?
                                        <div className="Status">
                                            <p>{add_comment_status}</p>
                                        </div> : null}
                                </form>
                            </div>
                        </div>
                        <div className="Comment-board">
                            <div className="Group">
                                <button className="Group-filter">
                                    <p>New Comments</p>
                                </button>
                            </div>
                            <div className="Comments">
                                {comment.map((element, key) => {
                                    return (
                                        <span className="Comment-item" key={key}>
                                            <div className="Comment-header">
                                                <div className="Comment-user-avatar">
                                                    <img src={avatar} alt="Avatar" className="Avatar-img"></img>
                                                </div>
                                                <div className="Post-header">
                                                    <div className="Username">
                                                        <p>{element["fname"] + " " + element["lname"]}</p>
                                                    </div>
                                                    <div className="Storename">
                                                        <p>{element["restaurant"]}</p>
                                                    </div>
                                                    <div className="Date-Time">
                                                        <div className="Date">
                                                            <p>{element["date_comment"]}</p>
                                                        </div>
                                                        <div className="Time">
                                                            <p>{element["comment_time"]}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Rate">
                                                    <div className="Score-Rate">{element["score"]}</div>
                                                </div>
                                            </div>
                                            <div className="Comment-body">
                                                <div className="Comment-title">
                                                    <p>{element["title"]}</p>
                                                </div>
                                                <div className="Comment-description">
                                                    <p>{element["description"]}</p>
                                                </div>
                                            </div>
                                            <div className="Comment-footer">
                                                <Button variant="primary"
                                                    className="Add-button"
                                                    onClick={() => deleteDataDelete(comment[key]['comment_id'])}>
                                                    <p>Delete</p>
                                                </Button>
                                            </div>
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}