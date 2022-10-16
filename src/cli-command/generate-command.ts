import got from 'got';
import chalk from 'chalk';
import MovieGenerator from '../common/movie-generator/movie-generator.js';
import TSVFileWriter from '../common/file-writer/tsv-file-writer.js';
import { TMockData } from '../entities/mock-data.type';
import { CliCommandInterface } from './cli-command.interface.js';


export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: TMockData;

  public async execute(...parameters:string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(chalk.red(`Can't fetch data from ${url}.`));
    }

    const offerGeneratorString = new MovieGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(offerGeneratorString.generate());
    }

    console.log(chalk.blueBright(`File ${filepath} was created!`));
  }
}
