import React, { Component } from 'react';

import { FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { List, Form, SubmitButton } from './styles';
import Container from '../../components/Container';

export default class Main extends Component {
  state = {
    newCoins: '',
    coins: [],
    loading: false,
    error: false,
  };

  // carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({
        repositories: JSON.parse(repositories),
      });
    }
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({
      newCoins: e.target.value,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { newCoins, coins } = this.state;

      if (newCoins === '') {
        throw new Error('Você precisa indicar um repositório');
      }

      const hasCoin = coins.find(coin => coin.name === newCoins);

      if (hasCoin) throw new Error('Moeda duplicada');

      const response = await api.get(`/repos/${newCoins}`);
      const data = {
        name: response.data.full_name,
      };

      this.setState({
        coins: [...coins, data],
        newCoins: '',
        loading: false,
        error: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  };

  render() {
    const { newCoins, coins, loading, error } = this.state;

    return (
      <Container>
        <h1>Criptos</h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar Criptomoeda"
            value={newCoins}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {coins.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
