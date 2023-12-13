import { Typography, Row, Col, Layout, Menu } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
const { Title } = Typography;

import classes from './App.module.css';

import ShipmentForm from './components/ShipmentForm';

function App() {
  return <Layout className={classes.layout}>
    <Header className={classes.header}>
      <Title className={classes.title} level={3}>
        Prueba técnica de Shipit
      </Title>
      <Menu theme="dark" mode="horizontal" />
    </Header>
    <Content className={classes.content}>
      <Row className={classes.row} justify="center" align="middle">
        <Col>
          <ShipmentForm />
        </Col>
      </Row>
    </Content>
  </Layout>
};

export default App
