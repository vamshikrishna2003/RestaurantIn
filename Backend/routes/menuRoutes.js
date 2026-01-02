const express = require('express');
const router = express.Router();

// Placeholder routes for menu
router.get('/', (req, res) => {
    res.json({ message: 'Menu routes' });
});

module.exports = router;
