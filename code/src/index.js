import axios from 'axios';
import consume from './utils/consume.js';
import 'dotenv/config';
const { TOKEN } = process.env;

const api = axios.create({
	baseURL: 'https://discord.com/api/v10',
	headers: {
		authorization: TOKEN,
		accept: 'application/json',
	},
});

class Servidor {
	constructor(guild) {
		this.guild = guild;
	}

	// Membros
	async buscarMembros() {
		const r = await consume(api.get, `/guilds/${this.guild}/members`);
		return r;
	}

	// Canais
	async listarCanais() {
		const r = await consume(api.get, `/guilds/${this.guild}/channels`);
		return r;
	}

	async listarCanaisPorCategoria(categoria) {
		const channels = await this.listarCanais();
		const filtered = [];

		for (const channel of channels) {
			if (channel.parent_id == categoria) filtered.push(channel);
		}
		return filtered;
	}

	// Cargos
	async criarCargo(settings) {
		const r = await consume(api.post, `/guilds/${this.guild}/roles`, settings);
		return r;
	}

	async adicionarCargoUsuario(user, role) {
		const r = await consume(
			api.put,
			`/guilds/${this.guild}/members/${user}/roles/${role}`
		);
		return r;
	}

	async remvoverCargoUsuario(user, role) {
		const r = await consume(
			api.delete,
			`/guilds/${this.guild}/members/${user}/roles/${role}`
		);
		return r;
	}
}

class Canal extends Servidor {
	constructor(guild, channel) {
		super(guild);
		this.channel = channel;
	}

	// Mensagens
	async ultimaMensagem() {
		const id = await consume(api.get, `/channels/${this.channel}/messages?limit=1`);
		console.log(id);
		return id;
	}

	async inserirMensagem(content) {
		if (!content || !content.trim() || content.length > 2000) return 400;

		const r = await consume(api.post, `/channels/${this.channel}/messages`, {
			content,
			tts: false,
		});
		return r;
	}

	async listarMensagens() {
		let messages = [],
			lastId = await this.ultimaMensagem();

		do {
			const r = await consume(
				api.get,
				`/channels/${this.channel}/messages?limit=100&before=${lastId}`
			);
			lastId = r[r.length - 1].id;
			messages = [...r, messages];
		} while (r.length != 100);

		return messages;
	}

	async inserirReacaoMensagem(message, reaction) {
		if (!reaction) return 400;

		const r = await consume(
			api.put,
			`/channels/${this.channel}/messages/${message}/reactions/${reaction}/@me`
		);
		return r;
	}

	async removerReacaoMensagem(message, reaction) {
		if (!reaction) return 400;

		const r = await consume(
			api.delete,
			`/channels/${this.channel}/messages/${message}/reactions/${reaction}/@me`
		);
		return r;
	}

	// Topicos
	async listarMensagensTopico(topico) {
		const r = await consume(
			api.get,
			`https://discord.com/api/v10/channels/${topico}/messages`
		);
		return r;
	}

	// Canal
	async alterarPermissoes(settings) {
		const r = await consume(api.patch, `/channels/${this.channel}`, settings);
		return r;
	}

	async adicionarMembros(members, settings) {
		for (const member of members) {
			const r = await consume(
				api.put,
				`/channels/${this.channel}/permissions/${member}`,
				settings
			);
			if (r != 204) throw new Error();
		}
	}

	async removerMembros(members) {
		for (const member of members) {
			const r = await consume(
				api.delete,
				`/channels/${this.channel}/permissions/${member}`
			);
			if (r != 204) throw new Error();
		}
	}
}

// channel: 1001877796945150082
// guild: 1037095906283114567
// categoria: 962180825280036975
// user: 336169222902251521
// message: 1047107544792965141
