const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => {
            displayCat(data.data);

        })
}

const displayCat = (data) => {
    data.forEach(e => {
        const catContainer = document.getElementById("lesson");
        const div = document.createElement("div");
        div.innerHTML = `
        <button onclick="loadContent(${e.level_no})" class="btn border-[#422AD5] text-[#422AD5] hover:text-white hover:bg-[#422AD5]"><img src="assets/fa-book-open.png" alt="">Lesson-${e.level_no}</button>
        `
        catContainer.appendChild(div)

    });

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
          <h1 class="text-3xl font-bold">${element.meaning} ${element.pronunciation}</h1>
          <div class="flex justify-between p-5">
            <img class="h-7" src="https://img.icons8.com/ios/50/about.png" alt="about">
            <img class="h-7" src="https://img.icons8.com/ios/50/room-sound.png" alt="sound">
          </div>
        </div>
      </div>
    `
        wordCon.appendChild(div)
    });


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