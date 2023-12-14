import { Alert, Button, Flex, Form, FormInstance, Input, Modal, Space, Typography } from "antd";
import { useState } from "react";
import { CreateShipmentData, DestinyAndDimensionsFields, ShipmentFields } from "./ShipmentForm";
import areFieldsInvalid from "../utils/ValidateFields";
const { Text } = Typography;
const { Item } = Form;
import classes from "./CreateShipmentModal.module.scss"

export type UserInfo = {
    name?: string,
    surnames?: string,
    email?: string,
}

function CreateShipmentModal({ form, price, courier, setStatusCode }: { form: FormInstance<CreateShipmentData>, price?: number, courier?: string, setStatusCode: (s: number) => void }) {
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const errorMessage = "Hubo un error al intentar crear el envio.";

    const createShipment = async () => {
        setLoading(true);
        setError(undefined);
        let shipmentData;

        try {
            shipmentData = await form.validateFields();
            if (!price || !courier) throw new Error();
        }
        catch (error) {
            setError("Hay errores en los campos ingresados. Por favor revisalos e intentalo nuevamente");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(import.meta.env.VITE_SERVER_URL + "/shipment", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...shipmentData, price, courier })
            })

            if (!res.ok) {
                setError(errorMessage);
                setLoading(false);
                return;
            }

            setError(undefined);
            setIsModalVisible(false);
            setStatusCode(res.status);
        } catch (error) {
            setError(errorMessage);
        }

        setLoading(false);
    }

    const showModal = () => setIsModalVisible(true)
    const hideModal = () => loading || setIsModalVisible(false)

    return <>
        <Button
            type="primary"
            onClick={showModal}
            disabled={areFieldsInvalid(form, DestinyAndDimensionsFields) || !price || !courier}
        >
            Crear envio
        </Button>
        <Modal
            title="Crear envío"
            open={isModalVisible}
            onCancel={hideModal}
            footer={
                <Button
                    key="submit"
                    htmlType="submit"
                    type="primary"
                    loading={loading}
                    onClick={createShipment}>
                    Guardar
                </Button>
            }
        >
            <Text>
                Por favor, ingresa los siguientes datos
            </Text>
            <Flex vertical justify="center" align="center" gap=".5rem" className={classes.personalInfoContainer}>
                <Item
                    name={ShipmentFields.Name}
                    label="Nombre"
                    rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
                >
                    <Input autoComplete="on" placeholder="Isabella" />
                </Item>
                <Item
                    name={ShipmentFields.LastName}
                    label="Apellidos"
                    rules={[{ required: true, message: 'Por favor ingresa tus apellidos' }]}>
                    <Input autoComplete="on" placeholder="Fernandez Silva" />
                </Item>
                <Item name={ShipmentFields.Email} label="E-mail"
                    rules={[
                        { type: 'email', message: 'El E-mail ingresado no es válido' },
                        { required: true, message: 'Por favor ingresa tu E-mail' },
                    ]}
                >
                    <Input autoComplete="on" placeholder="isa.fernandez@gmail.com" />
                </Item>
            </Flex>
            {error && <Alert message={error} type="error" />}
        </Modal>
    </>
}

export default CreateShipmentModal;