import { Link } from 'react-router-dom';

export const NavBar = ({items,logo,children,handleOnClick}) => {
    return <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#"><img src={logo} alt="Logo" /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={'/'} onClick={handleOnClick}>Inicio</Link>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Categorías
                    </a>
                    <ul className="dropdown-menu">
                    {items.map((item)=>{
                            return <li key={item.id}><Link to={`/categoria/${item}`} className="dropdown-item" onClick={handleOnClick}>{item}</Link></li>
                        })}
                    </ul>
                </li>
            </ul>
            
            {children}
            </div>
        </div>
    </nav>;
};