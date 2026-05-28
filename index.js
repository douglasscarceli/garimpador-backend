const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/buscar", async (req, res) => {
  const { q, preco_min, preco_max, frete_gratis, condicao, ordem } = req.query;

  if (!q) return res.status(400).json({ error: "Parâmetro q é obrigatório" });

  let url = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(q)}&limit=20`;

  if (preco_min) url += `&price_min=${preco_min}`;
  if (preco_max) url += `&price_max=${preco_max}`;
  if (frete_gratis === "true") url += `&shipping_cost=free`;
  if (condicao) url += `&condition=${condicao}`;
  if (ordem) url += `&sort=${ordem}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar no Mercado Livre" });
  }
});

app.get("/", (req, res) => res.send("Garimpador backend rodando!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
