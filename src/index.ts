import program from 'commander';
import {getNpmProjectDirectory} from './lib/directory-management'
import RennetManaged from './lib/rennet';

program.version('0.1.0')
    .command('create-component <component-name>')
    .option('-X, --jsx', 'Generate a JSX component')
    .option('-s, --skip-types', 'Skip generating a types files')
    .action((componentName, options) => {
        console.log("Creating new component with name " + componentName);
        console.log(options.jsx);
        console.log(options.skipTypes);
    })

program
    .command('init')
    .action(() => {
        let packageRoot = getNpmProjectDirectory();
        RennetManaged.initAndLoadRennet(packageRoot);

        console.log(`Initialized rennet in '${packageRoot}'`);
    });

program.parse(process.argv);
