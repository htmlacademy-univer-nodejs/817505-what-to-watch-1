import got from 'got';
import chalk from 'chalk';
import MovieGenerator from '../common/movie-generator/movie-generator.js';
import TSVFileWriter from '../common/file-writer/tsv-file-writer.js';
import { TMockData } from '../entities/mock-data.type';
import { CliCommandInterface } from './cli-command.interface.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';


export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData?: TMockData;
  private logger: LoggerInterface;

  constructor() {
    this.logger = new ConsoleLoggerService();
  }

  public async execute(...parameters:string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const movieCount = parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return this.logger.info(chalk.red(`Can't fetch data from ${url}.`));
    }

    const movieGeneratorString = new MovieGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < movieCount; i++) {
      await tsvFileWriter.write(movieGeneratorString.generate());
    }

    this.logger.info(chalk.blueBright(`File ${filepath} was created!`));
  }
}
