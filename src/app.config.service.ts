import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import tempfile from 'tempfile';

@Injectable()
export class AppConfigService extends ConfigService {
    constructor() {
        super(process.env);
    }
    
    get(key: string) {
        switch (key) {
            case 'SESSION_FILE_DIR':
                return tempfile();
            case 'CACHE_TYPE':
                return 'null';
            default:
                return super.get(key);
        }
    }
}
