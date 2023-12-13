import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import { ShipmentFields } from "./ShipmentForm";
const { Item } = Form;

export type DestinyId = number

export type DestinyData = {
    id: DestinyId,
    country_name: string,
    external_id: number,
    name: string,
}

type SelectOption = { value: string, label: string }

const capitalizeFirstLetter = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


function DestinySelect() {
    const [destinies, setDestinies] = useState<DestinyData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const selectOptions = () => destinies?.map((d) => ({
        value: d.id,
        label: capitalizeFirstLetter(d.name)
    }) as unknown as SelectOption) // Hack to cast value to string without making it a string 

    const fetchDestinies = async () => {
        setLoading(true);

        try {
            const res = await fetch(import.meta.env.VITE_SERVER_URL + "/destinies")

            if (!res.ok) {
                setError("Hubo un error al solicitar los destinos. Inténtalo de nuevo más tarde");
                return;
            }

            const destinies = await res.json();
            setDestinies(destinies);
        } catch (error) {
            setError("Hubo un error al solicitar los destinos. Inténtalo de nuevo más tarde");
        }

        setLoading(false);
    }

    useEffect(() => { fetchDestinies() }, [])

    if (error) return <Select
        status="error"
        style={{ width: '11.5rem' }}
        placeholder={error}
    />

    return <Item
        label="Selecciona un destino para tu envio"
        name={ShipmentFields.DestinyId}
        required
    >
        <Select
            showSearch
            style={{ width: '11.5rem' }}
            loading={loading}
            disabled={loading}
            placeholder={"Seleccionar destino"}
            options={selectOptions()}
            filterOption={filterOption}
        />
    </Item>
}

export default DestinySelect;