import { Alert, Spin, Table } from "antd";
import { useEffect, useState } from "react";

const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Apellido', dataIndex: 'last_name', key: 'last_name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Destino', dataIndex: 'destiny_name', key: 'destiny_name' },
    { title: 'Longuitud', dataIndex: 'length', key: 'length' },
    { title: 'Altura', dataIndex: 'height', key: 'height' },
    { title: 'Ancho', dataIndex: 'width', key: 'width' },
    { title: 'Peso', dataIndex: 'weight', key: 'weight' },
    { title: 'Courier', dataIndex: 'courier', key: 'courier' },
    { title: 'Precio', dataIndex: 'price', key: 'price' },
    { title: 'Fecha de creación', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Fecha de modificación', dataIndex: 'updatedAt', key: 'updatedAt' },
];

type Shipment = {
    id: number,
    name: string,
    last_name: string,
    email: string,
    destiny_name: string,
    length: number,
    height: number,
    width: number,
    weight: number,
    courier: string,
    price: number,
    createdAt: string,
    updatedAt: string
}

function ShipmentsTable() {
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | undefined>()

    const fetchShipments = async () => {
        setLoading(true);

        try {
            const res = await fetch(import.meta.env.VITE_SERVER_URL + "/shipment", { method: "GET" })

            if (!res.ok) {
                setError("Hubo un error al solicitar los envios. Inténtalo de nuevo más tarde");
                return;
            }

            const shipments = await res.json() as Shipment[];
            shipments.sort((a, b) => b.id - a.id);
            setShipments(shipments);
        } catch (error) {
            setError("Hubo un error al solicitar los envios. Inténtalo de nuevo más tarde");
        }

        setLoading(false);
    }

    useEffect(() => { fetchShipments() }, [])

    if (error) return <Alert message={error} type="error" showIcon />;

    return <Spin spinning={loading}>
        <Table dataSource={shipments} columns={columns} scroll={{ x: true }} />
    </Spin>
}

export default ShipmentsTable;