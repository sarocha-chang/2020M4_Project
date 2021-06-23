
//เอาไว้สำหรับหน้าแรก show กับ search 
document.getElementById('searchButton').addEventListener('click', (event) => {
	let mvname = document.getElementById('inputText').value
	console.log(mvname)
	fetch(`https://api.jikan.moe/v3/search/anime?q=${mvname}`)
	.then((response) => {
		return response.json()
	}).then((data) => { 
		console.log(data)
        Movie(data.results)
	})
})

function Movie(data) {
    for (movie of data){
        showMovie(movie)
    }
}


function showMovie(movie){
    const display = document.getElementById('showMovie')
    display.style.margin = "50px";
    let div = document.createElement('div')
    div.style.width= "24rem"
    div.style.padding = "50px";
    div.style.border="thin solid rgb(0,0,0,.125)";
     let pic = document.createElement('img')
    pic.setAttribute('src',movie.image_url)
    pic.style.borderRadius = "5px";
    pic.style.height="22rem"
    pic.style.maxWidth="20rem"
    pic.style.padding="15px"
    pic.addEventListener('dblclick',(event)=>{
        var txt;
        if (confirm('Do you want to add '+ movie.title + ' to favoutie movie ?')) {
          txt = "Confirm! Let's go to your favourite list of movie";
          alert(txt)

        } else {
          txt = "Nevermind , you can see and choose a new movie!";
          alert(txt)

        }
	})
    div.appendChild(pic)
    let name = document.createElement('h5')
    name.innerText = movie.title    
    div.appendChild(name)
    let des =document.createElement('p')
    des.innerText = "Synopsis:"+ movie.synopsis
    div.appendChild(des)
    display.appendChild(div)
}
//จบเงื่อนไขแรก