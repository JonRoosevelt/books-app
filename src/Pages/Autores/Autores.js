import React, { Component } from 'react';
import Header from '../../Components/Header/Header';
import ApiService from '../../Utils/ApiService';
import PopUp from '../../Utils/PopUp';
import Tabela from '../../Components/Tabela/Tabela';

class Autores extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nomes: [],
    }
  }

  componentDidMount() {
    ApiService.ListaNomes()
      .then(res => {
        if(res.message === 'success') {
          this.setState({ nomes: [...this.state.nomes, ...res.data] });
        } 
        else {
          PopUp.exibeMensagem('error', res.message);
        }
      })
      .catch(err => PopUp.exibeMensagem("error", "Erro na comunicação com a api ao tentar listar os autores"));
  }
  
  render() {
    const campos = [{titulo: 'Autores', dado: 'nome'}]
    return (
      <>
        <Header />
        <div className="container">
          <h1>Autores</h1>
          <Tabela
            dados={this.state.nomes} 
            campos={campos} 
          />
        </div>
      </>
    );
  }
}

export default Autores;