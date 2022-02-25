var product;

window.onload = getproducts;
var currentPage = 0;
var numberOfPages;
var currentMode = 'light'
var query = "";
var CODAvailability = false;
var isLoggedIn = false;

// function to get product from the database 
function getproducts() {
    var http = new XMLHttpRequest();
    var url = "http://localhost:9999/product/display";
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            // console.log(http.responseText);
            product = JSON.parse(http.responseText);
            //console.log(product);
            filterCODProducts();
        }
    }
    http.open('get',url,true);
    http.setRequestHeader('Content-Type','application/json');
    http.setRequestHeader("Authorization",localStorage.getItem("token"));
    http.send();
    getBestSellerProducts();
    checkLoginStatus();
}

// function to display the products on Home Page
function showProduct(){
        if(product.doc.length != 0){
            document.getElementById('no-product-found').style.display = "none";
            var j = 0 + (currentPage * 12);
            var section = document.getElementById('section-1');
            var productTemplate = document.getElementById('product-card-template');

            for(var i = 1; i <= 4; i++){

                var rowdiv = document.createElement('div');
                rowdiv.className = "row justify-between";
                
                // add offer banner in between
                if(i == 3){
                    section = document.getElementById('section-2');
                    document.getElementById('section-3').style.display =  "block";
                }
                
                for(var column = 1; column < 4; column++){
                    if(j < product.doc.length){
                        //console.log('value of j --> '+j)
                        // creating a clone of template
                        var clone = productTemplate.cloneNode(true);
                        // set the column
                        clone.className = "col col-"+column+" ";
                        // image of the product
                        var image = clone.getElementsByClassName('image')[0].getElementsByTagName('img')[0];
                        image.srcset = product.doc[j].image;
                        image.style.objectFit = 'scale-down';
                        image.style.height = "250px";
                        image.style.width = "150px";
                        var CODspan = clone.getElementsByClassName('image')[0].getElementsByTagName('span')[0];
                        if(product.doc[j].COD){
                            CODspan.innerHTML = "COD Available";
                        }
                        else{
                            CODspan.innerHTML = "COD UnAvailable";
                            CODspan.style.background = "red";
                        }
                        // product description
                        clone.getElementsByClassName('quick-view')[0].getElementsByTagName('p')[0].innerHTML = product.doc[j]._id;
                        var description = clone.getElementsByClassName('desc')[0];
                        description.getElementsByTagName('p')[0].innerHTML = product.doc[j].name;
                        description.getElementsByTagName('p')[1].getElementsByTagName('b')[0].innerHTML =  "<i class='fas fa-rupee-sign'></i> "+product.doc[j].price.$numberDecimal+"&nbsp;&nbsp;";
                        var originalprice = parseInt(product.doc[j].price.$numberDecimal) + (parseInt(product.doc[j].price.$numberDecimal) * product.doc[j].discount)/100;
                        description.getElementsByTagName('p')[1].getElementsByTagName('span')[0].innerHTML = "<i class='fas fa-rupee-sign'></i>"+originalprice.toFixed(2);
                        description.getElementsByClassName('add-cart')[0].getElementsByClassName('product-id')[0].innerHTML = product.doc[j]._id;
                        //console.log(description.getElementsByClassName('add-cart')[0].getElementsByClassName('product-id')[0].innerHTML);

                        // display the clone and append clone in row
                        clone.style.display = "block";
                        rowdiv.appendChild(clone);
                        j++;
                    }
                    
                }

                // append row in section
                section.appendChild(rowdiv);
            }
            // apply pagination 
            var pagetemplate = document.getElementById('page-template');
            var paginationBar = document.getElementById('pagination-bar');
            numberOfPages = Math.ceil(product.doc.length/ 12);
            //console.log('product length'+product.doc.length);
            for(var i = 1; i <= numberOfPages; i++){
                var pageClone = pagetemplate.cloneNode(true);
                pageClone.innerHTML = i;
                pageClone.style.display = "block";
                if(i == (currentPage+1)){
                    pageClone.className = "active";
                }
                paginationBar.appendChild(pageClone);
            }
        }
        else{
            clear();
            document.getElementById('section-3').style.display = "none";
            document.getElementById('content').getElementsByClassName('pagination')[0].style.display = "none";
            document.getElementById('no-product-found').style.display = "block";
        }
}

// go to next page function
function pageIncrease(){
    if((currentPage+1) >= numberOfPages){
    }
    else{
        currentPage++;
        clear();
        showProduct();
    }
   
}

// go to previous page function
function pageDecrease(){
    if((currentPage-1) < 0){

    }
    else{
        currentPage--;
        clear();
        showProduct();  
    }
}

// go to a specific page
function goToPage(e){
    console.log(e.innerHTML);
    currentPage = parseInt(e.innerHTML)-1;
    clear();
    showProduct();
}

