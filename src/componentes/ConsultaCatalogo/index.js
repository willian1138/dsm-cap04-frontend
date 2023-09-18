import { useEffect, useState } from "react";
import "./styles.css";

const ConsultaCatalogo = () => {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState([]);
  useEffect(() => {
    const consulta = async () => {
      try {
        const resposta = await fetch("http://localhost:8080/api/v1/produtos");
        if (!resposta.ok) {
          throw new Error();
        }
        const dados = await resposta.json();
        console.log(JSON.stringify(dados));
        setProdutos(dados);
      } catch (error) {
        console.log(error);
        setErro(error.message);
      }
    };
    consulta();
  }, []);
  if (erro.length > 0) {
    return <div> Erro ao acessar a API : {erro} </div>;
  }
  return (
    <div>
      <h3>Consulta Catalogo </h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Custo</th>
            <th>Quant</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.descricao}</td>
              <td>{produto.custo}</td>
              <td>{produto.quantidadeNoEstoque}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ConsultaCatalogo;
