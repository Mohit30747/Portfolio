const http = require('http');

const data = JSON.stringify({
  name: 'Test',
  email: 'test@example.com',
  phone: '1234567890',
  address: 'Test Address',
  message: 'Hello World'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, res => {
  console.log('STATUS:', res.statusCode);
  res.setEncoding('utf8');
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('RESPONSE:', body);
    process.exit(0);
  });
});

req.on('error', e => {
  console.error('ERROR:', e.message);
  process.exit(1);
});

req.write(data);
req.end();
