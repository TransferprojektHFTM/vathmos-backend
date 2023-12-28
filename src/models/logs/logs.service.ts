import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import { ensureDirSync, pathExistsSync, readdir } from 'fs-extra';
import * as path from 'path';

@Injectable()
export class LogsService {
    private readonly rootDirectory: string = 'logs';
    readLogs(date: string = new Date().toISOString().slice(0, 10)) {
        const logFilePath = path.join(this.rootDirectory, 'vathmos-' + date + '.log')
        const exists = pathExistsSync(logFilePath);
        if (!exists) {
            throw new Error(`File not found: ${logFilePath}`);
        }
        return fs.readFileSync(logFilePath, 'utf8');
    }

    readErrorLog() {
        const errorLogPath = path.join(this.rootDirectory, 'error.log')
        const exists = pathExistsSync(errorLogPath);
        if (!exists) {
            throw new Error(`File not found: ${errorLogPath}`);
        }
        return fs.readFileSync(errorLogPath, 'utf8');
    }
}
