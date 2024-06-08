'use server';

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');

// Middleware для проверки JWT
const checkJwt = jwt({
	secret: 'YOUR_AUTH0_SECRET',
	audience: 'YOUR_API_IDENTIFIER',
	issuer: 'https://YOUR_DOMAIN/',
	algorithms: ['RS256'],
});

// Middleware для проверки разрешений
const checkPermissions = jwtAuthz(['read:messages'], {
	customScopeKey: 'permissions',
});

// app.get('/messages', checkJwt, checkPermissions, function (req: any, res: any) {
// 	res.send('This is the protected messages route.');
// });
