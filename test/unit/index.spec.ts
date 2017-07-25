import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('index', () => {
    it('should work', () => {
        expect(true);
    });
});

describe('tree-view', () => {
  let component: any;

  // beforeEach(() => {
  //   component = StageComponent
  //     .withResources('tree-view')
  //     .inView(`<tree-view></tree-view>`)
  //     .boundTo({});
  // });

  it('should render', () => {
    component = StageComponent
      .withResources('tree-view')
      .inView(`<tree-view view-model.ref="tree"></tree-view>`)
      .boundTo({
        attached: () => {
          this.tree.load([
            { id: 0, title: 'test 1' },
            { id: 1, title: 'test 2' }
          ]);
        }
      });

    component.create(bootstrap).then(() => {
      const treeView = document.querySelector('tree-view');
      
      expect(treeView).not.toBeNull();
      component.dispose();
    });
  });

  // raises "Error: Cannot call ComponentTester.dispose() before ComponentTester.create()"
  // afterEach(() => {
  //   component.dispose();
  // });
});
