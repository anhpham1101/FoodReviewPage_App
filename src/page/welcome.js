import '../style/welcome.css';
import Button from "react-bootstrap/Button";
import image from '../img/welcome.jpg';
import { Link } from "react-router-dom";

export default function Welcome() {
    return (
        <div className="Wrapper">
            <div className="Content-Welcome">
                <div className="Image-cover">
                    <img src={image} alt="cover" className="Welcome-Image"></img>
                </div>
                <div className="Title">
                    <p>Review good food from anywhere</p>
                </div>
                <div className="Nav-page">
                    <Button className="Nav-item">
                        <Link to={"./signin"}>
                            <p className="Nav-title">Sign In</p>
                        </Link>
                    </Button>
                    <Button className="Nav-item">
                        <Link to={"./signup"}>
                            <p className="Nav-title">Sign Up</p>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}