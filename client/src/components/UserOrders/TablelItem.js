const TableItem = (props) => {
  const amount = props.item.amount;
  const price = props.item.price;
  const totalPrice = amount * price;

  return (
    <tr>
      <td>{props.item.name}</td>
      <td>{amount}</td>
      <td>{price}</td>
      <td>{totalPrice}</td>
    </tr>
  );
};

export default TableItem;
