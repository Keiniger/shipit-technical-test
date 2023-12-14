import { Alert, Button, Form, FormInstance, Space } from "antd";
import { useEffect, useState } from "react";
import { CreateShipmentData, DestinyAndDimensionsFields } from "./ShipmentForm";
import areFieldsInvalid from "../utils/ValidateFields";
const { useWatch } = Form;
import classes from './Cotization.module.scss'

const formatCurrency = (value: number) => {
    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    });

    return formatter.format(value);
}

function Cotization({ form, price, setPrice, setCourier }:
    { form: FormInstance<CreateShipmentData>, price?: number, setPrice: (price?: number) => void, setCourier: (courier?: string) => void }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | undefined>();

    const formValues = useWatch([]);

    async function handleCotization() {
        if (areFieldsInvalid(form, DestinyAndDimensionsFields)) return;
        setLoading(true);
        setError(undefined);
        setPrice(undefined)
        setCourier(undefined);


        try {
            const res = await fetch(import.meta.env.VITE_SERVER_URL + "/cotization", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formValues })
            })

            if (!res.ok) {
                const { error } = await res.json()
                throw new Error(error);
            }

            const { price, courier } = await res.json()
            setPrice(price);
            setCourier(courier);
        } catch (error) {
            type Error = { message: string }
            setError((error as Error).message);
        }

        setLoading(false);
    }

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            handleCotization()
        }, 1500);

        return () => clearTimeout(debounceTimer)
    }, [
        formValues?.destinyId,
        formValues?.width,
        formValues?.height,
        formValues?.length,
        formValues?.weight
    ]);

    const showAlert = () => {
        if (loading) return;

        if (error !== undefined)
            return <Alert message={error} type="error" />

        if (price)
            return <Alert message={`El precio de este envío es de: ${formatCurrency(price)}`} type="info" />
    }

    return <Space direction="vertical" className={classes.cotizationContainer}>
        <Button
            onClick={handleCotization}
            loading={loading}
            disabled={areFieldsInvalid(form, DestinyAndDimensionsFields)}>
            Cotizar
        </Button>
        {showAlert()}
    </Space>
}

export default Cotization;