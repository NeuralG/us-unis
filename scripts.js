let unis = []

async function getFromAPI(page){

    const apiKey = "8MJM1h6lM4EYolu3CgqnydvwdJY5kr8I6OaigPeG"
    const fields = `latest.school.name,latest.cost.net_price.public,latest.cost.net_price.private,latest.admissions.sat_scores.average.overall,latest.admissions.admission_rate.overall,latest.earnings.1_yr_after_completion.median,school_url,latest.admissions.act_scores.midpoint.cumulative` 
    
    const data = await fetch(`https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${apiKey}&fields=${fields}&page=${page}`) 
    return data.json()                    
}

for(let i=0;i<1;i++){ //insert i<2 with i<page_count

    const data = await getFromAPI(i)

    for(let a=0;a<20;a++){
        unis.push(await data.results[a])
    }
    
}

const uniListEl = document.getElementById("uni-list")

for (let i=0;i<10;i++){

    let uniName = JSON.stringify(Object.entries(unis[i])[0][1])
    let admissionRate = JSON.stringify(Object.entries(unis[i])[2][1])
    let medianSalary = JSON.stringify(Object.entries(unis[i])[3][1])
    let costs; //code costs later on

    uniListEl.innerHTML += `<a>${uniName} ${admissionRate} ${medianSalary}</a>`
    
}
 

