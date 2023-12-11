import { Typography, Row, Col, Layout, Menu, Space } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
const { Title } = Typography;

import classes from './App.module.css';

import DestinySelect, { DestinyId } from './components/DestinySelect';
import DimensionsInput, { Dimension, Dimensions } from './components/DimensionsInputs';
import Cotization from './components/Cotization';
import CreateShipment from './components/CreateShipment';
import ShipmentResult from './components/ShipmentResult';
import { useState } from 'react';

function App() {
  const [selectedDestiny, setSelectedDestiny] = useState<DestinyId | undefined>();
  const [dimensions, setDimensions] = useState<Dimensions>({
    [Dimension.Length]: undefined,
    [Dimension.Width]: undefined,
    [Dimension.Height]: undefined,
    [Dimension.Weight]: undefined,
  });

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
            <Space direction="vertical" size="large">
              <DestinySelect setSelectedDestiny={setSelectedDestiny} />
              <DimensionsInput dimensions={dimensions} setDimensions={setDimensions} />
              <Cotization selectedDestiny={selectedDestiny} dimensions={dimensions} />
              <CreateShipment />
              <ShipmentResult statusCode={undefined} />
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App
