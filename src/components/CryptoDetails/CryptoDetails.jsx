import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom'
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, StopOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined, CheckOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery } from '../../Services/cryptoApi';
import '../../assets/styles/CryptoDetails.scss';
const { Title, Text } = Typography;
const { Option } = Select;
const time = ['3h', '24h', '7d', '30d', '3m', '1y', '2y', '3y'];

const CryptoDetails = () => {
  const { id } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d')
  const { data, isFetching } = useGetCryptoDetailsQuery(id)
  const cryptoDetails = data?.data?.coin;
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
        className='select-timeperiod'
        placeholder='select time period'
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date, i) => <Option key={date}>{date} </Option>)}
      </Select>
      <Col className='stats-container'>
        <Col className='coin-value-statistic'>
          <Col className='coin-value-statistic-heading'>
            <Title level={3} className='coin-detailes-heading'>
              {cryptoDetails.name} Value statistic
            </Title>
            <p>
              An overview showing the stats od {cryptoDetails.name}
            </p>
          </Col>

        </Col>
      </Col>
    </Col>

  )
}

export default CryptoDetails
