import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { ConfigInterface } from './config.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { configSchema, ConfigSchema } from './config.schema.js';
import { Component } from '../../entities/component.type.js';

@injectable()
export default class ConfigService implements ConfigInterface {
  private readonly config: ConfigSchema;

  constructor(@inject(Component.LoggerInterface) private logger: LoggerInterface) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Cannot read .env file.');
    }

    configSchema.load({});
    configSchema.validate({allowed: 'strict', output: this.logger.info});

    this.config = configSchema.getProperties();

    this.logger.info('.env file successfully parsed.');
  }

  get<T extends keyof ConfigSchema>(key: T): ConfigSchema[T] {
    return this.config[key];
  }
}
