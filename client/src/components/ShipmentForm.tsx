import { Flex, Form } from "antd";
import DestinySelect, { DestinyId } from "./DestinySelect";
import DimensionsInputs from "./DimensionsInputs";
import Cotization from "./Cotization";
import CreateShipmentModal from "./CreateShipmentModal";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import ShipmentResult from "./ShipmentResult";

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

export type CotizationType = {
    price: number,
    courier: string
}
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
    const [cotization, setCotization] = useState<CotizationType | undefined>();

    const reset = () => {
        form.resetFields();
        setCotization(undefined);
        setStatusCode(undefined);
    }

    return <Form form={form}>{
        !statusCode
            ? <Flex vertical gap="2rem">
                <DestinySelect />
                <DimensionsInputs />
                <Cotization
                    form={form}
                    cotization={cotization}
                    setCotization={setCotization}
                />
                <CreateShipmentModal form={form} cotization={cotization} setStatusCode={setStatusCode} />
            </Flex>
            : <ShipmentResult statusCode={statusCode} reset={reset} />
    }
    </Form >
}

export default ShipmentForm;