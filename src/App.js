import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Views/Home";
import About from "./Views/About";
import Contact from "./Views/Contact";
import Product from "./Views/Product";

function App() {
    return (
        <div className="relative pb-10 min-h-screen">
            <Router basename={window.location.pathname || ""}>
                {/* <CounterExample /> */}
                <Header />
                <div className="p-3">
                    <Switch>
                        <Route exact path="/" component={Home}>
                            <Home />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/product/:id">
                            <Product />
                        </Route>
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
