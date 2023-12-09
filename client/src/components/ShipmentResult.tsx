import { Button, Result } from "antd";

function ShipmentResult({ statusCode }: { statusCode?: number }) {
    if (statusCode === undefined) return;

    if (statusCode === 200)
        return <Result
            status="success"
            title="Envío creado exitosamente"
            extra={[<Button>Crear nuevo envío</Button>]}
        />

    return <Result
        status="error"
        title="Hubo un problema al crear el envío"
        subTitle="Intentalo nuevamente. Si el problema persiste, contacta con el administrador."
        extra={[<Button>Intentar nuevamente</Button>]} />
}

export default ShipmentResult