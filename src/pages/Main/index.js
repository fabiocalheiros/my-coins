import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'styled-table-component';

import { MdAdd } from 'react-icons/md';

import { TdPercentage } from './styles';

import api from '../../services/api';

import Container from '../../components/Container';

import { formatPrice } from '../../Util/format';

export default class Main extends Component {
  state = {
    coins: [],
  };

  async componentDidMount() {
    const response = await api.get(`/cryptocurrency/listings/latest`);

    this.setState({
      coins: response.data.data,
    });
  }

  render() {
    const { coins } = this.state;
    return (
      <Container>
        <Table>
          <thead>
            <tr>
              <th scope="col">Icone</th>
              <th scope="col">Nome</th>
              <th scope="col">Symbol</th>
              <th scope="col">Value</th>
              <th scope="col">24H</th>
            </tr>
          </thead>
          <tbody>
            {coins.map(coin => (
              <tr key={coin.id}>
                <td>{coin.id}</td>
                <td>
                  <Link to={`/coin/${coin.id}`}>{coin.name}</Link>
                </td>
                <td>{coin.symbol}</td>
                <td>{formatPrice(coin.quote.USD.price)}</td>
                <TdPercentage
                  positive={coin.quote.USD.percent_change_24h.toFixed(2) > 0}
                >
                  {coin.quote.USD.percent_change_24h.toFixed(2)}%
                </TdPercentage>
                <td>
                  <button type="button">
                    <MdAdd size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}
