import { Input } from "antd";
import { useState } from "react";

function DimensionsInputs() {
    const [dimensions, setDimensions] = useState({
        length: '',
        width: '',
        height: '',
        weight: '',
    });


    return <>
        <Input
            placeholder="Largo (cm)"
            value={dimensions.length}
            onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
        />
        <Input
            placeholder="Ancho (cm)"
            value={dimensions.width}
            onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
        />
        <Input
            placeholder="Alto (cm)"
            value={dimensions.height}
            onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
        />
        <Input
            placeholder="Peso (g)"
            value={dimensions.weight}
            onChange={(e) => setDimensions({ ...dimensions, weight: e.target.value })}
        />
    </>
}

export default DimensionsInputs;