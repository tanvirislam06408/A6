const removeActive = ()=>{
    const btnac = document.getElementsByClassName("active");
    for(let button of btnac){
        button.classList.remove("active")
    }
}
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => {
            
            displayCat(data.data);

        })
}

const displayCat = (data) => {
    data.forEach(e => {
        console.log(e.id);
        
        const catContainer = document.getElementById("lesson");
        const div = document.createElement("div");
        div.innerHTML = `
        <button id="btn-${e.id}"  onclick="loadContent(${e.level_no}); forId(${e.id})" class=" btn border-[#422AD5] text-[#422AD5] hover:text-white hover:bg-[#422AD5]"><img src="assets/fa-book-open.png" alt="">Lesson-${e.level_no}</button>
        `
        catContainer.appendChild(div)

    });

}
const forId = (id)=>{
            const clickBtn = document.getElementById(`btn-${id}`)
            removeActive();
            clickBtn.classList.add("active")
}
const loadContent = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            
            displayWord(data.data);

        })


}
const displayWord = (data) => {
    const wordCon = document.getElementById("content");
    wordCon.innerHTML = "";
    if(data.length == 0){
            wordCon.innerHTML=`
            <div class="bg-[#F8F8F8] text-center h-[200px] content-center rounded-2xl p-5 col-span-full">
        <p class="text-gray-700 font-semibold">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-3xl font-bold p-4">নেক্সট Lesson এ যান</h2>
      </div>
            `
            return;
        }
    data.forEach(element => {
        
        const div = document.createElement("div");
        div.innerHTML = `
    <div class="card bg-base-100 w-96 shadow-sm text-center">
        <div class="card-body">
          <h2 class="text-3xl font-bold">${element.word}</h2>
          <h2 class="text-2xl">Meaning/Pronounciation</h2>
          <h1 class="text-3xl font-bold">${element.meaning} / ${element.pronunciation}</h1>
          <div class="flex justify-between p-5">
            <img onclick="details(${element.id})" class="h-7" src="https://img.icons8.com/ios/50/about.png" alt="about">
            <img class="h-7" src="https://img.icons8.com/ios/50/room-sound.png" alt="sound">
          </div>
        </div>
      </div>
    `
        wordCon.appendChild(div)
    });


}
const details = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(res=>res.json())
    .then(data=>{
    displayDetails(data.data)
        
    })
}
const displayDetails=(data)=>{
    console.log(data);
    document.getElementById('my_modal_5').showModal()
    
const main = document.getElementById("modal");
    main.innerHTML=`

    <h3 class="text-lg font-bold">${data.word}</h3>
    <h2 class="text-xs font-semibold">Meaning</h2>
    <h3>${data.meaning}</h3>
    <h2 class="text-xs font-semibold">Example</h2>
    <h2 class="text-xs font-normal text-gray-500">${data.sentence}</h2>
    <h3>সমার্থক শব্দ গুলো</h3>
    <div class="felx ">
      <div class="btn ">${data.synonyms}</div>
    </div>
     <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
    `


}
loadCategory()

// {
//     "id": 102,
//     "level_no": 2,
//     "lessonName": "Everyday Words"
// }
// {
//     "id": 3,
//     "level": 2,
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস"
// }

// {
//     "word": "Abundant",
//     "meaning": null,
//     "pronunciation": "অবানডান্ট",
//     "level": 3,
//     "sentence": "Water is abundant in rainy seasons.",
//     "points": 3,
//     "synonyms": [],
//     "id": 1
// }