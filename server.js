const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// View counts file
const COUNTS_FILE = 'viewCounts.json';

// Initialize counts file if it doesn't exist
function initializeCountsFile() {
  if (!fs.existsSync(COUNTS_FILE)) {
    const initialCounts = {
      'O-Gece': 0,
      'Sezgi': 0,
      'Ters-Dogum': 0,
      'Sonsuzlugun-Fisiltilari': 0
    };
    fs.writeFileSync(COUNTS_FILE, JSON.stringify(initialCounts, null, 2));
  }
}

// Get view counts
app.get('/api/viewCounts', (req, res) => {
  try {
    initializeCountsFile();
    const counts = JSON.parse(fs.readFileSync(COUNTS_FILE, 'utf8'));
    res.json(counts);
  } catch (error) {
    console.error('Error reading view counts:', error);
    res.status(500).json({ error: 'Failed to read view counts' });
  }
});

// Increment view count
app.post('/api/incrementView', (req, res) => {
  try {
    const { storyName } = req.body;
    
    if (!storyName) {
      return res.status(400).json({ error: 'Story name is required' });
    }

    initializeCountsFile();
    const counts = JSON.parse(fs.readFileSync(COUNTS_FILE, 'utf8'));
    
    if (counts.hasOwnProperty(storyName)) {
      counts[storyName]++;
      fs.writeFileSync(COUNTS_FILE, JSON.stringify(counts, null, 2));
      res.json({ success: true, newCount: counts[storyName] });
    } else {
      res.status(404).json({ error: 'Story not found' });
    }
  } catch (error) {
    console.error('Error incrementing view count:', error);
    res.status(500).json({ error: 'Failed to increment view count' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('View counter API is ready!');
}); 