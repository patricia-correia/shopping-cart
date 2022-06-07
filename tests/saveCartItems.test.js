const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems',async () => {
  const data = await saveCartItems('Item');
  expect(fetch).toHaveBeenCalledWith(localStorage.setItem);
});
