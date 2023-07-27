export const Texto = ((props) => {
    return (
      <>
        <p>{props.parrafo}</p>
        {props.children}
      </>
    )
  });