// Items
  // class orderController {
  // constructor(currentId = 0) {
  //   this.items = [];
  //   this.currentId = currentId;
  // }
import { getOrdersAdmin } from "../api.js";

  var items = [];
  
//   addItem(userfName, orderName, total, img, createdAt) {
//     const order = {
//     id: this.currentId++,
//     total,
//     img,
//     userfName,
//     productName,
//     createdAt,
//   }
//     this.items.push(order);
//   }

// loadItemsFromLocalStorage() {
//   const storageOrders = localStorage.getItem("orders")
//   if (storageOrders) {
//     const orders = JSON.parse(storageOrders)
//     for (var i = 0, size = orders.length; i < size; i++) {
//       const order = orders[i];
//       this.items.push(order);
//     }
//   }
// }
const storageData = await getOrdersAdmin();
async function loadItemsFromAPI() {
  try {
    items = [];
    storageData.forEach(order => {
      let orderUserDetail = order.user;
      let orderProductDetail = order.products;
      let orderImage = orderProductDetail[0].imagesList;
      let productSize = orderProductDetail[0].size
      let productCategory = orderProductDetail[0].category

      items.push({
        idOrder: order.idOrder,
        netSale: order.netSale,
        orderDate: order.orderDate,
        status: order.status,
        firstName: orderUserDetail.firstName,
        lastName: orderUserDetail.lastName,
        email: orderUserDetail.email,
        phone: orderUserDetail.phone,
        street: orderUserDetail.street,
        numInt: orderUserDetail.numInt,
        numExt: orderUserDetail.numExt,
        suburb: orderUserDetail.suburb,
        zipCode: orderUserDetail.zipCode,
        city: orderUserDetail.city,
        state: orderUserDetail.state,
        name: orderProductDetail[0].name,
        price: orderProductDetail[0].price,
        imagesList: orderImage[0].imageUrl,
        size: productSize.sizeName,
        category: productCategory.categoryName
      });

    console.log(orderImage[0].imageUrl)
    console.log(order.idOrder + " estos son los id")
    
    // console.log(orderSize.sizeName)
    // console.log(orderColor.colorName)
    // console.log(orderImg[0].imageUrl)

    //   orderProductDetail.forEach(element => {
    //   items[order] ??= [];
    //   items[element].push({
    //     name: element.name,
    //     price: element.description
    //   })

    //   console.log(element.name)
    // });

    });


  } catch (errorCode) {
    console.error('Error al cargar productos: ', errorCode);
    items = [];
  }
  console.log(items)

}

loadItemsFromAPI();


// funcion para encontrar el id para el url

    // function getOrderIdFromUrl() {
    // const params = new URLSearchParams(window.location.search);
    // return params.get('id')}

    // function getOrderById(orderId) {
    //   return storageData.find(o => o.id === orderId);
    // }

  // const orderIdUrl = getOrderIdFromUrl()
  // const orderObj = getOrderById(orderIdUrl)


  // const statusDropdown = document.getElementById('dropdown_status')

  function addItemCard(item) {
  const itemHTML =
    '<tr class="selected_table product ' + item.size + ' ' + item.category + '" ' +
    'data-order-id="' + item.idOrder + '" style="cursor:pointer;" onclick="goToOrderDetail(\'' + item.idOrder + '\')">'  +
    '<td class="product-img">' +
    '<img src="' + item.imagesList + '" alt="' + item.name + '">' +
    '</td>' +
    '<td class="product_label text-start product-name">' +
    '<p class="mb-0">' + item.name + '</p>' +
    '<div class="stock_price_mobile d-flex d-sm-none mt-2">' +
    '<p class="me-3 mb-0">' + item.status + '</p>' +
    '<p>•</p>' +
    '<p class="mx-3 mb-0">$' + item.netSale + '</p>' +
    '</div>' +
    '</td>' +
    '<td class="button_hide fw-bolder edit_btn text-start">' + item.firstName + '</td>' +
    '<td class="d-none d-sm-table-cell">' + item.status + '</td>' +
    '<td class="d-none d-sm-table-cell">$' + item.netSale + '</td>' +
    '<td class="button_hide">' + item.orderDate + '</td>' +
    '<td class="button_hide fw-bolder edit_btn">' + item.idOrder + '</td>' +
    '</tr>';

  const itemsContainer = document.getElementById("list-items");
  itemsContainer.innerHTML += itemHTML;
  console.log("alsdikfjasdl;kfjasd;lkfjads;fkljdsjf;alkjads;lfjkasdf;asdkjf")
}

function loadProductController() {
  for (var i = 0, size = items.length; i < size; i++) {
    const item = items[i];
    addItemCard(item);
  }
}

function goToOrderDetail(orderId) {
  window.location.href = '/html/orders_details_admin.html?id=' + orderId;
}
window.goToOrderDetail = goToOrderDetail;




async function renderProduct() {
  await loadItemsFromAPI();
  loadProductController();
}

if (window.location.pathname === '/html/orders_admin_page.html') {
  renderProduct();
}

