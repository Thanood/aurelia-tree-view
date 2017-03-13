export class CustomCompare {
  attached() {
    this.tree.dataSource.load(this.getNodes());
    this.tree.dataSource.selectNodes([
      { id: 2 }, { id: 21, parent: { id: 2 } }, { id: 22, parent: { id: 2 } },
      { id: 211, parent: { id: 21, parent: { id: 2 } } },
      { id: 212, parent: { id: 21, parent: { id: 2 } } },
      { id: 213, parent: { id: 21, parent: { id: 2 } } },
      { id: 214, parent: { id: 21, parent: { id: 2 } } },
      { id: 215, parent: { id: 21, parent: { id: 2 } } }
    ]);
  }

  compareNode(a, b) {
    return a.id === b.id;
  }

  getNodes() {
    return [
      {
        id: 1,
        title: 'Texas',
        children: [
          { id: 11, title: 'Austin' },
          { id: 12, title: 'Houston' }
        ]
      }, {
        id: 2,
        title: 'New York',
        children: () => {
          return new Promise(resolve => {
            window.setTimeout(function() {
              resolve([
                {
                  id: 21,
                  title: 'New York City',
                  children: () => {
                    return new Promise(res => {
                      window.setTimeout(function() {
                        res([
                          { id: 211, title: 'Manhattan' },
                          { id: 212, title: 'Brooklyn' },
                          { id: 213, title: 'Bronx' },
                          { id: 214, title: 'Queens' },
                          { id: 215, title: 'Staten Island' }
                        ]);
                      }, 500);
                    });
                  }
                }, {
                  id: 22,
                  title: 'Buffalo'
                }
              ]);
            }, 500);
          });
        }
      }, {
        id: 3,
        title: 'Oregon',
        children: [
          { id: 31, title: 'Portland' }
        ]
      }, {
        id: 4,
        title: 'California',
        children: () => {
          return new Promise((resolve, reject) => {
            resolve([
              { id: 41, title: 'Los Angeles' },
              { id: 42, title: 'San Francisco' }
            ]);
          });
        }
      }
    ];
  }
}
