import 'dotenv/config';
import * as joi from 'joi';

interface EnvironmentVars {
  PORT: number;
  STRIPE_SECRET: string;
  STRIPE_SUCCESS_URL: string;
  STRIPE_CANCEL_URL: string;
  STRIPE_ENDPOINTSECRET: string;
  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    STRIPE_SECRET: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().required(),
    STRIPE_CANCEL_URL: joi.string().required(),
    STRIPE_ENDPOINTSECRET: joi.string().required(),

    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});
if (error) {
  throw new Error(`Config valudation error: ${error.message}`);
}

const environmentsVariables: EnvironmentVars = value;

export const envs = {
  port: environmentsVariables.PORT,
  stripeSecret: environmentsVariables.STRIPE_SECRET,
  stripeSuccessUrl: environmentsVariables.STRIPE_SUCCESS_URL,
  stripeCancelUrl: environmentsVariables.STRIPE_CANCEL_URL,
  stripeEndPointSecret: environmentsVariables.STRIPE_ENDPOINTSECRET,
  natsServer: environmentsVariables.NATS_SERVERS,
};
