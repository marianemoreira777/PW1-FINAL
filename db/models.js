const { DataTypes } = require("sequelize");
const database = require("./config.js");

const Visitante = database.define(
	"Visitante",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		senha: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		// Other model options go here
		timestamps: false,
	}
);

const Favorito = database.define(
	"Favorito",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		titulo: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		link: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		categoria: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		// Other model options go here
		timestamps: false,
	}
);

Visitante.hasMany(Favorito, { foreignKey: "visitanteId" });
Favorito.belongsTo(Visitante, { foreignKey: "visitanteId" });

(async () => {
	try {
		await database.authenticate();
		console.log("Conexão estabelecida com sucesso.");
	} catch (error) {
		console.error(
			"Não foi possivel se conectar ao banco de dados: ",
			error
		);
	}
})();

(async () => {
	try {
		await database.sync();
		console.log("Models criados com sucesso.");
	} catch (error) {
		console.log(
			"Ocorreu um erro ao sincronizar os models no banco de dados: ",
			error
		);
	}
})();

module.exports = { Visitante, Favorito };
