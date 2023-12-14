require('dotenv').config();

export const config = {
  shipit_endpoint: 'https://api.shipit.cl',
  shipit_headers: {
    'X-Shipit-Email': String(process.env.SHIPIT_EMAIL),
    'X-Shipit-Access-Token': String(process.env.SHIPIT_TOKEN),
    Accept: 'application/vnd.shipit.v4',
  },
};