// function to refresh the content area
function clear(){
    document.getElementById('pagination-bar').innerHTML = "";
    document.getElementById('section-1').innerHTML = "";
    document.getElementById('section-2').innerHTML = "";
}

// function to get Best Selling Products from database
// according to rating --> Top 10 products
function getBestSellerProducts(){
    var http = new XMLHttpRequest();
    var url = "http://localhost:9999/product/bestseller";
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            // console.log(http.responseText);
            bestsellerProduct = JSON.parse(http.responseText);
            showBestSellerProducts(bestsellerProduct);
            //console.log(product);
        }
    }
    http.open('get',url,true);
    http.setRequestHeader('Content-Type','application/json');
    http.setRequestHeader("Authorization",localStorage.getItem("token"));
    http.send();
}

// function to display the best selling products
function showBestSellerProducts(bestProducts){
    let productTemplate = document.getElementById('bestSeller-template');
    for(var i = 0; i < 10; i++){
        let clone = productTemplate.cloneNode(true);
        clone.getElementsByClassName('product-img')[0].getElementsByTagName('img')[0].srcset = bestProducts.doc[i].image;
        clone.getElementsByClassName('product-text')[0].getElementsByTagName('p')[0].innerHTML = bestProducts.doc[i]._id;
        clone.getElementsByClassName('product-text')[0].getElementsByTagName('p')[1].innerHTML = bestProducts.doc[i].name;
        clone.getElementsByClassName('product-text')[0].getElementsByTagName('b')[0].innerHTML = "<i class='fas fa-rupee-sign'></i> "+bestProducts.doc[i].price.$numberDecimal;
        clone.style.display = "block";
        productTemplate.parentElement.appendChild(clone);
    }
}

// function to set the id of the product - clicked
function getdetails(parent){
    // console.log(parent.innerHTML);
    var name = parent.getElementsByClassName('product-id')[0];
    var productid = name.innerHTML;
    console.log(productid);
    localStorage.setItem('pid',productid);
    location.href = "views/product/detail.html";
}

// function to get details of selected product
function getSelectedProduct(parent){

    var name = parent.getElementsByClassName('product-id')[0];
    var productid = name.innerHTML;
    console.log(productid+" productID --> added to card ");
    var http = new XMLHttpRequest();
    var details = {
        "key" : productid
    }
    var data = JSON.stringify(details);
    var url = "http://localhost:9999/product/searchbyid";
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response);
            var selectedProduct = response.doc[0];
            addToCart(selectedProduct,productid);
        }
    }
    http.open('post',url,true);
    http.setRequestHeader('Content-Type','application/json');
    http.setRequestHeader("Authorization",localStorage.getItem("token"));
    http.send(data);

}

// function to add the product to card if user is logged in
function addToCart(selectedProduct,productid){
    if(isLoggedIn){
        var http = new XMLHttpRequest();
        var details = {
            "pid" : productid+localStorage.getItem('userid'), 
            "custID" : localStorage.getItem('userid'),
            "name" : selectedProduct.name,
            "price" : selectedProduct.price,
            "selectedQty" : 1,
            "qty" : selectedProduct.qty,
            "specification": selectedProduct.specification,
            "review" : selectedProduct.review,
            "discount" : selectedProduct.discount,
            "image" : selectedProduct.image,
            "sellerDetails" : selectedProduct.sellerDetails
        };
        var data = JSON.stringify(details);
        var url = "http://localhost:9999/cart/add";
        http.onreadystatechange = function() {
            if(http.readyState == 2 && http.status == 500){
                window.alert("Product Already Exist in Cart");
            }
            if(http.readyState == 4 && http.status == 200) {
                var response = JSON.parse(this.responseText);
                window.alert(response.message);
            }
        }
    
        http.open('post',url,true);
        http.setRequestHeader('Content-Type','application/json');
        http.setRequestHeader("Authorization",localStorage.getItem("token"));
        http.send(data);
    }
    else{
        alert('Please login first');
        location.href = "views/users/login.html";
    }

}

// function to search Products by Query - filtering data
function searchProductsByQuery(value){
    query = value
    console.log(query);
    var http = new XMLHttpRequest();
    var details = {
        "query" : query
    }
    var data = JSON.stringify(details);
    var url = "http://localhost:9999/product/search";
    http.onreadystatechange = function(){
        if(http.readyState == 4 && http.status == 200){
            product = JSON.parse(this.responseText);
            clear();
            showProduct();
            document.location.href = "#content";
        }
    }
    http.open('post',url,true);
    http.setRequestHeader('content-Type','application/json');
    http.setRequestHeader("Authorization",localStorage.getItem("token"));
    http.send(data);
}

