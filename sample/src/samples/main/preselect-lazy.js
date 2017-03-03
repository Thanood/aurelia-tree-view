import { inject, TaskQueue } from 'aurelia-framework';

@inject(TaskQueue)
export class LazyLoad {
    forceLazyLoad = false;

    constructor(tq) {
        this.taskQueue = tq;
    }

    attached() {
        const {nodes, californiaCities, newYorkCityDistricts} = this.getNodes();
        this.tree.dataSource.load(nodes);

        this.taskQueue.queueTask(() => {
            // californiaCities.forEach(node => {
            //     this.tree.dataSource.selectNode(node);
            // });
            // newYorkCityDistricts.forEach(node => {
            //     this.tree.dataSource.selectNode(node);
            // });
            // this.tree.dataSource.selectNode(californiaCities[0]).then(() => {
            //     this.tree.dataSource.selectNode(californiaCities[1]).then(() => {
            //         this.tree.dataSource.selectNode(newYorkCityDistricts[2]);
            //     });
            // });
            this.tree.dataSource.selectNodes(californiaCities);
        });
    }

    compareNode(a, b) {
        return a.title === b.title;
    }

    getNodes() {
        const californiaCities = [
            { title: 'Los Angeles' },
            { title: 'San Francisco' }
        ];
        const newYorkCityDistricts = [
            { title: 'Manhattan' },
            { title: 'Brooklyn' },
            { title: 'Bronx' },
            { title: 'Queens' },
            { title: 'Staten Island' }
        ];
        const newYorkCity = {
            title: 'New York City',
            children: () => {
                return new Promise((resolve, reject) => {
                    window.setTimeout(function () {
                        resolve(newYorkCityDistricts);
                    }, 500);
                });
            }
        };
        newYorkCityDistricts.forEach(d => d.parent = newYorkCity);
        const nodes = [
            {
                title: 'Texas',
                children: [
                    { title: 'Austin' },
                    { title: 'Houston' }
                ]
            }, {
                title: 'New York',
                children: [
                    newYorkCity, {
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
                children: () => {
                    return new Promise((resolve, reject) => {
                        resolve(californiaCities);
                    });
                }
            }
        ];
        newYorkCity.parent = nodes[1];
        californiaCities.forEach(c => c.parent = nodes[3]);
        return { nodes, californiaCities, newYorkCityDistricts };
    }
}
