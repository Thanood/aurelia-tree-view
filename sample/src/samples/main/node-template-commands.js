import { inject } from 'aurelia-framework';
import { NodeModel } from 'aurelia-tree-view';

const stockCommands = [
    { title: 'edit' },
    { title: 'delete' },
    { title: 'export' },
    { title: 'lock' }
];

export class NodeTemplateCommands {
    commands = [];
    nodes = [];

    nodeInterface = {
        commands: [],
        executeCommand: this.executeCommand.bind(this)
    }

    executeCommand(cmd, model) {
        this.logger.log(`command execute: ${cmd.title} ${model.payload.title}`);
    }

    constructor() {
        // these are initializeed later to simulate fetching commands frm a service
        this.nodeInterface.commands = this.commands;
    }

    attached() {
        // simulate fetching commands from a service
        window.setTimeout(() => {
            this.nodeInterface.commands = stockCommands;
        }, 500);

        this.tree.dataSource.load(this.getNodes());
    }

    getNodes() {
        return [
            {
                title: 'Texas',
                children: [
                    { title: 'Austin' },
                    { title: 'Houston' }
                ]
            }, {
                title: 'New York',
                children: [
                    {
                        title: 'New York City',
                        children: [
                            { title: 'Manhattan' },
                            { title: 'Brooklyn' },
                            { title: 'Bronx' },
                            { title: 'Queens' },
                            { title: 'Staten Island' }
                        ]
                    }, {
                        title: 'Buffalo'
                    }
                ]
            }, {
                title: 'Oregon',
                children: [
                    { title: 'Portland' }
                ]
            }, {
                title: 'California',
                children: [
                    { title: 'Los Angeles' },
                    { title: 'San Francisco' }
                ]
            }
        ];
    }
}
