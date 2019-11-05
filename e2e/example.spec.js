const {device, expect, element, by} = require('detox');

describe('Example', () => {
  
    beforeEach(async () => {
      await device.reloadReactNative();
    });

    it('should have welcome screen', async () => {
      await expect(element(by.id('welcome'))).toBeVisible();
    });
    it('should show hello screen after tap', async () => {
      await element(by.id('hello_button')).tap();
      await expect(element(by.text('Hello!!!'))).toBeVisible();
      await expect(element(by.text('Hello!!!'))).toHaveText('Hello!!!');
    });
    it('should show world screen after tap', async () => {
      await element(by.id('world_button')).tap();
      await expect(element(by.text('World!!!'))).toBeVisible();
      await expect(element(by.text('World!!!'))).toHaveText('World!!!');
    });
    it('I should be able to replace text', async () => {
      await element(by.id('mytextinput')).typeText('JUAN');
      await element(by.id('mytextinput')).replaceText('ARGENTINA');
      await expect(element(by.text('ARGENTINA'))).toBeVisible();
      await element(by.text('ARGENTINA')).clearText('ARGENTINA');
      await element(by.id('mytextinput')).clearText();
      await element(by.id('mytextinput')).typeText('TEXTO OTRA VEZ CAMBIADO CAMBIADO');
    });
    it('must scrolling, down then up', async () => {
      await element(by.id('scroll')).scroll(100, 'down');
      await element(by.id('scroll')).scroll(100, 'up');
    });
    it('should show modal', async () => {
      await element(by.id('button_modal_id')).tap();//tocuh en boton show modal
      await expect(element(by.id('view_modal_id'))).toBeVisible();//modal es visible
  
    });
    it('hide modal', async () => {
      await element(by.id('button_hide_id')).tap();
    });
});