import { VoiceUiPage } from './app.po';

describe('voice-ui App', () => {
  let page: VoiceUiPage;

  beforeEach(() => {
    page = new VoiceUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
