import "./css/index.css"
import Imask from 'imask'

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")



function setCardType(type)  {
    const colors = {

        visa: ["#436D99" , "#2D57F2"],
        master: ["#DF6F29" , "#C69347"],
        elo: ["#007EAC" , "#00A4E0"],
        american: ["#006400" , "#00FF7F"],
        default: ["black" , "grey"],
        
}
    ccBgColor01.setAttribute("fill", colors[type] [0]);
    ccBgColor02.setAttribute("fill", colors[type] [1]);
    ccLogo.setAttribute("src", `cc-${type}.svg`);
}

    globalThis.setCardType = setCardType

// Còdigo de Segurança
const securityCode = document.querySelector('#security-code')
const securityCodePattern = {
 mask: "0000"
}

 const securityCodeMasked = Imask(securityCode, securityCodePattern)

// codigo de expiração
const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {
        
        YY: {
            mask: Imask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 10).slice(2), 
        },

        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
        },
}
}

const expirationDateMasked = Imask(expirationDate, expirationDatePattern)

// numero do cartão 
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
    mask: [
        {
            mask: "0000 0000 0000 0000",
            regex: /^4\d{0,15}/,
            cardtype: "visa",
        },
        {
            mask: "0000 0000 0000 0000",
            regex:/^(5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
            cardtype: "master",
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /^6\d{0,15}/,
            cardtype: "elo",
        },
        {
            mask: '0000 000000 00000',
            regex: /^3[47]\d{0,13}/,
            cardtype: "american"
        },
        {
            mask: "0000 0000 0000 0000",
            cardtype: "default",
        },
    ],

    // função da expressão regular
    dispatch: function (appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, "");
        const foundMask = dynamicMasked.compiledMasks.find(({regex})=> number.match(regex)) 
         
        return foundMask
    },
}

    // função expressão regular V2.0
    //dispatch: function (appended, dynamicMasked) {
    //const number = (dynamicMasked.value + appended).replace(/\D/g, "");
    //const foundMask = dynamicMasked.compiledMasks.find(function(item) {
    // return number.match(item.regex)
    //})
  


const cardNumberMasked = Imask(cardNumber, cardNumberPattern)

// adicionar cartão
const addButton = document.querySelector("#add-card")
addButton.addEventListener("click" ,() => {
    alert("Cartão Adicionado!")
})

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
})

// titular do cartão
const cardHolder = document.querySelector("#card-holder")
 cardHolder.addEventListener("input", () => {
    const ccHolder = document.querySelector(".cc-holder .value")

    ccHolder.innerText = cardHolder.value.length === 0 ? "SEU NOME" : cardHolder.value
 }) 
//validação do codigo de segurança
 securityCodeMasked.on("accept" , () => {
    updateSecurityCode(securityCodeMasked.value)  
 })

function updateSecurityCode(code) {
    const ccSecurity = document.querySelector(".cc-security .value")
    ccSecurity.innerText = code.length === 0 ? "1234" : code
}
// validação do numero do cartão
cardNumberMasked.on("accept" ,  () => {
    
    const cardType = cardNumberMasked.masked.currentMask.cardtype;
    setCardType(cardType);
    updateCardNumber(cardNumberMasked.value);
})

function updateCardNumber(number) {
    const ccNumber = document.querySelector(".cc-number")
    ccNumber.innerText = number.length === 0 ?  "1234 5678 9012 3456" : number
}
// validação expiração do cartão
 expirationDateMasked.on("accept" , () => {
    updateExpirationDate(expirationDateMasked.value)
 }) 

 function updateExpirationDate(date) {
    const ccExpiration = document.querySelector(".cc-extra .value")
    ccExpiration.innerText = date.length === 0 ? "02/32" : date
 }
