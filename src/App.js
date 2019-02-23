//importe de componentes
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//importes de paginas
import Home from "./pages/home/home";
import Header from "./pages/header/header";
import NewSeries from "./pages/new/NewSeries";
import Series from "./pages/series/series";
import EditSeries from "./pages/editseries/EditSeries";
//dunctional-stateless component
const About = () => (
  <section className="intro-section">
    <h1>Sobre</h1>
  </section>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/series-edit/:id" component={EditSeries} />
          <Route path="/series/:genre" component={Series} />
          <Route exact path="/about" component={About} />
          <Route exact path="/new" component={NewSeries} />
        </div>
      </Router>
    );
  }
}

export default App;
