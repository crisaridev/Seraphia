

import { getOrderById } from "../api.js";


             const orderId = getOrderIdFromUrl();

      const order = await getOrderById(orderId);
            const orderProducts = order.products
      const orderImges = orderProducts[0].imagesList
    const orderImg = orderImges[0].imageUrl
     const orderProductName  = orderProducts[0].name
      const orderUser = order.user
        renderOrderDetails(order);
      console.log(orderProductName)


      document.addEventListener('DOMContentLoaded', function() {

      if (order) {


      } else {
        document.getElementById('order-products-tbody').innerHTML = '<tr><td>Pedido no encontrado</td></tr>';
      }
    });

    
    function getOrderIdFromUrl() {
      const params = new URLSearchParams(window.location.search);
      return params.get('id');
    }

    // async function getOrderById(orderId) {
    //   const orders = await getOrdersAdmin();
    //   let hola = orders.find(order => order.id === orderId);
    //   console.log(hola)
      
    // }

    function renderOrderDetails(order) {

      let productsHtml = '';
      productsHtml += `
        <tr>
          <th scope="row" class="py-4 fw-bold text-decoration-underline">
            <img src="${orderImg}" alt="preview del producto" width="50px" class="">
            ${orderProductName}
          </th>
          <td class="text-center py-4">$${order.netSale}</td>
        </tr>
        <tr>
          <th scope="row" class="py-4 fw-medium fs-3">Total</th>
          <td class="text-center py-4">$${order.netSale}</td>
        </tr>
        <tr>
          <th scope="row" class="py-4 fw-medium fs-3">Num. de pedido</th>
          <td class="text-center py-4">${order.idOrder}</td>
        </tr>
        <tr>
          <th scope="row" class="py-4 fw-medium fs-3">Fecha de la venta</th>
          <td class="text-center py-4">${order.orderDate}</td>
        </tr>
        <tr>
          <th scope="row" class="py-4 fw-medium fs-3">Estado del pedido</th>
          <td class="text-center py-4">${order.status}</td>
        </tr>
      `;
      document.getElementById('order-products-tbody').innerHTML = productsHtml;

      let shippingHtml = '';
      shippingHtml += `
        <tr>
          <th scope="row" class="py-4">Nombre</th>
          <td class="text-center py-4">${orderUser.firstName} ${orderUser.lastName}</td>
        </tr>
        <tr>
          <th scope="row" class="py-4">Email</th>
          <td class="text-center py-4">${orderUser.email}</td>
        </tr>
        <tr>
          <th scope="row" class="py-4">Teléfono</th>
          <td class="text-center py-4">${orderUser.phone}</td>
        </tr>
        <tr>
          <th scope="row" class="py-4">Direccion</th>
          <td class="text-center py-4">${orderUser.street}, ${orderUser.numInt} ${orderUser.numExt}, ${order.suburb} </td>
        </tr>
        <tr>
          <th scope="row" class="py-4">Codigo postal</th>
          <td class="text-center py-4">${orderUser.zipCode || ""}</td>
        </tr>
        <tr>
          <th scope="row" class="py-4">Ciudad y estado</th>
          <td class="text-center py-4">${orderUser.city}, ${orderUser.state} </td>
        </tr>
      `;
      document.getElementById('order-shipping-tbody').innerHTML = shippingHtml;
    }


    