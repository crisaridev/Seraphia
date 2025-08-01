

import { getOrderById } from "../api.js";



      const orderId = getOrderIdFromUrl();

      const order = await getOrderById(orderId);
    console.log(order)


      document.addEventListener('DOMContentLoaded', function() {

      if (order) {
        renderOrderDetails(order);
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
            <img src="${order.img}" alt="preview del producto" width="50px" class="">
            ${order.name}
          </th>
          <td class="text-center py-4">$${order.netSalesValue}</td>
        </tr>
        <tr>
          <th scope="row" class="py-4 fw-medium fs-3">Total</th>
          <td class="text-center py-4">$${order.netSalesValue}</td>
        </tr>
        <tr>
          <th scope="row" class="py-4 fw-medium fs-3">Num. de pedido</th>
          <td class="text-center py-4">${order.orderNumber}</td>
        </tr>
        <tr>
          <th scope="row" class="py-4 fw-medium fs-3">Fecha de la venta</th>
          <td class="text-center py-4">${order.orderDate}</td>
        </tr>
        <tr>
          <th scope="row" class="py-4 fw-medium fs-3">Estado del pedido</th>
          <td class="text-center py-4">${order.orderStatus}</td>
        </tr>
      `;
      document.getElementById('order-products-tbody').innerHTML = productsHtml;

      let shippingHtml = '';
      shippingHtml += `
        <tr>
          <th scope="row" class="py-4">Nombre</th>
          <td class="text-center py-4">${order.customerName}</td>
        </tr>
        <tr>
          <th scope="row" class="py-4">Email</th>
          <td class="text-center py-4">${order.email}</td>
        </tr>
        <tr>
          <th scope="row" class="py-4">Teléfono</th>
          <td class="text-center py-4">${order.phoneNumber}</td>
        </tr>
        <tr>
          <th scope="row" class="py-4">Direccion</th>
          <td class="text-center py-4">${order.street}, ${order.numInt} ${order.numExt}, ${order.suburb} </td>
        </tr>
        <tr>
          <th scope="row" class="py-4">Codigo postal</th>
          <td class="text-center py-4">${order.zipCode}</td>
        </tr>
        <tr>
          <th scope="row" class="py-4">Ciudad y estado</th>
          <td class="text-center py-4">${order.city}, ${order.state} </td>
        </tr>
      `;
      document.getElementById('order-shipping-tbody').innerHTML = shippingHtml;
    }


    