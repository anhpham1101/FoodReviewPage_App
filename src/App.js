import Welcome from "./page/welcome";
import SignIn from "./page/signin";
import SignUp from "./page/signup";
import DashBoard from "./page/dashboard";
import Comment from "./page/comment";
import Promotion from "./page/promotion";
import News from "./page/news";
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Welcome} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/comment" component={Comment} />
        <Route path="/promotion" component={Promotion} />
        <Route path="/news" component={News} />
      </div>
    </Router>
  )
}