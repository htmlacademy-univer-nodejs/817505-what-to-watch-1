import chalk from 'chalk';

import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            main.js --<${chalk.blue('command')}> [${chalk.cyan('--arguments')}]
        Команды:
            ${chalk.cyan('--version')}:                   ${chalk.magentaBright('# выводит информации о версии приложения. Версия приложения считывается из файла package.json')}
            ${chalk.cyan('--help')}:                      ${chalk.magentaBright('# выводит список и описание всех поддерживаемых аргументов.')}
            ${chalk.cyan('--import')} <path>:             ${chalk.magentaBright('# импортирует данные из *.tsv-файла')}
        `);
  }
}