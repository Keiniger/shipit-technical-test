import { Typography, Row, Col, Layout, Menu } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
const { Title } = Typography;

import classes from './App.module.css';

import DestinySelect from './components/DestinySelect';
import DimensionsInput from './components/DimensionsInputs';
import Cotization from './components/Cotization';
import CreateShipment from './components/CreateShipment';
import ShipmentResult from './components/ShipmentResult';

function App() {
  return (
    <Layout className={classes.layout}>
      <Header className={classes.header}>
        <Title
          className={classes.title}
          level={2}>
          Prueba técnica de Shipit
        </Title>
        <Menu theme="dark" mode="horizontal" />
      </Header>
      <Content className={classes.content}>
        <Row
          className={classes.row}
          justify="center"
          align="middle">
          <Col>
            <DestinySelect />
            <DimensionsInput />
            <Cotization />
            <CreateShipment />
            <ShipmentResult statusCode={undefined} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App
