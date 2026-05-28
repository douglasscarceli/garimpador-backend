const fetch = require("node-fetch");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { q, preco_min, preco_max, frete_gratis, condicao, ordem } = req.query;
  if (!q) return res.status(400).json({ error: "Parâmetro q é obrigatório" });

  let url = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(q)}&limit=20`;
  if (preco_min) url += `&price_min=${preco_min}`;
  if (preco_max) url += `&price_max=${preco_max}`;
  if (frete_gratis === "true") url += `&shipping_cost=free`;
  if (condicao) url += `&condition=${condicao}`;
  if (ordem) url += `&sort=${ordem}`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "garimpador/1.0" }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
