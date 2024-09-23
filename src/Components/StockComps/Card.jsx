
const Card = ({stock})=>{
    <tr>
        <td>{stock.stock_symbol}</td>
        <td>{stock.buy_price}</td>
        <td>{stock.quantity}</td>
        <td>{stock.buy_date[10]}</td>
        <td>{stock.buy_price*stock.quantity}</td>
        <td>Current</td>
        <td>Profit</td>
    </tr>
}

export default Card;
