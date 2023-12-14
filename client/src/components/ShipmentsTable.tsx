import { Alert, Spin, Table } from "antd";
import { useEffect, useState } from "react";

const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Length', dataIndex: 'length', key: 'length' },
    { title: 'Height', dataIndex: 'height', key: 'height' },
    { title: 'Width', dataIndex: 'width', key: 'width' },
    { title: 'Weight', dataIndex: 'weight', key: 'weight' },
    { title: 'Courier', dataIndex: 'courier', key: 'courier' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
];

type Shipment = {
    id: number,
    name: string,
    last_name: string,
    email: string,
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

            const shipments = await res.json();
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