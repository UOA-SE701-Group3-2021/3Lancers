const axios = require('axios');

const express = require('express');

const router = express.Router();

const steamKey = process.env.STEAM_KEY;

/**
 * Filter the unwanted fields from the steam data & sort by playtime
 * */
const filterSteamData = (steamData) => {
  // Remove the fields that are too specific
  const trimmedData = steamData.map(
    ({
      // eslint-disable-next-line camelcase
      img_logo_url,
      // eslint-disable-next-line camelcase
      has_community_visible_stats,
      // eslint-disable-next-line camelcase
      playtime_windows_forever,
      // eslint-disable-next-line camelcase
      playtime_mac_forever,
      // eslint-disable-next-line camelcase
      playtime_linux_forever,
      ...keepAttrs
    }) => keepAttrs
  );
  const newData = trimmedData.map((item) => {
    const { appid: id, ...rest } = item;
    return { id, ...rest };
  });
  // Sort by playtime first and then alphabetically
  newData.sort((game1, game2) =>
    // eslint-disable-next-line no-nested-ternary
    game1.playtime_forever < game2.playtime_forever
      ? 1
      : // eslint-disable-next-line no-nested-ternary
      game1.playtime_forever === game2.playtime_forever
      ? game1.name > game2.name
        ? 1
        : -1
      : -1
  );
  return newData;
};

/**
 * GET /?steamVanity=<vanityURL> endpoint to get the game library for a user
 * Returns: 500 if the environmental variable cannot be found or if the server breaks.
 *          404 if some of the steam data cannot be retrieved.
 *          200 if the data retrieval request was successful
 */
router.get('/', async (req, res) => {
  let steamId;
  // Checking if the STEAM_KEY environmental variable has been found
  if (!steamKey) {
    return res.status(500).json({ error: 'No Key found in environment' });
  }
  // Retrieve vanity URL from query params
  const { steamVanity } = req.query;
  if (!steamVanity) {
    return res
      .status(400)
      .json({ error: 'Malformed request: steamVanity query parameter is invalid' });
  }
  // TODO - pass in Steamworks URL for dependency injection
  await axios
    .get(
      `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${steamKey}&vanityurl=${steamVanity}`
    )
    .then((response) => {
      // Success of 1 from SteamWorks indicates a successful request
      if (response.data.response.success === 1) {
        steamId = response.data.response.steamid;
        return true;
      }
      return res.status(404).json({ error: 'No match for that username' });
    });
  if (steamId) {
    console.log(`Steam ID ${steamId} found for ${steamVanity}`);
    await axios
      .get(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${steamKey}&steamid=${steamId}&include_appinfo=true`
      )
      .then((response) => {
        // Checking to see if any games were returned
        if (response.data.response.game_count > 0) {
          console.log(`Found ${response.data.response.game_count} game(s)`);
          return res.status(200).json(filterSteamData(response.data.response.games));
        }
        return res
          .status(404)
          .json({ error: 'No games found for that username; Their profile may be private' });
      });
  }
  return true;
});

router.get('/ping', (req, res) => res.sendStatus(200));

module.exports = router;
