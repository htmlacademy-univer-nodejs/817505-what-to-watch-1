import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import { Component } from '../entities/component.type.js';
import { DatabaseInterface } from '../common/db-client/db.interface';
import { getDbURI } from '../utils/db.js';

@injectable()
export default class Application {
  constructor(@inject(Component.LoggerInterface) private logger: LoggerInterface,
              @inject(Component.ConfigInterface) private config: ConfigInterface,
              @inject(Component.DatabaseInterface) private dbClient: DatabaseInterface) {}


  async init() {
    this.logger.info(`Application initialized. Get value from $PORT: ${this.config.get('PORT')}.`);

    const uri = getDbURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );
    console.log(uri);
    await this.dbClient.connect(uri);
  }
}
