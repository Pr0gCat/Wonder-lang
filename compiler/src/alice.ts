#!/usr/bin/env node
/*
    alice.ts
    Entry point of the compiler.
*/
import { Command } from "commander";
import { exit } from 'process';

const arg_parser = new Command();
arg_parser.option('-v, --verbose', 'Make compiler chatty', false)

arg_parser.command('init [name]')
    .description('Create new project')
    .action((name) => {
        // Check naming
        // Create build.json
        console.log(name);
        exit(0);
    });

arg_parser.command('build [path]')
    .description('Build project')
    .action(() => {
        // Search for build.json
    });