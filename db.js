// Base de datos programática para json-server@0.17.4
// Requiere @faker-js/faker@8.4.1 (CommonJS)
const { fakerES: faker } = require('@faker-js/faker');

const NUM_GAMES = 30;
const NUM_CLIENTS = 12;

const GENRES = [
  'Acción', 'Aventura', 'RPG', 'Estrategia',
  'Simulación', 'Deportes', 'Carreras', 'Puzles'
];

const PLATFORMS = [
  'PC', 'PlayStation 5', 'Xbox Series X|S', 'Nintendo Switch'
];

const PREFIXES = ['Crónicas', 'Leyendas', 'Sombras', 'Secretos', 'Guardianes', 'Ecos'];
const WORLDS = ['de Orión', 'del Abismo', 'de Eldoria', 'del Norte', 'de Atlantis'];

module.exports = () => {
  // Misma semilla => mismos registros en cada arranque.
  faker.seed(2026);

  // 1. Videojuegos
  const games = Array.from({ length: NUM_GAMES }, (_, i) => ({
    id: i + 1,
    title: `${faker.helpers.arrayElement(PREFIXES)} ${faker.helpers.arrayElement(WORLDS)} ${i + 1}`,
    genre: faker.helpers.arrayElement(GENRES),
    platform: faker.helpers.arrayElement(PLATFORMS),
    price: faker.number.int({ min: 499, max: 7999 }) / 100,
    stock: faker.number.int({ min: 0, max: 50 })
  }));

  // 2. Clientes
  const clients = Array.from({ length: NUM_CLIENTS }, (_, i) => ({
    id: i + 1,
    name: faker.person.firstName(),
    lastname: faker.person.lastName()
  }));

  // 3. Relación N:M: un cliente se asocia con 2 a 5 videojuegos.
  // arrayElements escoge elementos distintos; no hay pares repetidos.
  const clientGames = [];

  for (const client of clients) {
    const selectedGames = faker.helpers.arrayElements(games, { min: 2, max: 5 });

    for (const game of selectedGames) {
      clientGames.push({
        id: clientGames.length + 1,
        clientId: client.id,
        gameId: game.id
      });
    }
  }

  return { games, clients, clientGames };
};
