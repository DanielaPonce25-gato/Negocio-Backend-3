
document.addEventListener("DOMContentLoaded",async()=>{


const params = new URLSearchParams(window.location.search);

const id = params.get("id");


const response = await fetch(`/api/products/${id}`);

const data = await response.json();


const product=data.payload;



mostrarProducto(product);



});



function mostrarProducto(product){


let imagenes =
product.images?.length
? product.images
:[ "/uploads/logo.jpg" ];



let index=0;



const container=document.getElementById("productDetail");



container.innerHTML=`

<div class="product-page">


<div class="images">


<button id="prev">
❮
</button>


<img id="mainImage" src="${imagenes[0]}">


<button id="next">
❯
</button>


</div>



<h1>
${product.title}
</h1>


<p>
${product.description}
</p>


<h2>
$${product.price}
</h2>



<div class="quantity">


<button id="minus">
-
</button>


<input 
id="amount"
value="1"
min="1"
type="number"
>


<button id="plus">
+
</button>


</div>



<button id="cart">
Agregar al carrito
</button>



</div>

`;



document.getElementById("next").onclick=()=>{

index++;

if(index>=imagenes.length)
index=0;


document.getElementById("mainImage").src=imagenes[index];


}



document.getElementById("prev").onclick=()=>{


index--;

if(index<0)
index=imagenes.length-1;


document.getElementById("mainImage").src=imagenes[index];


}



document.getElementById("plus").onclick=()=>{

amount.value++;

}



document.getElementById("minus").onclick=()=>{

if(amount.value>1)
amount.value--;

}


}