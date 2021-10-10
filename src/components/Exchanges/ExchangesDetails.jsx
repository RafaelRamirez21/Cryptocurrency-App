import HTMLReactParser from 'html-react-parser';
import { Collapse, Row, Col, Avatar, Typography } from 'antd';
import millify from 'millify';
import React from 'react';
const { Text } = Typography;
const { Panel } = Collapse;
import '../../assets/styles/Exchange.scss'
const ExchangesDetails = ({ exchange }) => {

  return (
    <>
      <Collapse>
        <Panel
          key={exchange.id}
          showArrow={false}
          header={(
            <Row

              key={exchange.id}>
              <Col span={6}
                className="coin_name">
                <Text ><strong>{exchange.rank}</strong></Text>
                <Avatar className="exchange-image" src={exchange.iconUrl} />
                <Text ><strong>{exchange.name}</strong></Text>

              </Col>
              <Col span={6}>${millify(exchange.volume)}</Col>
              <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
              <Col span={6}>{millify(exchange.marketShare)}</Col>
            </Row>

          )}
        >
          {HTMLReactParser(exchange.description || '')}

        </Panel>
      </Collapse>
    </>
  )
}

export default ExchangesDetails
