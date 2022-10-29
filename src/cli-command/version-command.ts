import chalk from 'chalk';
import { readFileSync } from 'fs';
import { CliCommandInterface } from './cli-command.interface.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';

export default class VersionCommand implements CliCommandInterface {
  public readonly name = '--version';
  private logger: LoggerInterface;

  constructor() {
    this.logger = new ConsoleLoggerService();
  }

  private readVersion(): string {
    const contentPageJSON = readFileSync('./package.json', 'utf-8');
    const content = JSON.parse(contentPageJSON);
    return content.version;
  }

  public async execute(): Promise<void> {
    const version = this.readVersion();
    this.logger.info(chalk.magenta(version));
  }
}
