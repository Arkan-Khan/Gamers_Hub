const express = require('express');
const pg = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Database connection details (replace with your actual credentials)
const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'Gamers_Hub',
    password: '2643',
    port: 5432
  };

const pool = new pg.Pool(dbConfig); // Create a connection pool

// Route to get all players (replace 'Players' with your table name if different)
app.get('/players', async (req, res) => {
  try {
    const eventName = req.body.eventName;
    console.log(req.body)
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Players');
    const players = result.rows;
    res.status(200).json(players); // Send the fetched players data as JSON
    client.release();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching players');
  }
});

app.post('/signup', async (req,res) => {
  try{
    console.log(req.body);
    res.json("req recieved");
  } 
  catch{
    console.log(error)
  }
})

// **Endpoint for Games table (GET all games):**
app.get('/games', (req, res) => {
  pool.query('SELECT * FROM Games', (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows);
  });
});

// **Endpoint for Teams table (GET all teams):**
app.get('/teams', (req, res) => {
  pool.query('SELECT * FROM Teams', (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows);
  });
});

// **Endpoint for Teams_Games table (GET all team-game associations):**
app.get('/teams_games', (req, res) => {
  pool.query('SELECT * FROM Teams_Games', (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows);
  });
});

// **Endpoint for Players_Games table (GET all player-game associations):**
app.get('/players_games', (req, res) => {
  pool.query('SELECT * FROM Players_Games', (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows);
  });
});

// **Endpoint for Players_Device table (GET all player devices):**
app.get('/players_device', (req, res) => {
  pool.query('SELECT * FROM Players_Device', (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows);
  });
});

// **Example endpoint for a Player by ID (GET):**
app.get('/players/:id', (req, res) => {
  const playerId = req.params.id;
  pool.query('SELECT * FROM Players WHERE p_id = $1', [playerId], (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows[0]); // Assuming single player for the given ID
  });
});

// **Example endpoint for Games Played by a Player (GET - requires joining tables):**
app.get('/players/:id/games', (req, res) => {
  const playerId = req.params.id;
  pool.query('SELECT g.g_name FROM Games g JOIN Players_Games pg ON g.game_id = pg.g_id WHERE pg.p_id = $1', [playerId], (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows.map(row => row.g_name)); // Extract game names from the results
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