// sort the data on the basis of rating
function sortByReview(reviewValue){
    var revValue = parseFloat(reviewValue.innerHTML);
    var productCopy = product;
    doc = product.doc.filter(function (el)
    {
      return (el.review.$numberDecimal > (revValue - 1 ) &&
             el.review.$numberDecimal <= revValue);
    }
    );
    product = {doc};
    clear();
    showProduct();
    product = productCopy;
}

// function to sort the product on the basis of price
function sortByPrice(priceValue){
    var productValue = priceValue.innerHTML.split(',');
    var productCopy = product;
    doc = product.doc.filter(function (el)
    {
      return el.price.$numberDecimal < parseInt(productValue[1])
             && el.price.$numberDecimal >= parseInt(productValue[0]);
    }
    );
    product = {doc};
    clear();
    showProduct();
    product = productCopy;
}

// function to sort the data on the basis of discount
function sortBydiscount(discountValue){
    var discount =discountValue.split(',');
    var productCopy = product;
    doc = product.doc.filter(function (el)
    {
      return el.discount >= discount[0]
             && el.discount < discount[1];
    }
    );
    product = {doc};
    clear();
    showProduct();
    product = productCopy;;
}

// filter the products on the basis of cash on delivery Availability
function filterCODProducts(){
    if(CODAvailability){
        CODAvailability = false;
        console.log('COD changed to --> false');
    }
    else{
        CODAvailability = true;
        console.log('COD changed to --> true');
    }
    var productCopy = product;
    doc = product.doc.filter(function (el)
    {
      return el.COD === CODAvailability;
    }
    );
    product = {doc};
    clear();
    showProduct();
    product = productCopy;
}

// function to check/uncheck a category
function setCheckValue(checkbox){
    if(checkbox.value.charAt(0) == '-'){
      console.log('changing to check');
      checkbox.value = checkbox.value.substring(1);
    }
    else{
      console.log('changing to un-check');
      checkbox.value = '-'+checkbox.value;
    }
    query = "";
    filterOrders();
}

// filter orders
function filterOrders(){

    parent = document.getElementsByClassName('electronics')[0];
    var options = [];
    var unorderedList = parent.getElementsByTagName('ul')[0];
    options[0] = unorderedList.getElementsByTagName('li')[0].getElementsByTagName('input')[0].value;
    options[1] = unorderedList.getElementsByTagName('li')[1].getElementsByTagName('input')[0].value;
    options[2] = unorderedList.getElementsByTagName('li')[2].getElementsByTagName('input')[0].value;
    options[3] = unorderedList.getElementsByTagName('li')[3].getElementsByTagName('input')[0].value;
    options[4] = unorderedList.getElementsByTagName('li')[4].getElementsByTagName('input')[0].value;
    options[5] = unorderedList.getElementsByTagName('li')[5].getElementsByTagName('input')[0].value;
    options[6] = unorderedList.getElementsByTagName('li')[6].getElementsByTagName('input')[0].value;
    options[7] = unorderedList.getElementsByTagName('li')[7].getElementsByTagName('input')[0].value;
    for(var i = 0 ; i < options.length; i++){
      query += options[i]+" ";
    }
    console.log('query is --> '+query);
    if(query == '-Phones -Accessories -Laptops -Printers -Televisions -Speakers -Refrigerators -WashingMachine '){
        console.log('inside');
        clear();
        getproducts();
    }
    else{
        clear();
        searchProductsByQuery(query);
    }
}

// change the display mode
function changeMode(){
    if(currentMode == 'light'){
        document.getElementById('container').style.background = '#222';
        document.getElementById('container').style.color = "#e6e6e6";
        currentMode = 'dark';
    }
    else{
        document.getElementById('container').style.background = "white";
        document.getElementById('container').style.color = "black";
    }
}

// check if a user is logged in or not
function checkLoginStatus(){
    if(localStorage.getItem('userid') === ""){
        isLoggedIn = false;
        document.getElementById('topbar-logged-out').style.display = "flex";

    }
    else{
        console.log('login status set to true');
        isLoggedIn = true;
        loadUserDetails();
    }
}

// load the user detail if user is logged in
function loadUserDetails(){
    var username = localStorage.getItem('username')+"  "+document.getElementById('user-name').innerHTML;
    document.getElementById('topbar-logged-in').style.display = "block";
    document.getElementById('user-name').innerHTML = username;
}

// move to cart if user is logged in
function gotoCart(){
    if(isLoggedIn){
        location.href = "views/product/cart.html";
    }
    else{
        alert('Please login first');
        location.href = "views/users/login.html";
    }
}

// function to set Query for filter
function setQuery(e){
    var span = document.createElement('span');
    span.innerHTML = e.innerHTML;
    console.log(span);
    document.getElementById('container-heading').innerHTML = "";
    document.getElementById('container-heading').appendChild(span);
    document.getElementById('main-navigation').getElementsByTagName('li')[0].className = "";
    e.parentElement.parentElement.parentElement.parentElement.className = "active";
    searchProductsByQuery(e.innerHTML);
}