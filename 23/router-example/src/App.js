import './App.css';
import {Route, Link} from "./Router";

function App() {
    return (
        <div className="App">
            <Link to="/">home</Link>##
            <Link to="/about/test">about-test</Link>##
            <Link to="/about/second">about-second</Link>

            <Route path="/">
                <Home/>
            </Route>
            <Route path="/about/:id" render={props => (<About {...props}/>)}/>
        </div>
    );
}

function Home() {
    return (
        <div>home</div>
    );
}

function About({match}) {
    return (
        <div>about {match.params.id}</div>
    );
}

export default App;
