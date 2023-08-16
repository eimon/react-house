import { Link } from "react-router-dom";

const ItemDetail = ({producto,imagen}) => {
    return <div className="card my-3 p-3">
        {imagen&&<img src={producto.image} className="w-50 m-auto p-5"/>}
        <h3><Link to={`/item/`+producto.id} className="dropdown-item">{producto.title}</Link></h3>
        <p>Descripcion: {producto.description}</p>
        <p>Precio: ${producto.price}</p>
    </div>
}

export default ItemDetail;