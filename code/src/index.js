import axios from 'axios';
import 'dotenv/config';

const { TOKEN } = process.env;
const api = axios.create({
	baseURL: 'https://discord.com/api/v10',
	headers: {
		authorization: TOKEN,
		accept: 'application/json',
	},
});

async function consume(func, route, ...options) {
	try {
		const r = await func(route, ...options);
		return r.data || r.status;
	} catch (err) {
		if (err.response) console.log(err.response.data);
		else console.log('Error');
		return err.response.status;
	}
}

class Servidor {
	constructor(guild) {
		this.guild = guild;
	}

	async listarCanais() {
		const r = await consume(api.get, `/guilds/${this.guild}/channels`);
		return r;
	}
}

class Canal extends Servidor {
	constructor(guild, channel) {
		super(guild);
		this.channel = channel;
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
		const r = await consume(api.get, `/channels/${this.channel}/messages`);
		return r;
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
}

const server = new Servidor('1037095906283114567');
const canal = new Canal('1037095906283114567', '1001877796945150082');

const s = await canal.inserirReacaoMensagem('1046974218337792000', '🤣');
console.log(s);

// //Mensagens

// async function inserirMensagem(channel) {
// 	const r = await api.post(`/channels/${channel}/messages`, {
// 		content: 'Hello World!',
// 		tts: true,
// 	});
// 	console.log(r.data);
// } //ok

// async function listarMensagens(channel) {
// 	const r = await api.get(
// 		`/channels/${channel}/messages?limit=50${/*&before={message.id}*/ ''}`
// 	);
// 	console.log(r);
// }

// async function adicionarReacao(channel) {
// 	const r = await api.put(
// 		`/channels/${channel}/messages/1046919162720682076/reactions/🤣/@me`
// 	);
// 	console.log(r.data);
// } //ok

// async function removerReacao(channel, messageId) {
// 	const r = await api.delete(
// 		`/channels/${channel}/messages/${messageId}/reactions/🤣/@me`
// 	);
// 	console.log(r.data);
// } //ok

// // Tópicos

// async function inserirTopico(channel) {
// 	const r = await api.post(`/channels/${channel}/threads`, {
// 		name: 'Hello World!',
// 		type: 11,
// 	});
// 	console.log(r.data);
// } //ok

// // Cargos

// // Canais
// async function listarCanaisCategoria(guild, categoria) {
// 	const r = await api
// 		.get(`/guilds/${guild}/channels`, {
// 			headers: {
// 				'User-Agent': 'axios/0.21.4',
// 				accept: 'application/json',
// 				authorization: TOKEN,
// 			},
// 		})
// 		.catch(() => console.log('error'));

// 	if (r.status === 200) console.log(r.data);
// }

// await listarCanaisCategoria('1037095906283114567', '962180825280036975');

// channel: 1001877796945150082
// guild: 1037095906283114567
// categoria: 962180825280036975
