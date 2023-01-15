import mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../entities/component.type.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { DatabaseInterface } from './db.interface.js';

@injectable()
export default class DatabaseService implements DatabaseInterface {
  constructor(@inject(Component.LoggerInterface) private logger: LoggerInterface) {}

  async connect(uri: string): Promise<void> {
    this.logger.info('Connecting to MongoDB.');
    await mongoose.connect(uri);
    this.logger.info('Database connection established.');
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.logger.info('Database connection closed.');
  }
}
