import { Button, Input, Modal } from "antd";

function CreateShipment() {
    const handleShipmentCreation = () => {
        Modal.info({
            title: 'Crear envío',
            content: <Input placeholder="Otro dato necesario" />,
            centered: true,
            onOk() { },
        });
    };

    return <Button type="primary" onClick={handleShipmentCreation}>Crear envío</Button>
}

export default CreateShipment;