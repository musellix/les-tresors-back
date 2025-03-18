import { rm } from "fs/promises";
import { dirname, join } from "path";

global.beforeEach(async () => {
    try {
        console.log(__dirname)

        await rm(join(__dirname, '..', 'test.sqlite'));
    } catch( error ) {}
});