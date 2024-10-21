const previousbtn = document.getElementById("previousbtn");
const nextbtn = document.getElementById("nextbtn");
const recipiesContainer = document.getElementById("recipiesContainer");
let visiblePageList = document.getElementById("visiblePageList");
let firstBtn = document.getElementById("first");
let leftTruncate = document.getElementById("leftTruncaTe");
let rightTruncate = document.getElementById("rightTruncate");
let lastBtn = document.getElementById("last");
let visiblePages = [];




let totalData;
let pageNo = 1;
let pageCount = 0;
let pageSize = 2;


fetch('https://dummyjson.com/recipes')
.then(res => res.json())
.then(data =>{
    totalData = data.recipes;
    pageCount = Math.ceil(totalData.length/pageSize);
    addPages();
    lastBtn.innerText = pageCount;
    showRecipes(modifyData(pageNo));
} );

let pages = [];

let addPages = () =>{
    for(let i = 1 ;  i  <= pageCount ;i++){
        let page = document.createElement("div");
        page.innerText = i;
        page.classList.add("pageNo");
        pages.push(page);
    }
}
let addEventListenersToPages =()=>{
    for(let page of pages){
        page.addEventListener("click",()=>{
            pageNo = page.innerText;
            for(let item of pages) item.classList.remove("active");
            showRecipes(modifyData(pageNo));
        })
    }
}

const createCard = (recipe) =>{
    let card = document.createElement("div");
    card.classList.add("recipeCard")
    let name = document.createElement("h2");
    name.innerText = recipe.name;
    let thumbnail = document.createElement("img");
    thumbnail.setAttribute("src",recipe.image);
    let recipeType = document.createElement("p");
    recipeType.innerText = recipe.cuisine + " | " + recipe.difficulty;
    let ingreds = document.createElement("p");
    ingreds.innerText = "Ingredients : ";
    recipe.ingredients.forEach(element => {
        ingreds.innerText += element+",";
    });
    let howheading = document.createElement("h4");
    howheading.innerText = "How to Prepare it :-"
    let howlist = document.createElement("ul");
    recipe.instructions.forEach(step =>{
        let li = document.createElement("li");
        li.innerText = step;
        howlist.append(li);
    })
    
    card.append(name,thumbnail,recipeType,ingreds,howheading,howlist);
    recipiesContainer.append(card);
}

let showPageList = () =>{
    visiblePageList.innerHTML="";
    if(pageNo<3){
        leftTruncate.style.display = "none";
        firstBtn.style.display = "none";
        rightTruncate.style.display="block";
        lastBtn.style.display="block";
        visiblePageList.append(pages[0]);
        visiblePageList.append(pages[1]);
        visiblePageList.append(pages[2]);
        return;
    }
    else{
        leftTruncate.style.display = "block";
        firstBtn.style.display = "block";
    }
    if(pageNo >= pageCount-2 ){
        rightTruncate.style.display = "none";
        lastBtn.style.display = "none";
        leftTruncate.style.display = "block";
        firstBtn.style.display = "block";
        visiblePageList.append(pages[pageCount-3]);
        visiblePageList.append(pages[pageCount-2]);
        visiblePageList.append(pages[pageCount-1]);
        return;
    }
    else{
        rightTruncate.style.display="block";
        lastBtn.style.display="block";
    }
    for(let i = 2 ; i >=0 ; i--){
        visiblePageList.append(pages[pageNo-i]);
    }
}

let showRecipes = (recipes) =>{
    recipiesContainer.innerHTML = "";
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' 
      });
    showPageList();
    addEventListenersToPages();

    pages[pageNo-1].classList.add("active")
    if(pageNo==pageCount){
        nextbtn.style.color= "#69696b";
        nextbtn.removeEventListener("click", handleNext);
    }
    else{
        nextbtn.style.color = "#2d2d2e";
        nextbtn.addEventListener("click", handleNext);
    }
    if(pageNo==1){
        previousbtn.style.color= "#69696b";
        previousbtn.removeEventListener("click",handlePrevious);
    }
    else{
        previousbtn.style.color = "#2d2d2e";
        previousbtn.addEventListener("click",handlePrevious);
    }
    console.log(recipes[0]);
    recipes.forEach((recipe)=>{
        createCard(recipe);
    })
}

let modifyData = (page) =>{
    return totalData.slice((page-1)*pageSize,page*pageSize);
}

let handleNext = ()=>{
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' 
      });
    pages[pageNo-1].classList.remove("active");
    pageNo+=1;
    showRecipes(modifyData(pageNo));
}

nextbtn.addEventListener("click",handleNext);

let handlePrevious = ()=>{
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' 
      });
      pages[pageNo-1].classList.remove("active");
    pageNo-=1;
    showRecipes(modifyData(pageNo));
}

previousbtn.addEventListener("click", handlePrevious);

firstBtn.addEventListener("click",()=>{
    pageNo =1;
    leftTruncate.style.display = "none";
    for(let item of pages) item.classList.remove("active");
    showRecipes(modifyData(1));
})

lastBtn.addEventListener("click",()=>{
    pageNo =pageCount;
    rightTruncate.style.display = "none";
    for(let item of pages) item.classList.remove("active");
    showRecipes(modifyData(pageCount));
})