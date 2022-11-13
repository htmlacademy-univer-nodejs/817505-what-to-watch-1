import chalk from 'chalk';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import { createMovie, getErrorMessage } from '../utils/common.js';
import { getDbURI } from '../utils/db.js';

import { LoggerInterface } from '../common/logger/logger.interface';
import { UserServiceInterface } from '../modules/user/user.service.interface';
import { MovieServiceInterface } from '../modules/movie/movie.service.interface';
import { DatabaseInterface } from '../common/db-client/db.interface';
import MovieService from '../modules/movie/movie.service.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import UserService from '../modules/user/user.service.js';
import DatabaseService from '../common/db-client/db.service.js';

import { UserModel } from '../modules/user/user.entity.js';
import { MovieModel } from '../modules/movie/movie.entity.js';
import { TMovie } from '../entities/movie.type.js';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private movieService!: MovieServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.movieService = new MovieService(this.logger, MovieModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveMovie(movie: TMovie) {
    const user = await this.userService.findOrCreate({
      ...movie.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.movieService.create({
      ...movie,
      user: user.id,
    });
  }


  private async onLine(line: string, resolve: () => void) {
    const movie = createMovie(line);
    await this.saveMovie(movie);
    resolve();
  }

  private onComplete(count: number) {
    this.logger.info(`${chalk.greenBright(count)} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string
  ): Promise<void> {
    const uri = getDbURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      this.logger.info(`Can't read the file: ${chalk.red(getErrorMessage(err))}`);
    }
  }
}
