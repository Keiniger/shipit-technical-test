import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { useState } from "react";

function DestinySelect() {
    const [selectedDestiny, setSelectedDestiny] = useState(null);

    const destinies = [
        { id: 1, name: 'Destino 1' },
        { id: 2, name: 'Destino 2' },
    ];

    return <Select
        style={{ width: '11.5rem' }}
        placeholder="Seleccionar destino"
        onChange={(value) => setSelectedDestiny(value)}
    >
        {destinies.map((destiny) => (
            <Option>
                {destiny.name}
            </Option>
        ))}
    </Select>
}

export default DestinySelect;