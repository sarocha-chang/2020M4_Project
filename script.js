var displayS = document.getElementById('showMV')
var displayF = document.getElementById('showFMV')

function hideAll() {
	displayS.style.display = 'none'
    displayF.style.display = 'none'
}


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
    pic.addEventListener('click',(event)=>{
        var txt;
        if (confirm('Do you want to add '+ movie.title + ' to favoutie movie ?')) {
          /*txt = "Confirm! Let's go to your favourite list of movie";
          alert(txt)*/
          hideAll()
          displayF.style.display = 'block'
          setId(movie)

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

//เพิ่มไปยัง favourite list 

function setId(movie){
    let ID = {
        id: "632110354",
        movie: {
            url: movie.url,
            image_url: movie.image_url,
            title: movie.title,
            synopsis: movie.synopsis,
            type: movie.type,
            episodes: movie.episodes,
            score: movie.score,
            rated: movie.rated
        }
    }
    addtofav(ID)
}

function addtofav(ID){
    fetch(`https://se104-project-backend.du.r.appspot.com/movies`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ID)
    }).then(response =>{
        if(response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then((movie)=>{
        myFavMovie()
    }).catch((error)=>{
        return null
    })
}

//โชว์ 

function myFavMovie(){
    
    fetch(`https://se104-project-backend.du.r.appspot.com/movies/632110354`, {
        method: 'GET'
    }).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
    }).then((data) => {
        MovieFav(data)
    })
}

function MovieFav(data) {
    for (movie of data){
        displayMyFav(movie)
    }
}

function displayMyFav(movie){
    const display = document.getElementById('showFavMovie')
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
    div.appendChild(pic)
    let name = document.createElement('h5')
    name.innerText = movie.title    
    div.appendChild(name)
    let des =document.createElement('p')
    des.innerText = "Synopsis:"+ movie.synopsis
    div.appendChild(des)
    let btndetail = document.createElement('button')
    btndetail.classList.add('btn')
    btndetail.classList.add('btn-primary')
    btndetail.setAttribute('type', 'button')
	btndetail.innerText = 'Detail'
    btndetail.addEventListener('click', (event) => { 
	})
    div.appendChild(btndetail)  
    btndetail.style.marginLeft = "20px"
    btndetail.style.marginRight = "60px"
    let btndelete = document.createElement('button')
    btndelete.classList.add('btn')
    btndelete.classList.add('btn-danger')
    btndelete.setAttribute('type', 'button')
	btndelete.innerText = 'Delete'
    btndelete.addEventListener('click', (event) => { 
        var txt;
        if (confirm('Do you want to delete '+ movie.title + ' from your movie list ?')) {
         deleteMV(movie.id)
          hideAll()

        } else {
          txt = "Ok, fine we can keep it. When you want to see just click it! ";
          alert(txt)

        }
	})
    div.appendChild(btndelete)    
    display.appendChild(div)
}

//จบโชว์

//เพิ่มเติมโชว์ favourite จากตรง nav 

document.getElementById('navfav').addEventListener('click', (event) => {
    hideAll()
    displayF.style.display = 'block'

    myFavMovie()
})


// delete from favourite list 
function deleteMV(ID){
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=632110354&&movieId=${ID}`,{
        method: 'DELETE',
    }).then(response =>{
        if(response.status===200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data=>{
        hideAll()
        myFavMovie()
        displayF.style.display = 'block'
    }).catch(error=>{
        alert('Can not find this movie id')
    })
}