import { Config } from "./config";
import * as nconf from "nconf";
import * as fs from "fs";

export class ConfigManager {
  private configuration: Config;

  constructor() {
    this.init();
  }

  public get config(): Config {
    return this.configuration;
  }

  private init() {
    nconf.use("memory");

    if (!nconf.get("info")) {
      this.getFile();
    }
    this.configuration = nconf.get();
    nconf.required(["port"]);
  }

  private getFile(): void {
    const filename = `${process.env.NODE_ENV}.json`;
    console.log(filename);

    if (!fs.existsSync(`env/${filename}`)) {
      console.error(`Config File Doesnot Exist ${filename}`);
      process.exit(1);
    }

    console.log(filename);
    nconf.file({
      file: filename,
      dir: "env",
      search: true,
      type: "json",
    });
  }
}
