import fs from 'node:fs';
import { patches } from './data/patches';


for (const patch of patches) {
    for (const file of patch.files) {
        const fileReplacementPath =  `patches/${patch.identifier}/${file.path}`;
        const fileDestinationPath = file.modulePath;
        fs.copyFileSync(fileReplacementPath, fileDestinationPath);
    }
    console.log(`Patch ${patch.identifier} applied: \n\n${patch.description}\n\n`);
}

console.log('All patches applied');