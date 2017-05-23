import { ListingappPage } from './app.po';

describe('listingapp App', () => {
  let page: ListingappPage;

  beforeEach(() => {
    page = new ListingappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
