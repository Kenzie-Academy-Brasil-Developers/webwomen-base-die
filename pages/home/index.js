function localStorageItems(arr) {   

    const itemsJson = JSON.stringify(arr)

    localStorage.setItem("jobs", itemsJson);
}

function renderCards (cards) {

    const ul = document.querySelector(".card__jobs")

    cards.forEach((card)=>{

        const cardDone = creatingCards(card)

        ul.append(cardDone)
        renderCardsAside(card)

    })

}

function renderCardsAside (cards) {

    const ul = document.querySelector(".selected_jobs")

    ul.innerHTML = ""
    if(arrayItens.length <= 0){

        const changeCard = changeCardItem()

        ul.append(changeCard)

    } else{

        cards.forEach((card)=>{
    
            const cardDone = creatingCardsAside(card)
    
            ul.append(cardDone)
    
        })


    }


}

function changeCardItem() {

    const li = document.createElement("li")
    const p = document.createElement("p")

    p.innerHTML = "Você ainda não aplicou para nenhuma vaga"

    li.append(p)

    return li

}


function creatingCards (list) {

    let li = document.createElement("li")
    let h2 = document.createElement("h2")
    let cardJobsFeatures = document.createElement("div")
    let spanEnterprise = document.createElement("span")
    let spanLocation= document.createElement("span")
    let p = document.createElement("p")
    let cardBtnSpan = document.createElement("div")
    let spanModalities = document.createElement("span")
    let button = document.createElement("button")

    li.classList.add("card__jobs_content")
    h2.innerText = list.title
    cardJobsFeatures.classList.add("card__jobs__features")
    spanEnterprise.innerText = list.enterprise
    spanLocation.innerText = list.location
    p.innerText = list.descrition
    
    spanModalities.innerText = list.modalities[0]
    spanModalities.classList.add("card__category")
    button.classList.add("btn_register")
    button.innerText = "Candidatar"
    button.dataset.id = list.id
    button.dataset.itemId = list.itemId
    button.setAttribute("id", list.id)
  
    cardJobsFeatures.append(spanEnterprise, spanLocation)
    li.append(h2, cardJobsFeatures, p, spanModalities, button)

    return li
}

renderCards(jobsData)

function creatingCardsAside (list) {

    let li = document.createElement("li")
    let selectedJobs = document.createElement("div")
    let h2 = document.createElement("h2")
    let buttonRemove = document.createElement("button")
    let imgTrash = document.createElement("img")
    let selectedJobsEnterprise = document.createElement("div")
    let spanEnterprise = document.createElement("span")
    let spanLocation = document.createElement("span")

    selectedJobs.classList.add("selected__jobs__btn")
    h2.innerText = list.title
    buttonRemove.classList.add("btn-remove-card")
    buttonRemove.dataset.itemId = list.itemId
    buttonRemove.id = list.id
    buttonRemove.addEventListener("click", (event)=>{
        console.log(event.target.id)
        let btn = document.querySelectorAll(".btn_register")
        btn.forEach((btnSingle)=>{
            if (btnSingle.id == event.target.id) {

                btnSingle.innerText = "Candidatar"
            }
            let removed = arrayItens.findIndex(item => item.id == event.target.id)
        
            arrayItens.splice(removed, 1)
            localStorageItems(arrayItens)
            renderCardsAside(arrayItens)
        })
    })
    imgTrash.src = "./assets/img/trash.png"
    imgTrash.alt = "button"
    selectedJobsEnterprise.classList.add("selected_jobs__enterprise")
    spanEnterprise.innerText = list.enterprise
    spanLocation.innerText = list.location

    selectedJobsEnterprise.append(spanEnterprise, spanLocation)
    buttonRemove.appendChild(imgTrash)
    selectedJobs.append(h2, buttonRemove)
    li.append(selectedJobs, selectedJobsEnterprise)

    return li

}

function addJobs () {

    let btns = document.querySelectorAll(".btn_register")
    console.log(btns)

    btns.forEach((buttonn)=>{
        console.log(buttonn)
        buttonn.addEventListener("click", (event)=>{

            event.preventDefault()

            if(buttonn.textContent == "Candidatar"){

                buttonn.innerText = "Remover Candidatura"
                let lelect = jobsData[event.target.id]
                arrayItens.push(lelect)
                localStorageItems(arrayItens)
                renderCardsAside(arrayItens)

            } else {
                buttonn.innerText = "Candidatar"
    
                let removed = arrayItens.findIndex(item => item.id == event.target.id)
    
                arrayItens.splice(removed, 1)
                localStorageItems(arrayItens)
                renderCardsAside(arrayItens)
            }
        })
    })

}

addJobs()

