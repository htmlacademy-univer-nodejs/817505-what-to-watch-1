import chalk from 'chalk';

import { CliCommandInterface } from './cli-command.interface.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';
  private logger: LoggerInterface;

  constructor() {
    this.logger = new ConsoleLoggerService();
  }

  public async execute(): Promise<void> {
    this.logger.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            main.js --<${chalk.blue('command')}> [${chalk.cyan('--arguments')}]
        Команды:
            ${chalk.cyan('--version')}:                   ${chalk.magentaBright('# выводит информации о версии приложения. Версия приложения считывается из файла package.json')}
            ${chalk.cyan('--help')}:                      ${chalk.magentaBright('# выводит список и описание всех поддерживаемых аргументов.')}
            ${chalk.cyan('--import')} <path>:             ${chalk.magentaBright('# импортирует данные из *.tsv-файла')}
            ${chalk.cyan('--generate')} <n> <path> <url>: ${chalk.magentaBright('# генерирует тестовые данные')}
        `);
  }
}
