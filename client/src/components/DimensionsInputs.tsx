import { Form, InputNumber, Space } from "antd";
import { ShipmentFields } from "./ShipmentForm";
const { Item } = Form;

const min = 1, max = 1000, step = 10;

function DimensionsInputs() {
    return <Space direction="vertical">
        <Item
            label="Largo"
            name={ShipmentFields.Length}
            rules={[{ required: true, message: 'La longitud es obligatoria' }]}
        >
            <InputNumber
                min={min} max={max} step={step}
                type="number"
                addonAfter="cm"
            />
        </Item>
        <Item
            label="Ancho"
            name={ShipmentFields.Width}
            rules={[{ required: true, message: 'El ancho es obligatorio' }]}
        >
            <InputNumber
                min={min} max={max} step={step}
                type="number"
                addonAfter="cm"
            />
        </Item>
        <Item
            label="Alto"
            name={ShipmentFields.Height}
            rules={[{ required: true, message: 'El alto es obligatorio' }]}
        >
            <InputNumber
                min={min} max={max} step={step}
                type="number"
                addonAfter="cm"
            />
        </Item>
        <Item
            label="Peso"
            name={ShipmentFields.Weight}
            rules={[{ required: true, message: 'El peso es obligatorio' }]}
        >
            <InputNumber
                min={min} max={max} step={step}
                type="number"
                addonAfter="kg"
            />
        </Item>
    </Space>
}

export default DimensionsInputs;