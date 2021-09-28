import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, Homepage, Exchanges, CryptoDetails, Cryptocurrencies, News } from '../components';
import '../assets/styles/Footer.scss';

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />

      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route path="/" exact >
                <Homepage />
              </Route>
              <Route path="/exchanges" exact>
                <Exchanges />
              </Route>
              <Route path="/cryptocurrencies" exact>
                <Cryptocurrencies />
                <Route />
              </Route>
              <Route path="/crypto/:id" exact >
                <CryptoDetails />
              </Route>
              <Route path="/news" exact>
                <News />
              </Route>

            </Switch>

          </div>
        </Layout>

        <div className="footer" >
          <Typography.Title level={5} style={{ color: "white", textAlign: 'center' }}>
            Cryptoverse <br />
            All right reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>

          </Space>
        </div>
      </div>

    </div>
  );
}

export default App;
