import "./Table.css";

const Table = ({id, dataDia, valor, tipo, nomeOperadorTransacao }) => {
 
  
  return (
    <div className="container">
       <div className="saldo">
        <h6>
          Saldo total: <span>{valor}$</span>
        </h6>
        <h6>
          Saldo no período: <span>{valor}$</span>
        </h6>
        
      </div>
     

      <table className="bordered striped centered">
        <thead>
          <tr>
            <th>Dados</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Nome operador</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{dataDia}</td>
            <td>{valor}</td>
            <td>{tipo}</td>
            <td>{nomeOperadorTransacao}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
