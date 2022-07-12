
import { Loggly } from 'winston-loggly-bulk';
import { SlackWebHook } from 'winston-slack-webhook';
import * as dotenv from 'dotenv';
dotenv.config();

const logglySubdomain = process.env.LOGGLY_SUBDOMAIN;
const logglyToken = process.env.LOGGLY_TOKEN;

const getLogglyTransport = () => {
  return new Loggly({
    subdomain: logglySubdomain,
    token: logglyToken,
    tags: ['glee2-backend'],
    level: process.env.LOGGLY_LEVEL || 'info',
    json: true,
    isBulk: true,
  });
};

const getSlackTransport = () => {
  const webhookUrl = process.env.SLACK_LOGGER_WEBHOOK;
  if (!webhookUrl) return;
  const channel = process.env.SLACK_LOGGER_CHANNEL;
  const username = process.env.SLACK_LOGGER_USERNAME;
  const iconUrl = process.env.SLACK_LOGGER_ICON_URL;

  return new SlackWebHook({
    level: 'error',
    webhookUrl,
    channel,
    username: username || 'Logger',
    iconUrl:
      iconUrl ||
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Emblem-important-red.svg/500px-Emblem-important-red.svg.png',
  });
};

