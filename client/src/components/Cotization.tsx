import { Alert, Button } from "antd";
import { useEffect, useState } from "react";
import { Dimension, Dimensions } from "./DimensionsInputs";

const formatCurrency = (value: number) => {
    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    });

    return formatter.format(value);
}

function Cotization({ selectedDestiny, dimensions }: { selectedDestiny?: number, dimensions: Dimensions }) {
    const [price, setPrice] = useState<number | undefined>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | undefined>();

    const handleCotization = async () => {
        setLoading(true);
        setError(undefined);

        try {
            const res = await fetch(import.meta.env.VITE_SERVER_URL + "/cotization", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destinyId: selectedDestiny, ...dimensions })
            })

            if (!res.ok) {
                const { error } = await res.json()
                throw new Error(error);
            }

            const price = await res.json()
            setPrice(Number(price))
        } catch (error: any) {
            setError(error.message);
        }

        setLoading(false);
    };


    const disabled = !selectedDestiny
        || !dimensions[Dimension.Length]
        || !dimensions[Dimension.Width]
        || !dimensions[Dimension.Height]
        || !dimensions[Dimension.Weight];

    // TODO: Ask if cotization should be recalculated each time a destiny/dimension is changed.
    // useEffect(() => {
    //     handleCotization()
    // }, [selectedDestiny, dimensions])

    const showAlert = () => {
        if (loading) return;

        if (error !== undefined)
            return <Alert message={error} type="error" />

        if (price)
            return <Alert message={`El precio de este envío es de: ${formatCurrency(price)}`} type="info" />
    }


    return <>
        <Button onClick={handleCotization} loading={loading} disabled={disabled}>
            Cotizar
        </Button>
        {showAlert()}
    </>
}

export default Cotization;