import fs  from 'fs';
import path from 'path';

export default class RennetManaged {
    private constructor(
        private rennetConfig: any,
        private rennetConfigFileLocation: string | null = null
    ) {
        console.log('Loaded rennet instance with config ' + JSON.stringify(rennetConfig));
    }

    closeSession() {
        if (this.rennetConfigFileLocation !== null) {
            fs.writeFileSync(this.rennetConfigFileLocation, JSON.stringify(this.rennetConfig))
        }
    }

    static loadRennet(rennetConfigPath: string) : RennetManaged {
        const configFileLocation = RennetManaged.rennetConfigAt(rennetConfigPath);

        if (fs.existsSync(RennetManaged.rennetConfigAt(rennetConfigPath))) {
            return new RennetManaged(
                JSON.parse(fs.readFileSync(configFileLocation, {encoding: 'utf8'})),
                configFileLocation
            );
        }

        throw new Error(`No file found at ${rennetConfigPath}`);
    }

    static initAndLoadRennet(rennetConfigPath: string) : RennetManaged {
        if (fs.existsSync(RennetManaged.rennetConfigAt(rennetConfigPath))) {
            throw new Error('A rennet configuration already exists. Not overwriting.')
        }

        RennetManaged.initRennet(rennetConfigPath);
        return this.loadRennet(rennetConfigPath);
    }

    private static rennetConfigAt(rennetConfigPath: string): string {
        return path.join(rennetConfigPath, '.rennet.json');
    }

    private static initRennet(rennetConfigPath: string) {
        fs.writeFileSync(RennetManaged.rennetConfigAt(rennetConfigPath), '{}', {encoding: 'utf8'});
    }
}
