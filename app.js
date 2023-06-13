// *************** Selectors *************** //
const inputGelir = document.getElementById("input-gelir");
const buttonEkle = document.getElementById("btn-ekle");
const buttonKaydet = document.getElementById("btn-kaydet");
let giderGoster = document.getElementById("t-body")
const gelirinizTd = document.getElementById("geliriniz")

let harcamaYeri = document.getElementById("input-harcama")
let harcamatarihi = document.getElementById("input-zaman")
let harcamaMiktari = document.getElementById("input-harcama-miktari")



// ************** VARIABLES **************** //
let objectArr = [];
let valueGelir = 0;




// ************** EVENTS **************** //
buttonEkle.addEventListener("click", (e) => {
    valueGelir += Number(inputGelir.value)
    localStorage.setItem("gelirler", valueGelir);
    inputGelir.value = "";
    geliriGuncelle();


})

window.addEventListener("load", () => {
    valueGelir = Number(localStorage.getItem("gelirler"))

    objectArr=JSON.parse(localStorage.getItem("harcamalar")) || []

    harcamatarihi.valueAsDate = new Date();
    goster();
    geliriGuncelle();

})

buttonKaydet.addEventListener("click", (e) => {
    
   
    
    let objectGelir = {
        gelir:valueGelir,
        yer:harcamaYeri.value,
        tarih:harcamatarihi.value,
        miktar:harcamaMiktari.value,
    } 
    objectArr.push(objectGelir);
    
    localStorage.setItem("harcamalar", JSON.stringify(objectArr));

    goster();
    
})





// ************** FUNCTIONS **************** //

function createTrElement(){
    let newTrElement = document.createElement("tr");
    return newTrElement
}


function createTdElement(){
    let newTdElement = document.createElement("td");
    return newTdElement
}



function goster(){
    while(giderGoster.firstChild) {
        giderGoster.removeChild(giderGoster.firstChild);
      }
    
    for (let i = 0; i < objectArr.length; i++){
        
        let trElement = createTrElement();

        let tdTarih = createTdElement();
        tdTarih.innerText = objectArr[i].tarih;
        trElement.appendChild(tdTarih);
        
        let tdYer = createTdElement();
        tdYer.innerText = objectArr[i].yer;
        trElement.appendChild(tdYer);

        let tdMiktar = createTdElement();
        tdMiktar.innerText = objectArr[i].miktar;
        trElement.appendChild(tdMiktar);

        let tdIslem = createTdElement();
        let tiIslem = document.createElement("i")
        tiIslem.classList.add("fa-solid", "fa-trash-can", "text-danger") 
        tdIslem.appendChild(tiIslem)
        trElement.appendChild(tdIslem);
        
        giderGoster.appendChild(trElement);
    }
}

function geliriGuncelle(){
    gelirinizTd.innerText = valueGelir;
}