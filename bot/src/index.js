require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const axios = require("axios");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

const cache = new Map();

async function getPokemon(name) {
	const { data } = await axios.get(
		`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
	);

	return {
		name: data.name,
		types: data.types.map((t) => t.type.name),
	};
}

async function askLLM(prompt) {
	const { data } = await axios.post("http://ollama:11434/api/generate", {
		model: "gemma3:1b",
		prompt,
		stream: false,
		options: {
			temperature: 0.2,
			num_predict: 80,
		},
	});

	return data.response;
}

client.once("ready", () => {
	console.log(`✅ ${client.user.tag} online`);
});

client.on("messageCreate", async (message) => {
	if (message.author.bot) return;

	if (!message.content.startsWith("!counter ")) return;

	const pokemon = message.content.replace("!counter ", "").trim().toLowerCase();

	if (cache.has(pokemon)) {
		return message.reply(cache.get(pokemon));
	}

	try {
		await message.channel.send("🔍 Procurando counter...");

		const poke = await getPokemon(pokemon);

		const prompt = `
Pokemon: ${poke.name}
Tipos: ${poke.types.join(", ")}

Responda em português.

Informe:
- melhor counter
- motivo

Máximo 3 linhas.
`;

		const resposta = await askLLM(prompt);

		cache.set(pokemon, resposta);

		await message.reply(resposta);
	} catch (err) {
		console.error(err);

		await message.reply("Não consegui consultar esse Pokémon.");
	}
});

client.login(process.env.DISCORD_TOKEN);
