export class Index {

  constructor() { }

  configureRouter(config, router) {
    config.title = 'Samples';

    config.map([
      { name: 'main', route: 'main', moduleId: './main/index', title: 'main' },
      { name: 'default', route: '', redirect: 'main' }
    ]);
    this.router = router;
  }
}
