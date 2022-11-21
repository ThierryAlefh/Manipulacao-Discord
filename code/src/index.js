import axios from 'axios';
import 'dotenv/config';
import PromptSync from 'prompt-sync';

const { TOKEN, GUILD, DISCORD_URL } = process.env;
const api = axios.create({ baseURL: DISCORD_URL });

class Servidor {
	constructor(token, guild) {
		this.token = token;
		this.guild = guild;
	}
}

class Canal extends Servidor {
	constructor(token, guild, canal) {
		super(token, guild);
		this.canal = canal;
	}

	async listarMensagens() {
		const r = await api.get(
			`/channels/${this.canal}/messages?limit=50${/*&before={message.id}*/ ''}`,
			{
				headers: {
					authorization: this.token,
				},
			}
		);
		return r.data;
	}
}

// /*Buscar membros de um servidor*/
// async consultarUsuarios() {
// 	const r = await api.get(`/guilds/${GUILD}/members`, {
// 		authorization: TOKEN,
// 	});
// 	return r.data;
// }

// async inserirMensagem()

const comandos = new Canal(TOKEN, GUILD, '');
