
//Selection List Here
const productSearch = document.getElementById('productSearch'),
      box = document.getElementById('box'),
      sqrfeet = document.getElementById('sqrfeet'),
      pcs = document.getElementById('pcs'),
      amount = document.getElementById('amount'),
      submit = document.getElementById('submit'),
      productlist = document.getElementById('productlist'),
      ullist = document.querySelector('.ullist'),
      addtablebody = document.getElementById('addtablebody');

let applesPerBox = 0,
    squareFeetPerApple = 0,
    pricePerSquareFeet = 0;



//Product Search here
productSearch.addEventListener('input',()=>{
    productlist.style.display='inline-flex';
    const searchInput = productSearch.value.toLowerCase();
    ullist.innerHTML = '';
    const searchWords = searchInput.split(/\s+/);
    const filteredProducts = ProductList.filter(product => {
      return searchWords.every(word => product.name.toLowerCase().includes(word));
    });
//Filter product
    filteredProducts.forEach(product => {
      const listItem = document.createElement('li');
      listItem.textContent = product.name;
      ullist.appendChild(listItem);
    });

//Click to selected
    var listItems = document.querySelectorAll('li');
    listItems.forEach(function (item) {
  item.addEventListener('click', function () {
    productlist.style.display = 'none'; 
    productSearch.value = item.innerText.trimStart();

     applesPerBox = findProductDetailsByName(item.innerText).pcs
    squareFeetPerApple = findProductDetailsByName(item.innerText).sqrfeet
    pricePerSquareFeet = findProductDetailsByName(item.innerText).amount

  });
});
})

//
const updateValues = (a, b, c, d) => {
    amount.value = calculateAppleInfo(a, b, c, d).amount;
    sqrfeet.value = calculateAppleInfo(a, b, c, d).squareFeet;
    pcs.value = calculateAppleInfo(a, b, c, d).pcs;
    box.value = calculateAppleInfo(a, b, c, d).boxCount;
};

box.addEventListener('input', () => updateValues(undefined, box.value));
sqrfeet.addEventListener('input', () => updateValues(undefined, undefined, sqrfeet.value));
pcs.addEventListener('input', () => updateValues(undefined, undefined, undefined, pcs.value));
amount.addEventListener('input', () => updateValues(amount.value));


var totalbox=0;
var totalpcs=0;
var totalamount =0;
var totalsqrfeet = 0;
var sl=0;
submit.addEventListener('click',submitForm); 


document.body.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        submitForm();
    }
  });


function submitForm(){
    if(productSearch.value!==""){
        totalbox += Number(box.value);
        totalpcs += Number(pcs.value-((box.value)*applesPerBox));
        totalsqrfeet += Number(sqrfeet.value);
        totalamount += Number(amount.value);
        document.getElementById('totalsqrfeet').innerText =totalsqrfeet.toFixed(3);
        document.getElementById('totalamount').innerText =totalamount.toFixed(3)+"Taka";
        document.getElementById('totalbox').innerText = `${totalbox} Box ${totalpcs} PCS` ;
         sl+=1
        addtablebody.innerHTML +=`
                                <tr>
                                    <td> ${sl} </td>
                                    <td>${productSearch.value}</td>
                                    <td>${box.value} <small>Box</small> ${pcs.value-((box.value)*applesPerBox)} PCS </td>
                                    <td> ${sqrfeet.value} </td>
                                    <td>${amount.value} Taka</td>
                                </tr>
        `
    }else{
        alert("Please Chose A Product")
    }

}

//Calculaion Function here
function calculateAppleInfo(amount, boxCount, squareFeet, pcs) {
    if (amount !== undefined && boxCount === undefined && squareFeet === undefined && pcs === undefined) {
        squareFeet = amount / pricePerSquareFeet;
        pcs = Math.floor(squareFeet / squareFeetPerApple);
        boxCount = Math.floor(pcs / applesPerBox);
    } else if (boxCount !== undefined && squareFeet === undefined && pcs === undefined) {
        squareFeet = boxCount * applesPerBox * squareFeetPerApple;
        pcs = boxCount * applesPerBox;
        amount = squareFeet * pricePerSquareFeet;


        
    } else if (squareFeet !== undefined && pcs === undefined && boxCount === undefined) {
        pcs = Math.floor(squareFeet / squareFeetPerApple);
        boxCount = Math.floor(pcs / applesPerBox);
        amount = squareFeet * pricePerSquareFeet;
    } else if (pcs !== undefined && squareFeet === undefined && boxCount === undefined) {
        squareFeet = pcs * squareFeetPerApple;
        boxCount = Math.floor(pcs / applesPerBox);
        amount = squareFeet * pricePerSquareFeet;
    } else {
        console.log("Please provide exactly one of amount or two out of boxCount, squareFeet, and pcs.");
        return;
    }

    return {
        boxCount: boxCount,
        squareFeet: squareFeet,
        pcs: pcs,
        amount: amount
    };
};



//Clicked Product Find
function findProductDetailsByName(productName) {
    // Normalize the input by trimming and converting to lowercase
    const normalizedProductName = productName.trim().toLowerCase();

    // Iterate through the ProductList array
    for (let i = 0; i < ProductList.length; i++) {
        // Normalize the current object's name for comparison
        const normalizedCurrentName = ProductList[i].name.trim().toLowerCase();

        // Check if the current object's name includes the input
        if (normalizedCurrentName.includes(normalizedProductName)) {
            // Return the desired properties
            return {
                sqrfeet: ProductList[i].sqrfeet,
                pcs: ProductList[i].pcs,
                amount: ProductList[i].amount
            };
        }
    }
    // Return null if the product name is not found
    return null;
}

