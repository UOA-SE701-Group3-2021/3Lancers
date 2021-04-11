const axios = require('axios');

const express = require('express');

const router = express.Router();

const steamKey = process.env.STEAM_KEY;

router.get('/', async (req, res) => {
  console.log(steamKey);
  if (!steamKey) {
    return res.status(500).json({ error: 'No Key found in environment' });
  }
  const { steamVanity } = req.query;
  await axios
    .get(
      `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${steamKey}&vanityurl=${steamVanity}`
    )
    .then((response) => {
      if (response.data.response.success === 1) {
        console.log(response.data.response.steamid);
        return res.status(200).json(response.data.response.steamid);
      }
      return res.status(404).json({ error: 'No match for that username' });
    });
  return true;
});

router.get('/ping', (req, res) => res.sendStatus(200));

module.exports = router;
