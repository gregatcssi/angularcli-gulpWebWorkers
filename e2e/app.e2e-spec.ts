import { AngularcliGulpPage } from './app.po';

describe('angularcli-gulp App', function() {
  let page: AngularcliGulpPage;

  beforeEach(() => {
    page = new AngularcliGulpPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
