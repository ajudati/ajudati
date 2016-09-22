import { HellocliPage } from './app.po';

describe('hellocli App', function() {
  let page: HellocliPage;

  beforeEach(() => {
    page = new HellocliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
