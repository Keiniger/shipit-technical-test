import { InputNumber, Space } from "antd";

export enum Dimension {
    Length = 'length',
    Width = 'width',
    Height = 'height',
    Weight = 'weight'
}

export type Dimensions = {
    [Dimension.Length]?: number,
    [Dimension.Width]?: number,
    [Dimension.Height]?: number,
    [Dimension.Weight]?: number,
}

const min = 1, max = 10_000, step = 10;

function DimensionsInputs({ dimensions, setDimensions }: { dimensions: Dimensions, setDimensions: (d: Dimensions) => void }) {
    const handleDimension = (value: number | null, dimension: Dimension) => {
        setDimensions({ ...dimensions, [dimension]: Number(value) })
    };

    return <Space direction="vertical">
        <InputNumber
            min={min} max={max} step={step}
            type="number"
            addonAfter="cm"
            placeholder="Largo"
            value={dimensions.length}
            onChange={(v) => handleDimension(v, Dimension.Length)}
        />
        <InputNumber
            min={min} max={max} step={step}
            type="number"
            addonAfter="cm"
            placeholder="Ancho"
            value={dimensions.width}
            onChange={(v) => handleDimension(v, Dimension.Width)}
        />
        <InputNumber
            min={min} max={max} step={step}
            type="number"
            addonAfter="cm"
            placeholder="Alto"
            value={dimensions.height}
            onChange={(v) => handleDimension(v, Dimension.Height)}
        />
        <InputNumber
            min={min} max={max} step={step}
            type="number"
            addonAfter="kg"
            placeholder="Peso"
            value={dimensions.weight}
            onChange={(v) => handleDimension(v, Dimension.Weight)}
        />
    </Space>
}

export default DimensionsInputs;