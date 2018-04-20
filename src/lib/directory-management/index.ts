import path from 'path';
import fs   from 'fs';
import os   from 'os';

export function getNpmProjectDirectory(): string {
    let currentDirectory = process.cwd();
    const root = (os.platform() == "win32") ? process.cwd().split(path.sep)[0] : "/"
    let firstNpmPackageDirectory : string | null = null;

    while (currentDirectory !== root && (firstNpmPackageDirectory === null)) {
        console.log("Looking in `" + currentDirectory + "`")
        if (fs.existsSync(path.join(currentDirectory, 'package.json'))) {
            firstNpmPackageDirectory = currentDirectory;
        }

        currentDirectory = path.join(currentDirectory, "./..");
    }

    if (firstNpmPackageDirectory === null) {
        throw new Error('Could not find an npm package anywhere in the directory tree');
    }

    return firstNpmPackageDirectory;
}
