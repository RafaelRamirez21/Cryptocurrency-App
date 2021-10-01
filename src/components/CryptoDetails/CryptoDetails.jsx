import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom'
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, StopOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined, CheckOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoriesQuery } from '../../Services/cryptoApi';
import LineChart from '../LineChart/LineChart';
import '../../assets/styles/CryptoDetails.scss';
const { Title, Text } = Typography;
const { Option } = Select;
const time = ['3h', '24h', '7d', '30d', '3m', '1y', ' 3y', '5y'];

const CryptoDetails = () => {
  const { id } = useParams();
  const [timeperiod, setTimePeriod] = useState('7d')
  const { data, isFetching } = useGetCryptoDetailsQuery(id)
  const { data: coinHistory } = useGetCryptoHistoriesQuery({ id, timeperiod })
  const cryptoDetails = data?.data?.coin;
  console.log(coinHistory);

  if (isFetching) return 'loading...'

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },];


  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.slug})
        </Title>
        <p>
          {cryptoDetails.name} Live price is in US dollars. View value statistic, market cap and supply.
        </p>
      </Col>
      <Select defaultValue='7d'
        className='select-period'
        placeholder='select time period'
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date, i) => <Option key={date}>{date} </Option>)}
      </Select>

      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />

      <Col className='stats-container'>
        <Col className='coin-value-statistic'>
          <Col className='coin-value-statistic-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} Value statistic
            </Title>
            <p>
              An overview showing the stats od {cryptoDetails.name}
            </p>
          </Col>
          {
            stats.map(({ icon, title, value }, i) => (
              <Col className="coin-stats" key={i}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>

                </Col>
                <Text className="stats" >{value}</Text>

              </Col>
            )
            )}

        </Col>

        <Col className='other-stats-info'>
          <Col className='coin-value-statistic-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} Other statistic
            </Title>
            <p>
              An overview showing the stats of all cryptocurrencies
            </p>
          </Col>
          {
            genericStats.map(({ icon, title, value }, i) => (
              <Col className="coin-stats" key={i}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>

                </Col>
                <Text className="stats" >{value}</Text>

              </Col>
            )
            )}

        </Col>

      </Col>

      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            Whats is {cryptoDetails.name}
            <br />
          </Title>
          {HTMLReactParser(cryptoDetails.description)}


        </Row>

        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            Whats is {cryptoDetails.name} Links
            {cryptoDetails.links.map((link, i) => (
              <Row className="coin-link" key={i}>
                <Title level={5} className="link-name">{link.type}</Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Title>
        </Col>
      </Col>
    </Col>

  )
}

export default CryptoDetails
