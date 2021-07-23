/*
    importers.ts - Accessing namespace with different methods
*/
// 1. each folder is a namespace(except empty folder)

// Import namespace from selector
export class SelectorImporter {
    constructor(public selector: string[]){

    }
}

// Import namespace from path
export class PathImporter {
    constructor(public path: string){

    }
}

// Import namespace from git repository
export class GitImporter {
    constructor(public repo: string){

    }
}