import { Lab5WebappPage } from './app.po';

describe('lab5-webapp App', function() {
  let page: Lab5WebappPage;

  beforeEach(() => {
    page = new Lab5WebappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
