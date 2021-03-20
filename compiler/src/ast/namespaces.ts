/*
    namespaces.ts - Definations of namespaces.
*/
import { ASTNode } from "./nodes/ast_node";

export class Namespace {
	constructor(){

	}
}

// Representing a source code file, maintain an AST.
export class File {
	/**
	 * @param name File name without extension and path.
	 * (for example "./abc/def.alice", the namespace will be "def")
	 * @param rel_path File path related to project's root.
	 * @param lines Total lines in the file.
	 * @param policy Imports and Exports record.
	 * @param ast Abstract syntax tree of the file.
	 */
	constructor(
		public name: string,
		public rel_path: string,
		public lines: number,
		public policy: [],
		public ast: ASTNode[]
	) {

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