document.addEventListener("DOMContentLoaded", function(){

    /* url of song api --- https versions hopefully a little later this semester */	
const songAPI = 'https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

let songJSON = localStorage.getItem("songStuff")
if (songJSON)

{
    songData = JSON.parse(songJSON)
    mainApplication(songData)
}

else{

    fetch(songAPI)
    .then(response=> response.json())
    .then(songData=>{

      /*needs to be string to store*/  
      localStorage.setItem("songStuff", JSON.stringify(songData))
      mainApplication(songData) 
    })

    .catch((error) => {
        console.error('Error:', error);
      })
}

})


function mainApplication(songData){
/*all main code in here*/
//credit for sort: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
//sort for all lists
//pass in respective node list
    function sort(songDataList){
        let songDataTitleArr = Array.from(songDataList)
        songDataTitleArr.sort((a, b) => {
            const songA = a.innerText.toLowerCase();
            const songB = b.innerText.toLowerCase(); 
            if (songA < songB) {
              return -1;
            }
            if (songA > songB) {
              return 1;
            }
          
            return 0;
          });

          return songDataTitleArr; //return sorted array
    }

    //handle all click for single song view 
    const mainPage = document.querySelector("#mainView")

    const songPage = document.querySelector("#singleView")
    
    const playListPage = document.querySelector("#playlistView")

    function songTitleClick(songData, option){
    
        let songTitleArr = null;

        //option1 for mainlist, 2 for playlist
        if (option == 1){
            songTitleArr = document.querySelectorAll("#titleResultList li")
        }

        if (option == 2){
            songTitleArr = document.querySelectorAll("#playListViewTitleResultList li")
        }

        for (let j = 0; j < songTitleArr.length; j++){
        
           songTitleArr[j].addEventListener("click", function(){
        
               //find the corresponding song in data array
               for (let i = 0; i < songData.length; i++){

                 //if song found    
                if ( songData[i].song_id == songTitleArr[j].dataset.id)
                { 
    
               
                let title = document.querySelector("#title")
                let name = document.querySelector("#artistName")
                let genre = document.querySelector("#genre")
                let year = document.querySelector("#year")
                let duration = document.querySelector("#duration")
			    let bpm = document.querySelector("#bpm")
			    let popularity= document.querySelector("#popularity")
			    let loudness = document.querySelector("#loudness")
                let energy = document.querySelector("#energy")
			    let danceability = document.querySelector("#danceability")
			    let liveness = document.querySelector("#liveness")
			    let valence = document.querySelector("#valence")
			    let acousticness = document.querySelector("#acousticness")
			    let speechiness = document.querySelector("#speechiness")
                
                title.textContent = "Title: " + songData[i].title
                name.textContent = "Artist Name: " + songData[i].artist.name
                genre.textContent = "Genre: "+ songData[i].genre.name
                year.textContent = "Year: "+ songData[i].year
                bpm.textContent = "BPM: " + songData[i].details.bpm
                popularity.textContent ="Popularity: " +songData[i].details.popularity
                loudness.textContent ="Loudness: " +songData[i].details.loudness
                energy.textContent ="Energy: " +songData[i].analytics.energy
                danceability.textContent ="Danceability: " +songData[i].analytics.danceability
                liveness.textContent ="Liveness: " +songData[i].analytics.liveness
                valence.textContent ="Valence: " +songData[i].analytics.valence
                acousticness.textContent = "Acousticness: " +songData[i].analytics.acousticness
                speechiness.textContent="Speechiness: " +songData[i].analytics.speechiness



                let minutes = Math.floor(songData[i].details.duration / 60)
                let seconds = songData[i].details.duration % 60 

                duration.textContent = "Time: " + minutes + " minutes" + " and " + seconds + " seconds"

                //create chart
                //destroy instance of previous chart
                let chartStatus = Chart.getChart("myChart"); // <canvas> id
                   if (chartStatus != undefined) {
                       chartStatus.destroy();
                   }

                let chart1 = document.querySelector("#myChart").getContext('2d')
                let chartInstance = new Chart(chart1, {

                    type: 'radar',
                    data: {
                        labels: ["Energy", "Danceability", "Valence", "Speechiness", "Liveness", "Loudness"],
                        datasets: [{
                            label: 'Statistics',
                            data: [songData[i].analytics.energy, songData[i].analytics.danceability,
                                   songData[i].analytics.valence,songData[i].analytics.speechiness,
                                   songData[i].analytics.liveness, songData[i].details.loudness],          
                                   "fill": true,
                                   "backgroundColor": "rgba(165, 211, 164, 0.2)",
                                   "borderColor": "rgb(165, 211, 164)",
                                   "pointBackgroundColor": "rgb(165, 211, 164)",
                                   "pointBorderColor": "#fff",
                                   "pointHoverBackgroundColor": "#fff",
                                   "pointHoverBorderColor": "rgb(255, 99, 132)"   
                        }]
                    },
                    options: {
                        scales: {
                            r: {
                               pointLabels:{
                                 color: 'white',
                                 font:{
                                    size: 15,
                                    style: 'italic'
                                 }
                               },
                                angleLines: {
                                    color: 'rgba(240, 240, 240,0.5)',
                                },
                
                                grid: {
                                    color: "lightgreen",
                                },
                
                            },
                            
                        
                        }
                    }
                })

                mainPage.classList.add("hide")
                songPage.classList.remove("hide")

                }
               }
                       
            
           })
        }
        } //end of songTitleClick


//close single view handler
const closeSingle = document.querySelector("#closeSingle") 
closeSingle.addEventListener("click", function(){
    mainPage.classList.remove("hide")
    songPage.classList.add("hide")
}) 

//switch to play list view
const playListButton= document.querySelector("#playListButton")

playListButton.addEventListener("click", function(){
    mainPage.classList.add("hide")
    playListPage.classList.remove("hide")


})

//close playlist view
const closeViewButton = document.querySelector("#closeView")
closeViewButton.addEventListener("click",function(){
    playListPage.classList.add("hide")
    mainPage.classList.remove("hide")
} )

//add song to playlist button
const addButton = document.querySelector("#addButton")
const snackbar = document.querySelector("#snackbar")
const playListTitle = document.querySelector("#playListViewTitleResultList")
const playListArtist = document.querySelector("#playListViewArtistResultList")
const playListYear = document.querySelector("#playListViewYearResultList")
const playListGenre = document.querySelector("#playListViewGenreResultList")
const playListPopularity = document.querySelector("#playListViewPopularityResultList")
addButton.addEventListener("click", function(){

    let songAdd = prompt("Enter exact title to add to playlist")

    for (let k = 0; k < songData.length; k++){
        if (songAdd.toString().toLowerCase() === songData[k].title.toString().toLowerCase()){
            let newTitle = document.createElement("li")
            let newArtist = document.createElement("li")
            let newYear = document.createElement("li")
            let newGenre = document.createElement("li")
            let newPopularity = document.createElement("li")
            newTitle.textContent = songData[k].title
            newTitle.dataset.title = songData[k].title
            newTitle.dataset.id = songData[k].song_id
            newTitle.dataset.artist = songData[k].artist.name //assign for remove purposes
            newTitle.dataset.year = songData[k].year
            newTitle.dataset.genre = songData[k].genre.name
            newTitle.dataset.popularity = songData[k].details.popularity

            newArtist.textContent = songData[k].artist.name
            newYear.textContent = songData[k].year
            newGenre.textContent = songData[k].genre.name
            newPopularity.textContent = songData[k].details.popularity

            playListTitle.appendChild(newTitle)
            playListArtist.appendChild(newArtist)
            playListYear.appendChild(newYear)
            playListGenre.appendChild(newGenre)
            playListPopularity.appendChild(newPopularity)
            songTitleClick(songData, 2)
            snackbar.classList.remove("hide")
            snackbar.classList.add("show")
            setTimeout(function(){snackbar.classList.remove("show")}, 3000)
        }
    }
   
})
//clear the playlist
const clearBttn = document.querySelector("#clearPlaylist")
clearBttn.addEventListener("click", function(){
    playListTitle.innerHTML = ''
    playListArtist.innerHTML = ''
    playListYear.innerHTML = ''
    playListGenre.innerHTML = ''
    playListPopularity.innerHTML = ''
})

//remove from playlist
const removeBttn = document.querySelector("#remove")

removeBttn.addEventListener("click", function(){

    let songRemove = prompt("Enter the exact title to remove from playlist")
    titleArr = document.querySelectorAll("#playListViewTitleResultList li")
   
    for (let i = 0; i < titleArr.length; i++){
     
        if (titleArr[i].textContent.toString().toLowerCase() === songRemove.toString().toLowerCase()){  

            playListTitle.removeChild(Array.from(playListTitle.childNodes).find(v => v.innerHTML == titleArr[i].dataset.title))
            playListArtist.removeChild(Array.from(playListArtist.childNodes).find(v => v.innerHTML == titleArr[i].dataset.artist))
            playListYear.removeChild(Array.from(playListYear.childNodes).find(v => v.innerHTML == titleArr[i].dataset.year))
            playListGenre.removeChild(Array.from(playListGenre.childNodes).find(v => v.innerHTML == titleArr[i].dataset.genre))
            playListPopularity.removeChild(Array.from(playListPopularity.childNodes).find(v => v.innerHTML == titleArr[i].dataset.popularity))
        }

    }


})

//popup for all credit button 
const popupDiv = document.querySelectorAll(".creditPopup")
const credit = document.querySelectorAll(".hideCredit")

//popup for each credit button
for(let i = 0; i < credit.length; i++){

    credit[i].addEventListener("mouseover", function(){
    popupDiv[i].classList.remove("hide")
    setTimeout(function(){popupDiv[i].classList.add("hide")}, 7000)
    })
}

//create an array of genres without duplicate
let genreArray =[]
for (let i = 0; i< songData.length; i++){
    if ( !genreArray.includes(songData[i].genre.name)){
        genreArray.push(songData[i].genre.name)
    }
}

//create an array of artists without duplicate
let artistArray =[]
for (let i = 0; i< songData.length; i++){
    if (!artistArray.includes(songData[i].artist.name)){
        artistArray.push(songData[i].artist.name)
    }
}

//populate dropdown for genre
let select1 = document.querySelector("#pickGenre")

for (let i = 0; i < genreArray.length; i++){
     let optionNode = document.createElement("option") 
     optionNode.textContent= genreArray[i]
     optionNode.value = genreArray[i]
     select1.appendChild(optionNode)

}

//populate dropdown for artist
let select2 = document.querySelector("#pickArtist")

for (let i = 0; i < artistArray.length; i++){
    let optionNode = document.createElement("option") 
    optionNode.textContent= artistArray[i]
    optionNode.value = artistArray[i]
    select2.appendChild(optionNode)

}

//populate the inital view under browse/search

//get each unordered list
const titleListNode = document.querySelector("#titleResultList")
const artistListNode = document.querySelector("#artistResultList")
const yearListNode = document.querySelector("#yearResultList")
const genreListNode = document.querySelector("#genreResultList")
const popularityListNode = document.querySelector("#popularityResultList")

//append items to the unordered list
for (let i =0; i< songData.length; i++){
let titleItem = document.createElement("li")
let artistItem = document.createElement("li")
let yearItem = document.createElement("li")
let genreItem = document.createElement("li")
let popularityItem = document.createElement("li")


titleItem.textContent = songData[i].title;
artistItem.textContent = songData[i].artist.name
yearItem.textContent = songData[i].year;
genreItem.textContent = songData[i].genre.name;
popularityItem.textContent = songData[i].details.popularity;

titleItem.dataset.id = songData[i].song_id //use for other purposes later

titleListNode.append(titleItem)
artistListNode.append(artistItem)
yearListNode.append(yearItem)
genreListNode.append(genreItem)
popularityListNode.append(popularityItem)

}
//display the songs intially sorted by title
//add click handler for current song titles

let songDataTitle = document.querySelectorAll("#titleResultList li")
let arrayToSort = sort(songDataTitle)
titleListNode.innerHTML = ''
   
for (let i = 0; i < arrayToSort.length; i++){
    let newTitleItem = document.createElement("li")
    newTitleItem.innerHTML = arrayToSort[i].innerHTML
    newTitleItem.dataset.id = arrayToSort[i].dataset.id
    titleListNode.appendChild(newTitleItem)
}

songTitleClick(songData, 1)


//add event handler for clearing filter options
const clearButtonNode = document.querySelector("#clearButton")
const filterSearchNode = document.querySelector("#titleSearch")
const filterArtistNode = document.querySelector("#artistSearch")
const filterGenreNode = document.querySelector("#genreSearch")

//default to checked
filterSearchNode.checked = true;
clearButtonNode.addEventListener("click", function(){
  
    if(filterSearchNode.checked){
       filterSearchNode.checked = false;
    }

    if(filterArtistNode.checked){
        filterArtistNode.checked = false;
     }

     if(filterGenreNode.checked){
        filterGenreNode.checked = false;
     }
})

//sorting for title heading
const titleNodeHeader = document.querySelector("#titleHeading")

titleNodeHeader.addEventListener("click", function(){
    //clear the original list
    //then sort it

    titleNodeHeader.style.color = "grey"
    let songDataTitle = document.querySelectorAll("#titleResultList li")
    let newArr = sort(songDataTitle)
    titleListNode.innerHTML = ''
   
    for (let i = 0; i < newArr.length; i++){
        let newItem = document.createElement("li")
        newItem.innerHTML = newArr[i].innerHTML
        newItem.dataset.id = newArr[i].dataset.id
        titleListNode.appendChild(newItem)
    }
    
    songTitleClick(songData, 1)
    setTimeout(function(){titleNodeHeader.style.color = "white"}, 5000)

})

const artistNodeHeader = document.querySelector("#artistHeading")

artistNodeHeader.addEventListener("click", function(){
    //clear the original list
    //then sort it
    artistNodeHeader.style.color = "grey"
    let songDataArtist = document.querySelectorAll("#artistResultList li")
    let newArr = sort(songDataArtist)
    artistListNode.innerHTML = ''

    for (let i = 0; i < newArr.length; i++){
        let newItem = document.createElement("li")
        newItem.innerHTML = newArr[i].innerHTML
        artistListNode.appendChild(newItem)
    }
    
    setTimeout(function(){artistNodeHeader.style.color = "white"}, 5000)

})

const yearNodeHeader = document.querySelector("#yearHeading")

yearNodeHeader.addEventListener("click", function(){
    yearNodeHeader.style.color = "grey"
    let songDataYear = document.querySelectorAll("#yearResultList li")
    let newArr = sort(songDataYear)
    yearListNode.innerHTML = ''

    for (let i = 0; i < newArr.length; i++){
        let newItem = document.createElement("li")
        newItem.innerHTML = newArr[i].innerHTML
        yearListNode.appendChild(newItem)
    }

    setTimeout(function(){yearNodeHeader.style.color = "white"}, 5000)
})

const genreNodeHeader = document.querySelector("#genreHeading")

genreNodeHeader.addEventListener("click", function(){
    genreNodeHeader.style.color = "grey"
    let songDataGenre = document.querySelectorAll("#genreResultList li")
    let newArr = sort(songDataGenre)
    genreListNode.innerHTML = ''

  
    for( let i = 0; i < newArr.length; i++){

        let newItem = document.createElement("li")
        newItem.innerHTML = newArr[i].innerHTML
        genreListNode.appendChild(newItem)
    }

    setTimeout(function(){genreNodeHeader.style.color = "white"}, 5000)
})

const popularityNodeHeader = document.querySelector("#popularityHeading")

popularityNodeHeader.addEventListener("click", function(){
    popularityNodeHeader.style.color = "grey"
    let songDataPopularity = document.querySelectorAll("#popularityResultList li")
    let newArr = sort(songDataPopularity)
    popularityListNode.innerHTML = ''

    for( let i = 0; i < newArr.length; i++){
        let newItem = document.createElement("li")
        newItem.innerHTML = newArr[i].innerHTML
        popularityListNode.appendChild(newItem)
    }

    setTimeout(function(){popularityNodeHeader.style.color = "white"}, 5000)


})


//filter handler stuff
function filterTitle(songData, query) {
    return songData.filter((el) => el.title.toString().toLowerCase().includes(query.toLowerCase()));
  }

function filterArtist(songData, query)  {
    return songData.filter((el) => el.artist.name.toString().toLowerCase().includes(query.toLowerCase()));
}

function filterGenre(songData, query)  {
    return songData.filter((el) => el.genre.name.toString().toLowerCase().includes(query.toLowerCase()));
}

const filterBttnNode = document.querySelector("#applyFilterButton")

filterBttnNode.addEventListener("click", function()
{

if (filterSearchNode.checked && !filterArtistNode.checked && !filterGenreNode.checked){

    const searchQuery = document.querySelector("#titleInput").value
    
    //now an array of filtered song titles
    const searchResult = filterTitle(songData, searchQuery)
   
    titleListNode.innerHTML = ''
    artistListNode.innerHTML = ''
    genreListNode.innerHTML = ''
    yearListNode.innerHTML = ''
    popularityListNode.innerHTML = ''

    for (let i = 0; i < searchResult.length; i++){

     
        let newListItem = document.createElement("li")
        let newListItem2 = document.createElement("li")
        let newListItem3 = document.createElement("li")
        let newListItem4 = document.createElement("li")
        let newListItem5 = document.createElement("li")
        newListItem.textContent = searchResult[i].title
        newListItem.dataset.id = searchResult[i].song_id
        newListItem2.textContent = searchResult[i].artist.name
        newListItem3.textContent = searchResult[i].year
        newListItem4.textContent = searchResult[i].genre.name
        newListItem5.textContent = searchResult[i].details.popularity
        titleListNode.appendChild(newListItem)
        artistListNode.appendChild(newListItem2)
        yearListNode.appendChild(newListItem3)
        genreListNode.appendChild(newListItem4)
        popularityListNode.appendChild(newListItem5)
          
    }
    songTitleClick(songData, 1)
    
}

if (filterArtistNode.checked && !filterSearchNode.checked && !filterGenreNode.checked){

    const selectArtist = document.querySelector("#pickArtist")
    const searchQuery2 = selectArtist.options[selectArtist.selectedIndex].text
    const searchResult2 = filterArtist(songData, searchQuery2)
    artistListNode.innerHTML = ''
    genreListNode.innerHTML = ''
    titleListNode.innerHTML = ''
    yearListNode.innerHTML = ''
    popularityListNode.innerHTML = ''
    for (let i = 0; i < searchResult2.length; i++){

        let newListItem = document.createElement("li")
        let newListItem2 = document.createElement("li")
        let newListItem3 = document.createElement("li")
        let newListItem4 = document.createElement("li")
        let newListItem5 = document.createElement("li")
        newListItem.textContent = searchResult2[i].artist.name
        newListItem2.textContent = searchResult2[i].genre.name
        newListItem3.textContent = searchResult2[i].title
        newListItem3.dataset.id = searchResult2[i].song_id
        newListItem4.textContent = searchResult2[i].year
        newListItem5.textContent = searchResult2[i].details.popularity
        artistListNode.appendChild(newListItem)
        genreListNode.appendChild(newListItem2)
        titleListNode.appendChild(newListItem3)
        yearListNode.appendChild(newListItem4)
        popularityListNode.appendChild(newListItem5)
        
    }

    songTitleClick(songData, 1)
}



if (filterGenreNode.checked && !filterSearchNode.checked && !filterArtistNode.checked){

    const selectGenre = document.querySelector("#pickGenre")
    const searchQuery3 = selectGenre.options[selectGenre.selectedIndex].text
    const searchResult3 = filterGenre(songData, searchQuery3)
    genreListNode.innerHTML = ''
    titleListNode.innerHTML = ''
    artistListNode.innerHTML = ''
    yearListNode.innerHTML = ''
    popularityListNode.innerHTML = ''
    for( let i = 0; i < searchResult3.length; i++){

        let newListItem = document.createElement("li")
        let newListItem2 = document.createElement("li")
        let newListItem3 = document.createElement("li")
        let newListItem4 = document.createElement("li")
        let newListItem5 = document.createElement("li")
        newListItem.textContent = searchResult3[i].genre.name
        newListItem2.textContent = searchResult3[i].title
        newListItem2.dataset.id = searchResult3[i].song_id
        newListItem3.textContent = searchResult3[i].artist.name
        newListItem4.textContent = searchResult3[i].year
        newListItem5.textContent = searchResult3[i].details.popularity
        genreListNode.appendChild(newListItem)
        titleListNode.appendChild(newListItem2)
        artistListNode.appendChild(newListItem3)
        yearListNode.appendChild(newListItem4)
        popularityListNode.appendChild(newListItem5)
    }

    songTitleClick(songData, 1)
}

 })


}










