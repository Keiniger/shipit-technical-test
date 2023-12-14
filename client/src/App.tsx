import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { Typography, Row, Col, Layout, Menu, MenuProps } from 'antd';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { Content, Header } from 'antd/es/layout/layout';
const { Title } = Typography;

import classes from './App.module.css';

import ShipmentForm from './components/ShipmentForm';
import ShipmentsTable from './components/ShipmentsTable';

function App() {
  const location = useLocation();

  const items: MenuProps['items'] = [
    {
      label: <Link to="/"> Crear envio </Link>,
      key: '/',
      icon: <MailOutlined />,
    },
    {
      label: <Link to="/shipments"> Envios </Link>,
      key: '/shipments',
      icon: <AppstoreOutlined />,
    }]

  return <Layout className={classes.layout}>
    <Header className={classes.header} >
      <Title className={classes.title} level={3}>
        Prueba técnica de Shipit
      </Title>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[location?.pathname]}
        items={items}
        style={{ flex: 1, minWidth: 0, justifyContent: 'end' }}
      />
    </Header>
    <Content className={classes.content}>
      <Row className={classes.row} justify="center" align="middle">
        <Col>
          <Switch>
            <Route exact path="/" component={ShipmentForm} />
            <Route exact path="/shipments" component={ShipmentsTable} />
          </Switch>
        </Col>
      </Row>
    </Content>
  </Layout>
};

export default App
