let products = [];
let brands = ["IPhone","Nokia","SamSung","XiaoMi","Vertu","BlackBerry"];
const key = "data-mobile";
class Product {
  constructor(name, brand) {
    this.name = name;
    this.brand = brand;
  }
}

class Brand {
  constructor(name){
    this.name = name;
  }
}

let submit = document.getElementById("submit");
submit.addEventListener("click",addproduct);

let cancel = document.getElementById("cancel");
cancel.addEventListener("click",cancelAll);


function init() {
  if (window.localStorage.getItem(key) == null) {
  let product1 = new Product("IPhone XS Max", "IPhone");
  let product2 = new Product("SamSung Galaxy A50", "SamSung");
  products = [product1, product2];
  setLocalStorage(key,products)
}else{
  getLocalStorage();
}
}
function showProduct() {
  let tbproduct = document.getElementById("tbproduct");
  tbproduct.innerHTML = "";
  let option = document.getElementById("brand");
  option.innerHTML = "";
  for(let i = 0; i < brands.length; i++){
    option.innerHTML += `<option value="${brands[i]}" >${brands[i]}</option> `;
  }
  for (let i =  products.length -1 ; i >  0 ; i--) {
    tbproduct.innerHTML += `<tr id="tr_${i}">
                              <td>${i }</td>
                              <td>${products[i].name}</td>
                              <td>${products[i].brand}</td>
                              <td> <a href="javascript:;"  id="show" class="btn btn-outline-success "  onclick="editProduct(${i})"><i class="fa fa-edit"> Edit</i></a></td>  
                              <td> <a href="javascript:;" class="btn btn-danger" onclick="removeProduct(${i})">Delete</a></td>
                          </tr>
                          `;
  }
}
function setLocalStorage(key,data){
    window.localStorage.setItem(key,JSON.stringify(data));
}

function getLocalStorage(){
  products= JSON.parse(window.localStorage.getItem(key));
}

function addproduct() {
  let tbproduct = document.getElementById("tbproduct");
  let productName = document.getElementById("name").value;
  let productBrand = document.getElementById("brand").value;
  if (productName == "" || productBrand == "")  {

    if(isNullOrEmpty(productName) || isNullOrEmpty(productBrand)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Product name is required!',
      })
    }
  } else {
    let product = new Product(productName, productBrand) ;
    Swal.fire({
    icon: 'success',
    position: "bottom-end",
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
});
  products.push(product);
  setLocalStorage(key, products);
  tbproduct.innerHTML += `<tr id="tr_${products.length - 1}">
                          <td>${(products.length - 1)}</td>
                          <td>${(products[products.length - 1].name)}</td>
                          <td>${(products[products.length - 1].brand)}</td>
                          <td> <a href="javascript:;"  id="show" class="btn btn-outline-success "  onclick="editProduct(${(products.length - 1)})"><i class="fa fa-edit"> Edit</i></a></td>  
                          <td> <a href="javascript:;" class="btn btn-danger" onclick="removeProduct(${products.length - 1})">Delete</a></td>
</tr>
`;
console.log(products[products.length - 1]);
    clearData();
  }

}
   

function editProduct(i){
  document.getElementById("submit").classList.add("class","d-none");
  document.getElementById("update").classList.remove("d-none");
  document.getElementById("cancel").removeAttribute("disabled");
  product = JSON.parse( localStorage.getItem(key))[i];
  document.getElementById("name").value = product.name;
  document.getElementById("brand").value = product.brand;
  document.getElementById("update").value = i;
}

function updateProduct(i){
  products[i].name = document.getElementById("name").value;
  products[i].brand = document.getElementById("brand").value;
  Swal.fire({
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
});
  setLocalStorage(key,products);
  cancelAll();
  clearData();
  showProduct();
}

function cancelAll(){
  document.getElementById("submit").classList.remove("d-none");
  document.getElementById("update").classList.add("d-none");
  document.getElementById("cancel").setAttribute("disabled", true);
  clearData();
}

function removeProduct(i){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
if (result.isConfirmed) {
Swal.fire(
  'Deleted!',
  'Your file has been deleted.',
  'success'
 
)
products.splice(i, 1);
setLocalStorage(key, products);
document.getElementById("tr_"+i).remove();
// $("#tr_"+i).remove();
// showProduct();
}
})

}

function isNullOrEmpty(str) {
  return str == null || str.trim() == "";
}

function clearData(){
  document.getElementById("name").value = "";
}

function documentReady() {
  init();
  showProduct();
}

documentReady();


