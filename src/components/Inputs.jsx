import { useState, useEffect } from "react";
import "./Inputs.css";
import Table from "./Table";

const Inputs = () => {
  const [dados, setDados] = useState([]);
  const [nome, setNome] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [message, setMessage] = useState(false);
  const [transferencias, setTransferencias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/banco/transacoes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setTransferencias(data);
      })
      .catch((err) => alert(err));
  }, []);

  async function fetchData(dataI, dataF, operador) {
    let url = "http://localhost:8080/banco/busca/";

    if (dataI) {
      url += `?inicio=${dataI}`;
    }

    if (dataF) {
      url += `&fim=${dataF}`;
    }

    if (!dataI && !dataF) {
      url += `?nome${operador}`;
    }

    if (operador) {
      url += `&nome=${operador}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    if (data == 0) {
      setMessage(true)
      const timer = setTimeout(() => setMessage(false),3500)
      return () => clearTimeout(timer)
    } else {
      setDados(data);
    }

    
  }

  return (
    <div className="inputs">
      <div className="box-input">
        <label>Data Início</label>
        <input
          type="text"
          placeholder="yyyy-mm-dd"
          value={dataInicial}
          onChange={(e) => setDataInicial(e.target.value)}
        />
      </div>

      <div className="box-input">
        <label>Data Final</label>
        <input
          type="text"
          placeholder="yyyy-mm-dd"
          value={dataFinal}
          onChange={(e) => setDataFinal(e.target.value)}
        />
      </div>

      <div className="box-input">
        <label>Nome Operador</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <a
        className="waves-effect waves-light btn"
        onClick={() => fetchData(dataInicial, dataFinal, nome)}
      >
        Pesquisar
      </a>

      <div className="dados">
        {message && (
          <div className="msg">
            <p>Nenhum registro encontrado com esses dados</p>
          </div>
        )}

        {dados.length == 0
          ? transferencias.map((transferencia) => (
              <Table
                id={transferencia.id}
                key={transferencia.id}
                dataDia={transferencia.dataTransferencia}
                nomeOperadorTransacao={transferencia.nomeOperadorTransacao}
                valor={transferencia.valor}
                tipo={transferencia.tipo}
              />
            ))
          : dados.length > 0 &&
            dados.map((item) => (
              <Table
                id={item.id}
                key={item.id}
                dataDia={item.dataTransferencia}
                nomeOperadorTransacao={item.nomeOperadorTransacao}
                valor={item.valor}
                tipo={item.tipo}
              />
            ))}
      </div>
    </div>
  );
};

export default Inputs;
