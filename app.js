document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.querySelector('.grid');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartModal = document.getElementById('cart-modal');
    const cartIcon = document.getElementById('cart-icon');
    const cartItemCount = document.getElementById('cart-item-count');
    let cartItems = [];
    const menuItems = [
        {
            id: 1,
            name: 'Calabresa',
            price: 25.99,
            image: 'images/pizza--calabresa.png'
          },
          {
            id: 2,
            name: 'Margherita',
            price: 22.99,
            image: 'images/pizza--margherita.png'
          },
          {
            id: 3,
            name: 'Frango com Catupiry',
            price: 27.99,
            image: 'images/pizza--frango.png'
          },
          {
            id: 4,
            name: 'Quatro Queijos',
            price: 29.99,
            image: 'images/pizza--4queijos.webp'
          },
          {
            id: 5,
            name: 'Portuguesa',
            price: 28.99,
            image: 'images/pizza--portuguesa.png'
          },
          {
            id: 6,
            name: 'Bacon com Catupiry',
            price: 29.99,
            image: 'images/pizza--bacon.png'
          },
          // Esfihas
          {
            id: 7,
            name: 'Esfiha de Carne',
            price: 0.99,
            image: 'images/esfiha--carne.png'
          },
          {
            id: 8,
            name: 'Esfiha de Queijo',
            price: 1.99,
            image: 'images/esfiha--queijo.png'
          },
          {
            id: 9,
            name: 'Esfiha de Calabresa',
            price: 1.99,
            image: 'images/esfiha--calabresa.png'
          },
          {
            id: 10,
            name: 'Esfiha de Frango',
            price: 3.99,
            image: 'images/esfiha--frango.png'
          },
          {
            id: 11,
            name: 'Esfiha de Bacon',
            price: 2.99,
            image: 'images/esfiha--bacon.png'
          },
          {
            id: 12,
            name: 'Esfiha de Escarola',
            price: 2.99,
            image: 'images/esfiha--escarola.png'
          },
          {
            id: 13,
            name: 'Coca-Cola 2L',
            price: 9.99,
            image: 'https://gbarbosa.vtexassets.com/arquivos/ids/180734/62979e514667e7da4d656336.png?v=637897004512400000'
          },
          {
            id: 14,
            name: 'Pepsi 2L',
            price: 8.99,
            image: 'https://thepetitpizzaria.com.br/parobe/wp-content/uploads/2021/06/foto_original.png'
          },
          {
            id: 15,
            name: 'Fanta Uva 2L',
            price: 7.99,
            image: 'https://superprix.vteximg.com.br/arquivos/ids/178294-600-600/Refrigerante-Fanta-Uva-2l.png?v=636778001485030000'
          },
          {
            id: 16,
            name: 'Fanta Laranja 2L',
            price: 7.99,
            image: 'https://soaresemcasa.com.br/storage/uploads/EEUzlrrVt35RJFlYkWHVCl5zFWOYvskg2a75EWbM.png'
          },
    ];
  
    const showMenu = () => {
      menuContainer.innerHTML = '';
      menuItems.forEach((item) => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
          <div class="card">
            <img src="${item.image}" alt="Imagem do Produto" width="300px">
            <div class="card-info">
              <h1>${item.name}</h1>
              <h3>R$ ${item.price.toFixed(2)}</h3>
              <button class="add-to-cart" data-id="${item.id}">Adicionar ao Carrinho</button>
            </div>
          </div>
        `;
        menuContainer.appendChild(menuItem);
      });
    };
  
    const addToCart = (id) => {
      const selectedItem = menuItems.find((item) => item.id === id);
  
      if (selectedItem) {
        const existingCartItem = cartItems.find((item) => item.id === id);
        if (existingCartItem) {
          existingCartItem.quantity += 1;
        } else {
          cartItems.push({
            id: selectedItem.id,
            name: selectedItem.name,
            price: selectedItem.price,
            quantity: 1,
          });
        }
        updateCart();
      }
    };
  
   const removeFromCart = (id) => {
  const item = cartItems.find((item) => item.id === id);
  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      const itemIndex = cartItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
      }
    }
    updateCart();
  }
};
  
    const updateCart = () => {
      cartItemsList.innerHTML = '';
      cartItems.forEach((item) => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
          <span>${item.name} (x${item.quantity})</span>
          <br/>
          <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
          <button class="remove-from-cart" data-id="${item.id}">Remover</button>
        `;
        cartItemsList.appendChild(cartItem);
      });
      updateTotal();
      updateCartItemCount();
    };
  
    const updateTotal = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += item.price * item.quantity;
      });
      cartTotal.textContent = total.toFixed(2);
    };
    const updateCartItemCount = () => {
        const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartItemCount.textContent = totalCount;
    };
    const openCartModal = () => {
        cartModal.classList.add('active');
    };

    const closeCartModal = () => {
        cartModal.classList.remove('active');
    };
    cartIcon.addEventListener('click', () => {
        openCartModal();
    });

    cartModal.addEventListener('click', (event) => {
    if (event.target === cartModal) {
      closeCartModal();
    }
  });
  
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('add-to-cart')) {
        const itemId = parseInt(event.target.getAttribute('data-id'));
        addToCart(itemId);
      } else if (event.target.classList.contains('remove-from-cart')) {
        const itemId = parseInt(event.target.getAttribute('data-id'));
        removeFromCart(itemId);
      }
    });
  
    showMenu();
  });