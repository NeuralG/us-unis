let unis = []

async function getFromAPI(page){

    const apiKey = "8MJM1h6lM4EYolu3CgqnydvwdJY5kr8I6OaigPeG"
    const fields = "latest.school.name" //take the datas that batu wants 

    const data = await fetch(`https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${apiKey}&fields=${fields}&page=${page}`) 
    return data.json()
}

for(let i=0;i<2;i++){ //insert i<2 with i<page_count

    const data = await getFromAPI(i)

    for(let a=0;a<20;a++){
        unis.push(await data.results[a])
    }
    
}

console.log(unis) //display them to DOM



