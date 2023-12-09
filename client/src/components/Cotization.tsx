import { Button, Typography } from "antd";
import { useState } from "react";
const { Text } = Typography;

function Cotization() {
    const [price, setPrice] = useState<number | undefined>()
    const handleCotization = () => {
        setPrice(1000);
    };

    return <>
        <Button onClick={handleCotization}>Cotizar</Button>
        {
            price &&
            <Text style={{ display: 'inline', width: '11.5rem' }}>
                El precio de este envío es de: {price}
            </Text>
        }
    </>
}

export default Cotization;