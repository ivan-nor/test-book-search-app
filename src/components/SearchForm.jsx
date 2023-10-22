/* eslint-disable no-unused-vars */
import {
  Form, Button, Col, Row,
} from 'react-bootstrap';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortingParam, setSortingParam] = useState('relevance');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, category, sortingParam);
  };

  return (
    <Form onSubmit={handleSubmit} className="m-3 p-1">
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Form.Label className="m-0">Input your query:</Form.Label>
        </Col>
        <Col>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">all</option>
            <option value="art">art</option>
            <option value="biography">biography</option>
            <option value="computers">computers</option>
            <option value="history">history</option>
            <option value="medical">medical</option>
            <option value="poetry">poetry</option>
          </Form.Select>
          <Form.Label className="m-0">Select category:</Form.Label>
        </Col>
        <Col>
          <Form.Select
            value={sortingParam}
            onChange={(e) => setSortingParam(e.target.value)}
          >
            <option value="relevance">relevance</option>
            <option value="newest">newest</option>
            {/* Добавьте другие параметры сортировки по вашему выбору */}
          </Form.Select>
          <Form.Label className="m-0">Sorting:</Form.Label>
        </Col>
        <Col>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
