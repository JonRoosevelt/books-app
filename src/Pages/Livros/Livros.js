import React, { Component } from 'react';
import Header from '../../Components/Header/Header';
import ApiService from '../../Utils/ApiService';
import PopUp from '../../Utils/PopUp';
import Tabela from '../../Components/Tabela/Tabela';

class Livros extends Component {

  constructor(props) {
    super(props);

    this.state = {
      livros: [],
    }
  }

  componentDidMount() {
    ApiService.ListaLivros()
      .then(res => {
        if(res.message === 'success') {
          this.setState({ livros: [...this.state.livros, ...res.data] });
        }
        else {
          PopUp.exibeMensagem('error', res.message);
        }
      })
      .catch(err => PopUp.exibeMensagem("error", "Erro na comunicação com a api ao tentar listar os livros"));
  }

  render() {
    const campos = [{
      titulo: 'Livros',
      dado: 'livro'
    }]
    return(
      <>
      <Header />
      <div className="container">
        <h1>Livros</h1>
          <Tabela
            dados={this.state.livros} 
            campos={campos}
          />
      </div>
      </>
    );
  }
}

export default Livros;