import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import { Button } from '@material-ui/core';


const CellDeleta = ({ removeDados, id }) => {
  if (!removeDados) {
    return null
  }

  return (
    <TableCell>
      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          removeDados(id)
        }}
      >
        Remover
            </Button>
    </TableCell>
  )
}

const TituloDeleta = ({ removeDados }) => {
  if (!removeDados) {
    return null
  }

  return <TableCell>Remover</TableCell>
}

const Tabela = props => {
  const { campos, dados, removeDados } = props
  return (
    <Table>
      <TableHead>
        <TableRow>
          {campos.map(campo => (
            <TableCell>{campo.titulo}</TableCell>
          ))}
          <TituloDeleta removeDados={removeDados} />
        </TableRow>
      </TableHead>
      <TableHead />
      <TableBody>
        {dados.map(dados => (
          <TableRow key={dados.id}>
            {campos.map(campo => (
              <TableCell>{dados[campo.dado]}</TableCell>
            ))}
            <CellDeleta id={dados.id} removeDados={removeDados} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Tabela