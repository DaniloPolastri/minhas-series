import React, { Component } from "react";
import api from "../../api/api";
import { Redirect } from "react-router-dom";

const statuses = {
  watched: "Assistido",
  watching: "Assistindo",
  toWatch: "Assistir"
};

class EditSeries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
      isLoading: false,
      redirect: false,
      series: {}
    };
    this.saveSeries = this.saveSeries.bind(this);
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    api.LoadSeriesById(this.props.match.params.id).then(res => {
      this.setState({ series: res.data });
      this.refs.name.value = this.state.series.name;
      this.refs.genre.value = this.state.series.genre;
      this.refs.comment.value = this.state.series.comment;
      this.refs.status.values = this.state.series.status;
    });
    api.loadGenres().then(res => {
      this.setState({
        isLoading: false,
        genres: res.data
      });
    });
  }
  saveSeries() {
    const newSeries = {
      id: this.props.match.params.id,
      name: this.refs.name.value,
      status: this.refs.status.value,
      genre: this.refs.genre.value,
      comment: this.refs.comment.value
    };
    api.updateSeries(newSeries).then(res => {
      this.setState({
        redirect: "/series/" + this.refs.genre.value
      });
    });
  }
  render() {
    return (
      <div className="container">
        <section className="intro-section">
          {this.state.redirect && <Redirect to={this.state.redirect} />}
          <h1>Editar Série</h1>
          <p>{JSON.stringify(this.state)}</p>
          <form>
            Nome: <input typer="text" ref="name" className="form-control" />
            <br />
            Status:
            <select ref="status">
              {Object.keys(statuses).map(key => (
                <option key={key} value={key}>
                  {statuses[key]}
                </option>
              ))}
            </select>
            <br />
            Genero:
            <select ref="genre">
              {this.state.genres.map(key => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <br />
            Comentarios:{" "}
            <textarea ref="comment" className="form-control mt-5" />
            <br />
            <button type="button" onClick={this.saveSeries}>
              Salvar
            </button><br />
          </form>
        </section>
      </div>
    );
  }
}

export default EditSeries;
