describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  /*
  Si se trata de una aplicación React Native, vuelva a cargar el paquete React Native JS. Esta acción es mucho 
  más rápida device.launchApp() y se puede usar si solo necesita restablecer su lógica React Native.

  Nota: Esta funcionalidad no funciona sin fallas. Bajo ciertas condiciones, el sistema puede no funcionar 
  como se espera y / o incluso fallar. En estos casos, use device.launchApp()para iniciar la aplicación limpiamente
  en lugar de volver a cargar el paquete JS.
  */
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
    //await expect(element(by.id('mytextinput'))).toBeVisible();
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
    //await expect(element(by.id('welcome'))).toExist();
  });
  
});