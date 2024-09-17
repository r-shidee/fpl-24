import { data } from "autoprefixer";
let baseURL = "https://fantasy.premierleague.com/api/";
let endURL = "/";

type Team = {
	code: number;
	draw: number;
	form: null;
	id: number;
	loss: number;
	name: string;
	short_name: string;
	strength: number;
	team_division: null;
	unavailable: false;
	strength_overall_home: number;
	strength_overall_away: number;
	strength_attack_home: number;
	strength_attack_away: number;
	strength_defence_home: number;
	strength_defence_away: number;
	pulse_id: number;
};

type Player = {
	id: number;
	web_name: string;
};

export async function fetchData() {
	const url = baseURL + "bootstrap-static" + endURL;
	const response = await fetch(url);
	const result = await response.json();
	const data = result;
	return data;
}

export async function fetchPlayers() {
	const url = baseURL + "bootstrap-static" + endURL;
	const response = await fetch(url);
	const result = await response.json();
	const players = result.elements;
	return players;
}

export async function fetchPlayer(
	playerID: number | string
): Promise<Player | undefined> {
	const url = baseURL + "bootstrap-static" + endURL;
	const response = await fetch(url);
	const result = await response.json();
	const players = result.elements;
	const foundPlayer = players.find(
		(player: Player) => player.id === Number(playerID)
	);
	return foundPlayer;
}

export async function fetchGameweek() {
	const url = baseURL + "fixtures" + endURL;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export async function fetchTeams(): Promise<Team[]> {
	const url = baseURL + "bootstrap-static" + endURL;
	const response = await fetch(url);
	const result = await response.json();
	const teams = result.teams;
	return teams;
}

export async function fetchTeamsByName(teamName: string): Promise<Team[]> {
	const url = baseURL + "bootstrap-static" + endURL;
	const response = await fetch(url);
	const result = await response.json();
	const teams = result.teams;
	const foundTeam = teams.find((team: Team) => team.name === String(teamName));
	return foundTeam;
}

// export async function getTeamFixtures(players, paramsID) {
// 	const foundTeam = players.find(({ team }) => team === Number(paramsID));

// 	const url = baseURL + "element-summary/" + foundTeam.id + endURL;

// 	const response = await fetch(url);
// 	const result = await response.json();
// 	const fixtures = result;
// 	return fixtures;
// }

export async function getFixtures(playerID: number | string) {
	const url = baseURL + "element-summary/" + playerID + endURL;
	const response = await fetch(url);
	const result = await response.json();
	const fixtures = result;
	return fixtures;
}

// export async function fetchPlayersByTeam(id) {
// 	const url = baseURL + "bootstrap-static" + endURL;
// 	const response = await fetch(url);
// 	const result = await response.json();
// 	const players = result.elements;
// 	// console.log(getTeamsID(id));

// 	let filteredPlayers = players.filter(function (player) {
// 		return player.team == getTeamsID(id);
// 	});
// 	return filteredPlayers;
// }

export const getPlayersPosition = (
	element_type: number
): string | undefined => {
	const position: { [key: number]: string } = {
		1: "Goalkeeper",
		2: "Defender",
		3: "Midfielder",
		4: "Striker",
	};

	return position[element_type];
};

export const getPlayerStatus = (code: string): string | undefined => {
	const status: { [key: string]: string } = {
		i: "injured",
		u: "unavailable",
		d: "doubt",
		n: "not available",
		s: "suspended",
	};

	return status[code];
};

// export const getxgHomeDifficulty = (code) => {
// 	let clubs = {
// 		1: 5,
// 		2: 5,
// 		3: 2,
// 		4: 2,
// 		5: 4,
// 		6: 3,
// 		7: 3,
// 		8: 3,
// 		9: 3,
// 		10: 4,
// 		11: 5,
// 		12: 1,
// 		13: 5,
// 		14: 3,
// 		15: 4,
// 		16: 1,
// 		17: 1,
// 		18: 2,
// 		19: 2,
// 		20: 1,
// 	};

// 	return clubs[code];
// };

// export const getxgAwayDifficulty = (code) => {
// 	let clubs = {
// 		1: 5,
// 		2: 4,
// 		3: 2,
// 		4: 3,
// 		5: 3,
// 		6: 1,
// 		7: 5,
// 		8: 4,
// 		9: 4,
// 		10: 2,
// 		11: 5,
// 		12: 1,
// 		13: 5,
// 		14: 2,
// 		15: 3,
// 		16: 2,
// 		17: 1,
// 		18: 5,
// 		19: 1,
// 		20: 3,
// 	};

// 	return clubs[code];
// };

// export const getClubShort = (code) => {
// 	let clubs = {
// 		1: "ars",
// 		2: "avl",
// 		3: "bou",
// 		4: "bre",
// 		5: "bha",
// 		6: "bur",
// 		7: "che",
// 		8: "cry",
// 		9: "eve",
// 		10: "ful",
// 		11: "liv",
// 		12: "lut",
// 		13: "mci",
// 		14: "mun",
// 		15: "new",
// 		16: "nfo",
// 		17: "shu",
// 		18: "tot",
// 		19: "whu",
// 		20: "wol",
// 	};

// 	return clubs[code];
// };

// export const getClubLogo = (code) => {
// 	let clubs = {
// 		1: 3,
// 		2: 7,
// 		3: 91,
// 		4: 94,
// 		5: 36,
// 		6: 90,
// 		7: 8,
// 		8: 31,
// 		9: 11,
// 		10: 54,
// 		11: 14,
// 		12: 102,
// 		13: 43,
// 		14: 1,
// 		15: 4,
// 		16: 17,
// 		17: 49,
// 		18: 6,
// 		19: 21,
// 		20: 39,
// 	};

// 	return clubs[code];
// };

// export const getCompletedGameweek = (fixtures) => {

// 	console.log(fixtures
// };
