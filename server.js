const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const visitCountFile = path.join(__dirname, 'visitCount.json');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/visit-count', (req, res) => {
    fs.readFile(visitCountFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read visit count' });
        }
        let visitCount = JSON.parse(data).count;
        visitCount++;
        fs.writeFile(visitCountFile, JSON.stringify({ count: visitCount }), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update visit count' });
            }
            res.json({ count: visitCount });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Initialize visit count file if it doesn't exist
if (!fs.existsSync(visitCountFile)) {
    const initialVisitCount = { count: 0 };
    fs.writeFileSync(visitCountFile, JSON.stringify(initialVisitCount));
}