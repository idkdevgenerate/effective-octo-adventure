const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Add a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Roblox API Server!');
});

// Endpoint to fetch Roblox user avatar
app.get('/avatar/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const response = await fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=150x150&format=Png&isCircular=false`);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            res.json({ avatarUrl: data.data[0].imageUrl });
        } else {
            res.status(404).json({ error: 'Avatar not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch avatar' });
    }
});

// Endpoint to fetch Roblox user profile info
app.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const response = await fetch(`https://users.roblox.com/v1/users/${userId}`);
        const data = await response.json();

        if (data) {
            res.json({
                username: data.name,
                displayName: data.displayName,
                description: data.description,
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user info' });
    }
});

// Endpoint to like a Roblox user avatar
app.post('/like-avatar/:userId', (req, res) => {
    const { userId } = req.params;

    // Simulate storing the like action (e.g., in a database)
    // For now, we'll just return a success message
    res.json({ message: `Avatar for user ${userId} liked successfully!` });
});

// Endpoint to authenticate a user (placeholder for button authentication)
app.post('/authenticate', (req, res) => {
    const { username, password } = req.body;

    // Simulate authentication logic
    if (username === 'testUser' && password === 'testPassword') {
        res.json({ message: 'Authentication successful', token: 'fake-jwt-token' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Endpoint to serve the Roblox Dev Panel
app.get('/dev-panel', (req, res) => {
    res.json({
        message: 'Welcome to the Roblox Dev Panel',
        features: [
            'OAuth API Integration',
            'User Analytics',
            'Game Management Tools',
            'Avatar Customization',
        ],
        logoUrl: 'https://via.placeholder.com/150?text=Roblox+Dev+Logo' // Placeholder logo
    });
});

// Endpoint to simulate OAuth API integration
app.post('/oauth', (req, res) => {
    const { clientId, clientSecret } = req.body;

    // Simulate OAuth token generation
    if (clientId === 'testClientId' && clientSecret === 'testClientSecret') {
        res.json({
            message: 'OAuth token generated successfully',
            token: 'fake-oauth-token',
        });
    } else {
        res.status(401).json({ error: 'Invalid OAuth credentials' });
    }
});

// Endpoint to serve the Cloud for Devs panel
app.get('/cloud-for-devs', (req, res) => {
    res.json({
        message: 'Welcome to the Cloud for Devs Panel',
        features: [
            'Cloud Storage Management',
            'Server Deployment Tools',
            'API Gateway Management',
        ],
        logoUrl: 'https://via.placeholder.com/150?text=Cloud+Dev+Logo' // Placeholder logo
    });
});

// Endpoint to serve the Databases for Devs panel
app.get('/databases-for-devs', (req, res) => {
    res.json({
        message: 'Welcome to the Databases for Devs Panel',
        features: [
            'Database Creation and Management',
            'Query Optimization Tools',
            'Backup and Restore Features',
        ],
        logoUrl: 'https://via.placeholder.com/150?text=Database+Dev+Logo' // Placeholder logo
    });
});

// Endpoint to handle real OAuth integration
app.post('/real-oauth', (req, res) => {
    const { clientId, clientSecret, redirectUri } = req.body;

    // Simulate real OAuth token generation
    if (clientId && clientSecret && redirectUri) {
        res.json({
            message: 'OAuth token generated successfully',
            token: 'real-oauth-token',
            redirectUri,
        });
    } else {
        res.status(400).json({ error: 'Missing required OAuth parameters' });
    }
});

// Simulate Roblox OAuth authorization flow
app.get('/roblox-oauth/authorize', (req, res) => {
    const { clientId, redirectUri, scope, state } = req.query;

    if (!clientId || !redirectUri) {
        return res.status(400).json({ error: 'Missing required parameters: clientId or redirectUri' });
    }

    // Simulate redirecting to Roblox's OAuth authorization page
    const authorizationUrl = `https://roblox.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope || 'read'}&state=${state || ''}&response_type=code`;

    res.json({
        message: 'Redirecting to Roblox OAuth authorization page',
        logo: 'https://via.placeholder.com/150?text=Roblox+OAuth+Logo',
        name: 'Roblox OAuth Authorization',
        description: 'Authorize your application to access Roblox resources on behalf of the user.',
        authorizationUrl
    });
});

// Simulate Roblox OAuth token exchange
app.post('/roblox-oauth/token', (req, res) => {
    const { clientId, clientSecret, code, redirectUri } = req.body;

    if (!clientId || !clientSecret || !code || !redirectUri) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Simulate token generation
    res.json({
        access_token: 'fake-roblox-access-token',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: 'fake-roblox-refresh-token'
    });
});

// Simulate fetching Roblox user info
app.get('/roblox-oauth/userinfo', (req, res) => {
    const { accessToken } = req.query;

    if (!accessToken) {
        return res.status(400).json({ error: 'Missing access token' });
    }

    // Simulate fetching user info
    res.json({
        id: '123456',
        username: 'RobloxUser',
        displayName: 'Roblox User',
        avatarUrl: 'https://via.placeholder.com/150?text=Roblox+Avatar'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});