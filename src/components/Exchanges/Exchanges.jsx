import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { useGetExchangesQuery } from '../../Services/cryptoApi';
import ExchangesDetails from './ExchangesDetails';
import Loader from '../Loader/Loader';

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;
  console.log(exchangesList);
  if (isFetching) return <Loader />;
  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      {exchangesList.map((exchange) => (
        <ExchangesDetails key={exchange.id} exchange={exchange} />
      ))}

    </>
  )
}

export default Exchanges
