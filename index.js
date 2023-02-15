const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

const { Favorito, Visitante } = require("./db/models.js");

// ENDPOINTS ABAIXO SAO REFERENTES À QUESTAO 2 (INSERI ALGUMAS DE VISITANTE TAMBÉM SENAO NAO DAVA PRA CRIAR FAVORITO POIS PRECISA INFORMAR ID DO VISITANTE)

app.get("/api/visitantes", async (req, res) => {
	const todosVisitantes = await Visitante.findAll();
	return res.json(todosVisitantes);
});

app.post("/api/visitantes", async (req, res) => {
	const { email, senha } = req.body;

	if (!email || !senha) {
		return res.status(404).json({
			mensagem:
				"Campos obrigatorios não informados, favor informar: email, senha",
		});
	}

	const visitante = await Visitante.create({ email, senha });
	return res.status(201).json(visitante);
});

app.get("/api/favoritos", async (req, res) => {
	const todosFavoritos = await Favorito.findAll();
	return res.json(todosFavoritos);
});

app.get("/api/favoritos/:id", async (req, res) => {
	const { id } = req.params;

	const favorito = await Favorito.findByPk(id);

	if (favorito === null) {
		return res
			.status(404)
			.json({ mensagem: "Não existe nenhum favorito com esse id." });
	}
	return res.json(favorito);
});

app.post("/api/favoritos", async (req, res) => {
	const { titulo, link, categoria, visitanteId } = req.body;

	if (!titulo || !link || !categoria || !visitanteId) {
		return res.status(404).json({
			mensagem:
				"Campos obrigatorios não informados, favor informar: titulo, link, categoria, visitanteId",
		});
	}

	const visitante = await Visitante.findByPk(visitanteId);

	if (visitante === null) {
		return res.status(404).json({
			mensagem:
				"Não existe nenhum visitante com esse id. Crie um ou insira um visitante válido",
		});
	}

	const favorito = await Favorito.create({
		titulo,
		link,
		categoria,
		visitanteId,
	});
	return res.status(201).json(favorito);
});

app.put("/api/favoritos/:id", async (req, res) => {
	const { id } = req.params;

	const favorito = await Favorito.findByPk(id);

	if (favorito === null) {
		return res
			.status(404)
			.json({ mensagem: "Não existe nenhum favorito com esse id." });
	}

	const { titulo, link, categoria } = req.body;

	if (!titulo || !link || !categoria) {
		return res.status(404).json({
			mensagem:
				"Campos obrigatorios não informados, favor informar: titulo, link, categoria.",
		});
	}

	await favorito.update({ titulo, link, categoria });
	return res.json(favorito);
});

app.delete("/api/favoritos/:id", async (req, res) => {
	const { id } = req.params;

	const favorito = await Favorito.findByPk(id);

	if (favorito === null) {
		return res
			.status(404)
			.json({ mensagem: "Não existe nenhum favorito com esse id." });
	}

	await favorito.destroy();
	return res.json({ mensagem: "Favorito removido com sucesso." });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
