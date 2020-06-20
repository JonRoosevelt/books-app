import React, { Component } from 'react';
import FormValidator from '../../Utils/FormValidator';
import PopUp from '../../Utils/PopUp';
import { TextField, Grid, Button } from '@material-ui/core';
import Toast from '../Toast/Toast';


class Formulario extends Component {
  constructor(props) {
    super(props);

    this.validador = new FormValidator([
      {
        campo: 'nome',
        metodo: 'isEmpty',
        validoQuando: false,
        mensagem: 'Entre com um nome'
     },
      {
        campo: 'livro',
        metodo: 'isEmpty',
        validoQuando: false,
        mensagem: 'Entre com um livro'
     },
      {
        campo: 'preco',
        metodo: 'isInt',
        args: [{ min: 0, max: 99999}],
        validoQuando: true,
        mensagem: 'Entre com um valor numérico'
     }
    ]);

    this.stateInicial = {
      nome: '',
      livro: '',
      preco: '',
      validacao: this.validador.valido(),
      open: true,
      mensagem: {
        open: false,
        texto: '',
        tipo: 'success'
      }
    };

    this.state = this.stateInicial;
  }

  inputListener = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  submitForm = () => {
    const validacao = this.validador.valida(this.state);

    if(validacao.isValid) {
      this.props.submitListener(this.state);
      this.setState(this.stateInicial);
    } else {
      const { nome, livro, preco } = validacao;
      const campos = [nome, livro, preco];

      const camposInvalidos = campos.filter(elem => {
        return elem.isInvalid;
      });
      const erros = camposInvalidos.reduce(
        (texto, campo) => campo.mensagem + '. ',
        ''
      );
      this.setState({
        mensagem: {
          open: true,
          texto: erros,
          tipo: 'error'
        }
      })
    }
  }

  render() {

    const { nome, livro, preco } = this.state;

    return (
      <>
        <Toast
          open={this.state.mensagem.open}
          handleClose={() =>
            this.setState({
              mensagem: {
                open: false
              }
            })
          }
          severity={this.state.mensagem.tipo}
        >
          {this.state.mensagem.texto}
        </Toast>
        <form>
          <Grid 
            container
            spacing={2}
            alignItems="center"
            >
            <Grid item>
              <TextField 
                id="nome" 
                label="Nome"
                name="nome" 
                variant="outlined" 
                value={nome} 
                onChange={this.inputListener} 
              />
            </Grid>
            <Grid item>
              <TextField 
                id="livro" 
                label="Livro"
                name="livro" 
                variant="outlined" 
                value={livro} 
                onChange={this.inputListener} 
              />
            </Grid>
            <Grid item>
              <TextField 
                id="preco" 
                label="Preço"
                name="preco" 
                variant="outlined" 
                value={preco} 
                onChange={this.inputListener} 
              />
            </Grid>
            <Grid>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={this.submitForm}>
                Salvar
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}

export default Formulario;


