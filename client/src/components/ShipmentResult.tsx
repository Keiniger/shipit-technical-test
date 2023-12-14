import { Button, Form, Result } from "antd";
const { Item } = Form;

function ShipmentResult({ statusCode, reset }: { statusCode?: number, reset: () => void }) {
    if (statusCode === undefined) return

    const resetButton = (msg: string) =>
        <Item key="reset">
            <Button
                type="primary"
                onClick={reset}
                htmlType="reset">
                {msg}
            </Button>
        </Item>

    if (statusCode === 200)
        return <Result
            status="success"
            title="Envío creado exitosamente"
            extra={[resetButton("Crear nuevo envío")]}
        />

    return <Result
        status="error"
        title="Hubo un problema al crear el envío"
        subTitle="Intentalo nuevamente. Si el problema persiste, contacta con el administrador."
        extra={[resetButton("Intentar nuevamente")]} />
}

export default ShipmentResult