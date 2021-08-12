
async function fetchData() {
    
    const triviaSelect = document.getElementById("select-trivia");
    const triviaSelectDifficult = document.getElementById("trivia-difficult");
    const updateTrivia = document.querySelector(".update-trivia");
    let btnBuscar = document.querySelectorAll(".btn-buscar-trivia");

    btnBuscar.forEach((btn) => {   
        btn.addEventListener('click', async function () {
            const category = triviaSelect.value;
            const difficult = triviaSelectDifficult.value;
    
            let response = ''
            if(category == 'any' && difficult != 'any') {
                response = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficult}`);    
            } else if(difficult == 'any' && category != 'any') {
                response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}`);
            }else if(category == 'any' && difficult == 'any') {
                response = await fetch(`https://opentdb.com/api.php?amount=10`);
            }else {
                response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficult}`);
            }
            
            let data = await response.json()
            console.log(data)
            let c = ''
            c += data['results'].map(element => {
                return `
                <li>
                    <p class="title">${element['question']}</p>
                    <div class="trivia-answers">${element['incorrect_answers'].map(item => `<span>${item}</span>`).join(' ')} <span class="correct-answer">${element['correct_answer']}</span></div>     
                </li>`
            }).join('')
    
            document.querySelector('.ul-container').innerHTML = c
            updateTrivia.style.display = "flex";
        })
    })
    

}
fetchData()
