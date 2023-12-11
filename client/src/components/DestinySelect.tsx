import { Select } from "antd";
import { useEffect, useState } from "react";

export type DestinyId = number

export type DestinyData = {
    id: DestinyId,
    country_name: string,
    external_id: number,
    name: string,
}

const capitalizeFirstLetter = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


function DestinySelect({ setSelectedDestiny }: { setSelectedDestiny: (id: DestinyId) => void }) {
    const [destinies, setDestinies] = useState<DestinyData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const onSearch = (value: string) => {
        console.log('search:', value);
    };


    const selectOptions = () => destinies?.map((d) => ({ value: String(d.id), label: capitalizeFirstLetter(d.name) }))

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

    return <Select
        showSearch
        style={{ width: '11.5rem' }}
        loading={loading}
        disabled={loading}
        placeholder={"Seleccionar destino"}
        onChange={(value: DestinyId) => setSelectedDestiny(value)}
        options={selectOptions()}
        onSearch={onSearch}
        filterOption={filterOption}
    />
}

export default DestinySelect;