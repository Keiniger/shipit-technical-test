import { Flex, Form, InputNumber } from "antd";
import { ShipmentFields } from "./ShipmentForm";
const { Item } = Form;
import classes from "./DimensionsInputs.module.scss";

const min = 1, max = 1000, step = 10, required = true;

function DimensionsInputs() {
    return <Flex vertical className={classes.inputContainer}>
        <Item
            label="Largo"
            name={ShipmentFields.Length}
            rules={[{ required, message: 'La longitud es obligatoria' }]}
        >
            <InputNumber
                className={classes.inputNumber}
                autoComplete="on"
                min={min} max={max} step={step}
                type="number"
                addonAfter="cm"
            />
        </Item>
        <Item
            label="Ancho"
            name={ShipmentFields.Width}
            rules={[{ required, message: 'El ancho es obligatorio' }]}
        >
            <InputNumber
                className={classes.inputNumber}
                autoComplete="on"
                min={min} max={max} step={step}
                type="number"
                addonAfter="cm"
            />
        </Item>
        <Item
            label="Alto"
            name={ShipmentFields.Height}
            rules={[{ required, message: 'El alto es obligatorio' }]}
        >
            <InputNumber
                className={classes.inputNumber}
                autoComplete="on"
                min={min} max={max} step={step}
                type="number"
                addonAfter="cm"
            />
        </Item>
        <Item
            label="Peso"
            name={ShipmentFields.Weight}
            rules={[{ required, message: 'El peso es obligatorio' }]}
        >
            <InputNumber
                className={classes.inputNumber}
                autoComplete="on"
                min={min} max={max} step={step}
                type="number"
                addonAfter="kg"
            />
        </Item>
    </Flex>
}

export default DimensionsInputs;