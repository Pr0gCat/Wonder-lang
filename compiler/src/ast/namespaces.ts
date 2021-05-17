/*
    namespaces.ts - Definations of namespaces.
*/
import {extname, basename} from "path";

export class Namespace {
	constructor(){

	}
}

// Representing a source code file, maintain an AST.
export class File {
	/**
	 * @property name Identifier between namespaces
	 */
	name: string;
	/**
	 * @param path File path
	 * @param lines Lines of code
	 * @param imports File dependences
	 * @param tree Abstract syntax tree of the file.
	 * @param comments Comments collected
	 */
	constructor(
		public path: string,
		public lines: string[],
		public imports: object[],
		public tree: object[],
		public comments: object[]
	) {
		let extension = extname(path);
        this.name = extension.length > 0 ? basename(path, extension) : basename(path);
		this.name = this.name.replace('.', '_');
	}
}

// Root of a project, contains File objects.
// One Package for each project.
export class Package {
	// The first namespace must be root namespace.
	private symbol_table: {} = {'@': new Namespace()};
	private files: File[] = [];

	/**
	 * @param name Package name
	 */
	constructor(name: string) {

	}

	/**
	 * Append File into this Package.
	 * @param file File object to append.
	 */
	addFile(file: File) {
		// append namespace
		// append file
	}

	/**
	 * Append external reference into this Package
	 */
	addExternalRef(){

	}
}