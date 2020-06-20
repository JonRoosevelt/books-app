import React, { Component } from 'react';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import Tabela from '../../Components/Tabela/Tabela';
import Form from '../../Components/Formulario/Formulario';
import Header from '../../Components/Header/Header';
import './Home.css';
import PopUp from '../../Utils/PopUp';
import ApiService from '../../Utils/ApiService';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      autores: [],
    }
  };

  removeAutor = id => {
    const { autores } = this.state;

    const autoresAtualizado = autores.filter(autor => {
      return autor.id !== id;
    });
    ApiService.RemoveAutor(id)
      .then(res => {
        if (res.message === 'deleted') {
          this.setState({ autores: [...autoresAtualizado] });
          PopUp.exibeMensagem("success", "Autor removido com sucesso.");
        }
      })
      .catch(err => PopUp.exibeMensagem("error", "Erro na comunicação com a api ao tentar remover o autor"));
  };

  submitListener = dados => {
    const autor = {
      nome: dados.nome,
      livro: dados.livro,
      preco: dados.preco,
    }
    ApiService.CriaAutor(JSON.stringify(autor))
      .then(res => {
        console.log(res)
        if (res.message === 'success') {
          this.setState({ autores: [...this.state.autores, res.data] });
          PopUp.exibeMensagem("success", "Autor adicionado com sucesso");
        }
      })
      .catch(err => PopUp.exibeMensagem("error", "Erro na comunicação com a api ao tentar criar o autor"));
  }

  componentDidMount() {
    ApiService.ListaAutores()
      .then(res => {
        if (res.message === 'success') {
          this.setState({ autores: [...this.state.autores, ...res.data] });
        }
      })
      .catch(err => PopUp.exibeMensagem("error", "Erro na comunicação com a api ao tentar listar os autores"));
  }

  render() {
    const campos = [
      { titulo: 'Autores', dado: 'nome' }, 
      { titulo: 'Livro', dado: 'livro' }, 
      { titulo: 'Preços', dado: 'preco' }, 
    ];

    return (
      <>
        <Header />
        <div className="container">
          <h1>Casa do Código</h1>
          <Form
            submitListener={this.submitListener}
          />
          <Tabela
            campos={campos}
            dados={this.state.autores}
            removeDados={this.removeAutor}
          />
        </div>
      </>
    );
  };
}

export default App;
