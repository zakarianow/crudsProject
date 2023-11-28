
let title = document.getElementById("titleInput");
let price = document.getElementById("priceInput");
let taxes = document.getElementById("taxesInput");
let ads = document.getElementById("adsInput");
let discount = document.getElementById("discountInput");
let count = document.getElementById("countInput");
let category = document.getElementById("categoryInput");
let total = document.getElementById("total");
let mood = "create";
let tmp = '';


function getTotal(){

    if(price.value != ''){
        let result = ( +price.value + +taxes.value + +ads.value ) - +discount.value ;
        total.innerHTML = result;
        document.getElementById("total").style.background = "green"
    }else{
        document.getElementById("total").style.background = "#770101"
        total.innerHTML = '';
    }    
}

let dataProduct = [];

if(localStorage.product != null){
    
    dataProduct = JSON.parse(localStorage.product);
}else{
    dataProduct = [];
}

function createProduct(){

    let product = {

        "title" : title.value,
        "price" : price.value,
        "taxes" : taxes.value,
        "ads" : ads.value,
        "discount" : discount.value,
        "total" : total.innerHTML,
        "category" : category.value
    }
    if(mood === "create"){
        dataProduct.push(product);
    }else{
        dataProduct[tmp] = product;
    }
    localStorage.setItem("product", JSON.stringify(dataProduct));
    showProducts();
    clearData()
}

function clearData(){

    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
    getTotal();

}

function showProducts(){

    document.getElementById("tbody").innerHTML = '';
    let table = '';
    for(let i=0 ; i < dataProduct.length; i++){
        
        table +=
        `
            <TR>
                <TD>${i+1}</TD>
                <TD>${dataProduct[i].title}</TD>
                <TD>${dataProduct[i].price}</TD>
                <TD>${dataProduct[i].taxes}</TD>
                <TD>${dataProduct[i].ads}</TD>
                <TD>${dataProduct[i].discount}</TD>
                <TD>${dataProduct[i].total}</TD>
                <TD>${dataProduct[i].category}</TD>
                <TD><button id="updateBtn" class="btn" type="button" onclick="updateProduct(${i})">update</button></TD>
                <TD><button id="deleteBtn" class="btn" type="button" onclick="deleteProduct(${i})">delete</button></TD>
            </TR>
        `
    }
    document.getElementById("tbody").innerHTML = table;

    let btnDeleteAll = document.getElementById("deleteAll");
    if(dataProduct.length > 0){
        btnDeleteAll.innerHTML = `
            <button id="deleteAllBtn" class="btn" type="button" onclick="deleteAll()">Delete All ( ${dataProduct.length} )</button>
        `
    }else{
        btnDeleteAll.innerHTML = '';
    }

}

function deleteProduct(id){
    dataProduct.splice(id,1)
    localStorage.product = dataProduct;
    showProducts();
}

function updateProduct(id){

    title.value = dataProduct[id].title;
    price.value = dataProduct[id].price;
    taxes.value = dataProduct[id].taxes;
    ads.value = dataProduct[id].ads;
    discount.value = dataProduct[id].discount;
    category.value = dataProduct[id].category;
    total.innerHTML = dataProduct[id].total;
    getTotal();
    count.style.display ="none";
    document.getElementById("createBtn").innerHTML = "Update";
    mood = "update";
    tmp = id;

}

function deleteAll(){
    localStorage.clear();
    dataProduct.splice(0)
    showProducts()
}

showProducts();


