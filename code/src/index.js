import axios from 'axios';
import consume from './utils/consume.js';
import 'dotenv/config';
const { TOKEN } = process.env;

const api = axios.create({
	baseURL: 'https://discord.com/api/v10',
	headers: {
		Authorization: TOKEN,
		Accept: 'application/json',
		'Accept-Encoding': 'application/json',
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
		this.propriedades = {};
	}

	async sincronizar() {
		const r = await consume(api.get, `/channels/${this.channel}`);
		this.propriedades = { ...r };
		return r;
	}

	// Mensagens
	async inserirMensagem(content) {
		if (!content || !content.trim() || content.length > 2000) return 400;

		const r = await consume(api.post, `/channels/${this.channel}/messages`, {
			content,
			tts: false,
		});
		return r;
	}

	async listarMensagens(limit = Infinity) {
		let messages = [],
			lastId = 0,
			length = 0;

		do {
			const r = await consume(
				api.get,
				`/channels/${this.channel}/messages?limit=100${lastId ? `&before=${lastId}` : ''}`
			);
			r.reverse();
			lastId = r[0].id;
			messages = [...r, ...messages];
			length = r.length;
		} while (length == 100 && messages.length < limit);

		if (messages.length > limit) {
			messages.splice(0, messages.length - limit);
		}

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
