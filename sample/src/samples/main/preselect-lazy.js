import { inject, LogManager, TaskQueue } from 'aurelia-framework';

@inject(TaskQueue)
export class LazyLoad {
  forceLazyLoad = false;

  constructor(tq) {
    this.log = LogManager.getLogger('preselect-lazy');
    this.taskQueue = tq;
  }

  attached() {
    const { nodes, californiaCities, newYorkCityDistricts } = this.getNodes();
    this.tree.dataSource.load(nodes);

    this.taskQueue.queueTask(() => {
      // californiaCities.forEach(node => {
      //     this.tree.dataSource.selectNode(node);
      // });
      // newYorkCityDistricts.forEach(node => {
      //     this.tree.dataSource.selectNode(node);
      // });

      Promise.all([
        this.tree.dataSource.selectNodes(californiaCities),
        // this.tree.dataSource.selectNodes([nodes[1].children[1], californiaCities[1], newYorkCityDistricts[2], newYorkCityDistricts[3]])
        this.tree.dataSource.selectNodes([californiaCities[1], newYorkCityDistricts[2], newYorkCityDistricts[3]])
      ]).then(() => {
        this.tree.dataSource.selectedNodes.forEach(node => {
          const element = node.payload.title.replace(/ /g, '').replace(/\//g, '');
          this.log.debug('el', element, this[element]);
          this[element].classList.add('found');
        });
      });
    });
  }

  compareNode(a, b) {
    if (typeof a === 'undefined') {
      throw new Error('a is undefined');
    }
    if (typeof b === 'undefined') {
      throw new Error('b is undefined');
    }
    if (a.payload) {
      this.log.warn('a is of type NodeModel', a, b);
    }
    if (b.payload) {
      this.log.warn('b is of type NodeModel', a, b);
    }
    const result = a.title === b.title;
    return result;
  }

  getNodes() {
    const californiaCities = [
      { title: 'Los Angeles' },
      { title: 'San Francisco' }
    ];
    this.log.debug('california children defined', californiaCities);
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
          window.setTimeout(function() {
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
        // children: [
        //   newYorkCity, {
        //     title: 'Buffalo'
        //   }
        // ]
        children: () => {
          return new Promise(resolve => {
            window.setTimeout(function() {
              resolve([newYorkCity, { title: 'Buffalo' }]);
            }, 500);
          });
        }
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
            this.log.debug('california children resolved', californiaCities);
          });
        }
      }
    ];
    newYorkCity.parent = nodes[1];
    californiaCities.forEach(c => c.parent = nodes[3]);
    return { nodes, californiaCities, newYorkCityDistricts };
  }
}
