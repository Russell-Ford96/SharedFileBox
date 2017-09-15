import { SharedFileBoxPage } from './app.po';

describe('shared-file-box App', () => {
  let page: SharedFileBoxPage;

  beforeEach(() => {
    page = new SharedFileBoxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
