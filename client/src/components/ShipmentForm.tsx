import { Button, Form, Space } from "antd";
import DestinySelect, { DestinyId } from "./DestinySelect";
import DimensionsInputs from "./DimensionsInputs";
import Cotization from "./Cotization";
import CreateShipmentModal from "./CreateShipmentModal";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import ShipmentResult from "./ShipmentResult";

const onFinish = (values: CreateShipmentData) => {
    console.log('Received values:', values);
};

export enum ShipmentFields {
    DestinyId = 'destinyId',
    Length = 'length',
    Width = 'width',
    Height = 'height',
    Weight = 'weight',
    Name = 'name',
    LastName = 'last_name',
    Email = 'email',
}

export const DestinyAndDimensionsFields = [
    ShipmentFields.DestinyId,
    ShipmentFields.Length,
    ShipmentFields.Width,
    ShipmentFields.Height,
    ShipmentFields.Weight
];

export const PersonalInfoFields = [
    ShipmentFields.Name,
    ShipmentFields.LastName,
    ShipmentFields.Email
]

export const AllShipmentFields = [
    ...DestinyAndDimensionsFields,
    ...PersonalInfoFields
]

export interface CreateShipmentData {
    [ShipmentFields.DestinyId]?: DestinyId;
    [ShipmentFields.Length]?: number;
    [ShipmentFields.Width]?: number;
    [ShipmentFields.Height]?: number;
    [ShipmentFields.Weight]?: number;
    [ShipmentFields.Name]: string;
    [ShipmentFields.LastName]: string;
    [ShipmentFields.Email]: string;
}

function ShipmentForm() {
    const [form] = useForm<CreateShipmentData>();
    const [statusCode, setStatusCode] = useState<number | undefined>();
    const [price, setPrice] = useState<number | undefined>();
    const [courier, setCourier] = useState<string | undefined>();

    const reset = () => {
        form.resetFields();
        setPrice(undefined);
        setStatusCode(undefined);
    }

    return <Form form={form} onFinish={(v) => onFinish(v)}>{
        !statusCode
            ? <Space direction="vertical" size="large">
                <DestinySelect />
                <DimensionsInputs />
                <Cotization
                    form={form}
                    price={price}
                    setPrice={setPrice}
                    setCourier={setCourier}
                />
                <CreateShipmentModal form={form} price={price} courier={courier} setStatusCode={setStatusCode} />
            </Space>
            : <ShipmentResult statusCode={statusCode} reset={reset} />
    }
    </Form >
}

export default ShipmentForm;