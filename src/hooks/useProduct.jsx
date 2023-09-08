function useProduct(producto,cant){
    
    return {
        id:producto.id,
        title:producto.title,
        price:producto.price,
        cant:cant,
    }
}

export default useProduct