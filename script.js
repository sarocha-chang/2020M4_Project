var displayS = document.getElementById('showMV')
var displayF = document.getElementById('showFMV')
var displayD = document.getElementById('showD')
var displaySearch = document.getElementById('search')

function hideAll() {
	displayS.style.display = 'none'
    displayF.style.display = 'none'
    displayD.style.display = 'none'

}

function hideSearch(){
displaySearch.style.display = 'none'
}

function onLoad() {
    displaySearch.style.display = 'block'

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
        displayS.style.display = 'block'
        Movie(data.results)
	})
})

function Movie(data) {
    document.getElementById('showMovie').innerHTML=" "

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
    document.getElementById('showFavMovie').innerHTML=" "  
    for (movie of data){
        displayMyFav(movie)
    }
}

function displayMyFav(movie){
    displaySearch.style.display = 'block'
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
        detailMV(movie.id)
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
    displaySearch.style.display = 'block'
    myFavMovie()
})

//เพิ่มเติมกลับไปยังหน้า search จาก nav

document.getElementById('home').addEventListener('click', (event) => {
    hideAll()
    displaySearch.style.display = 'block'

    console.log(555)

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
// จบdelete

function detailMV(ID){
    fetch(`https://se104-project-backend.du.r.appspot.com/movie/632110354/${ID}`, {
        method: 'GET'
    }).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
    }).then((data) => {
        hideSearch()
        hideAll()
        displayD.style.display = 'block'
        showdetailMV(data)
      })
}

function showdetailMV(movie){
    console.log("show")
    const display = document.getElementById('showDetail')    
    let div = document.createElement('div')
    div.classList.add("d-flex")
    div.style.height= "35rem"
    div.style.padding = "40px"
    div.style.border="thin solid rgb(0,0,0,.125)";
    let pic = document.createElement('img')
    pic.setAttribute('src',movie.image_url)
    pic.style.borderRadius = "5px";
    pic.style.height="30rem"
    pic.style.marginBottom="25px"  
    pic.style.marginRight="25px"  
    div.appendChild(pic)
    let div1 = document.createElement('div')
    let name = document.createElement('h3')
    name.innerText = movie.title  
    div1.appendChild(name)
    let des =document.createElement('p')
    des.innerText = "Synopsis: "+ movie.synopsis
    div1.appendChild(des)
    let type = document.createElement('p')
    type.innerText = "Type: "+ movie.type
    div1.appendChild(type)
    let episode = document.createElement('p')
    episode.innerText = "Episode: "+ movie.episodes
    div1.appendChild(episode)
    let score = document.createElement('p')
    score.innerText = "Score: "+ movie.score
    div1.appendChild(score)
    let rate = document.createElement('p')
    rate.innerText = "Rated: "+ movie.rated
    div1.appendChild(rate)
    let btnBack = document.createElement('button')
    btnBack.classList.add('btn')
    btnBack.classList.add('btn-primary')
    btnBack.setAttribute('type', 'button')
	btnBack.innerText = 'Back'
    btnBack.addEventListener('click', (event) => { 
        hideAll()
        document.getElementById('showDetail').innerHTML=" "
        displaySearch.style.display = 'block'
        displayF.style.display = 'block'
    	})
    div1.appendChild(btnBack)  
    div.appendChild(div1)
    display.appendChild(div)

}