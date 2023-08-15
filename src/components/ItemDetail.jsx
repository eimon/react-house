const ItemDetail = ({descripcion, precio}) => {
    return <article>
        <h2>Descripcion: {descripcion}</h2>
        <p>Precio: ${precio}</p>
    </article>
}

export default ItemDetail;