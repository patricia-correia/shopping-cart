const ol = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

 const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove(); 
  saveCartItems(ol.innerHTML);
// --funciona mas não passa no cypress -- 

/* const li = document.querySelector('.cart__item');
  event.target(li.parentNode.removeChild(li)); */
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const renderItem = async (idItem) => {
  const result = await fetchItem(idItem); 
  const param = { 
    sku: result.id, 
    name: result.title, 
    salePrice: result.price, 
  }; 
    const itemCart = document.querySelector('.cart__items');
    const creation = createCartItemElement(param);
    itemCart.appendChild(creation);
    saveCartItems(itemCart.innerHTML);
}; 

const createCustomElement = (element, className, innerText, sku) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', () => renderItem(sku));
  }
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', sku));
  return section;
};

const renderProducts = async () => {
  const productsSection = document.querySelector('.items');
    try {
      const products = await fetchProducts('computador');
      products.forEach((product) => {
      const productCard = createProductItemElement(
        { 
          sku: product.id,
          name: product.title, 
          image: product.thumbnail, 
        },
      );
    productsSection.appendChild(productCard);  
  });
  } catch (error) {
    productsSection.innerHTML = `<h1>${error}</h1>`;
  }
};

const saveLocalStorage = () => {
  const saveItemInLocal = ol;
  saveItemInLocal.innerHTML = getSavedCartItems();
  saveItemInLocal.addEventListener('click', cartItemClickListener);
};

const clearCart = () => {
  const bttClear = document.querySelector('.empty-cart');
  bttClear.addEventListener('click', () => {
  ol.innerHTML = '';
  localStorage.setItem('cartItems', '');
  });
};

window.onload = () => {
  renderProducts();
  saveLocalStorage();
  clearCart();
};
