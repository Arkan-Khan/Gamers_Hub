const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Database connection details (replace with your actual credentials)
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Gamers_Hub',
  password: 'root',
  port: 5432
});

client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(error => console.error('Error connecting to the database:', error));

  app.post('/signup', async (req, res) => {
    try {
      console.log(req.body);
      const query = `
      INSERT into PLAYERS (
        p_name, age, email, password
      )
      VALUES (
        $1, $2, $3, $4
      );
  `
      const values = [req.body.name, req.body.age, req.body.email, req.body.password];
      const result = await client.query(query, values);
      console.log('User created successfully', result)
      res.json({message: true});
    }
    catch(error) {
      console.log(error)
    }
  })
  
  app.post('/login', async (req,res) => {
    try{
      console.log(req.body);
      const { email, password } = req.body;
      const query = 'SELECT * FROM players WHERE email = $1 AND password = $2';
      const result = await client.query(query, [email, password]);
      if (result.rows.length === 1) {
        res.json({ message: true, user: result.rows[0] });
      } else {
        // No user found with provided credentials
        res.json({ message: false });
      }
    } catch(error) {
      console.log(error)
    }
  })









  

// Route to get all players (replace 'Players' with your table name if different)
app.get('/players', async (req, res) => {
  try {
    await client.connect();
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
