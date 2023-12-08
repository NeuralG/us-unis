const uniCountEl = document.getElementById("uni-count")
const submitEl = document.getElementById("submit")
const nullDataEl = document.getElementById("displayNull")

const uniListEl = document.getElementById("uni-list")

uniCountEl.addEventListener("keydown",function(event){
    if (event.key === "Enter"){
        let uni_count = uniCountEl.value
        let displayNullBool = nullDataEl.checked
        uniListEl.innerHTML = ""
        displayer(uni_count,displayNullBool)
    }
})

submitEl.addEventListener("click",function(){
    let uni_count = uniCountEl.value
    let displayNullBool = nullDataEl.checked
    uniListEl.innerHTML = ""
    displayer(uni_count,displayNullBool)
})

async function getFromAPI(page){

    const apiKey = "8MJM1h6lM4EYolu3CgqnydvwdJY5kr8I6OaigPeG"
    const fields = `latest.school.name,latest.cost.net_price.public,latest.cost.net_price.private,latest.admissions.sat_scores.average.overall,latest.admissions.admission_rate.overall,latest.earnings.1_yr_after_completion.median,school_url,latest.admissions.act_scores.midpoint.cumulative,school.school_url` 
    
    const data = await fetch(`https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${apiKey}&fields=${fields}&page=${page}$per_page=1`) 
    return data.json()                    
}

async function displayer(uni_count,displayNullBool){

let unis = []


for(let i=0;i<uni_count;i++){

    const data = await getFromAPI(i)
    unis.push(await data.results[0])
    
}

console.log(unis[0])


class University {
    constructor(name, schoolURL,admissionRate, medianSalary, costsPublic, costsPrivate, averageSAT, averageACT){
        this.name = name
        this.admissionRate = admissionRate
        this.medianSalary = medianSalary
        this.costsPublic = costsPublic
        this.costsPrivate = costsPrivate
        this.averageSAT = averageSAT
        this.averageACT = averageACT

        this.schoolURL = schoolURL
        this.schoolURL = (this.schoolURL.includes("https://") ? this.schoolURL : "https://" + this.schoolURL)
        
    }

    get output(){
        let result = `
        <div class="uni">

            <div class="uni-leftside">
                <h1><a target="_blank" href="${this.schoolURL}">${this.name}</a></h1>
                <div class="uni-infos">
                    <h3>Admission rate: ${this.admissionRate*100}%</h3>
                    <h3>Median salary of graduates after 1 year: ${this.medianSalary}</h3>
                    <h3>Average SAT Score : ${this.averageSAT}</h3>
                    <h3>Average ACT Score : ${this.averageACT}</h3>
                </div>
            </div>
            <ul class="uni-costs">
                <br><br>
                <li>0$-30000$ : ${this.costsPublic[0] ? this.costsPublic[0] : this.costsPrivate[0]}$ </li>
                <li>30000$-48000$ : ${this.costsPublic[1] ? this.costsPublic[1] : this.costsPrivate[1]}$</li>
                <li>48000$-75000$ : ${this.costsPublic[2] ? this.costsPublic[2] : this.costsPrivate[2]}$</li>
                <li>75000$-110000$ : ${this.costsPublic[3] ? this.costsPublic[3] : this.costsPrivate[3]}$</li>
                <li>110000$+ : ${this.costsPublic[4] ? this.costsPublic[4] : this.costsPrivate[4]}$</li>
            </ul>


        </div>
        `
        return result
    }
}


for (let i=0;i<unis.length;i++){

    let uniName = JSON.stringify(Object.entries(unis[i])[0][1]).replaceAll('"','')
    let admissionRate = JSON.stringify(Object.entries(unis[i])[2][1])
    let medianSalary = JSON.stringify(Object.entries(unis[i])[3][1])
    let averageSAT = JSON.stringify(Object.entries(unis[i])[1][1])
    let averageACT = JSON.stringify(Object.entries(unis[i])[4][1])

    let schoolUrl = JSON.stringify(Object.entries(unis[i])[21][1]).replaceAll('"','')
    let costsPublic = [JSON.stringify(Object.entries(unis[i])[5][1]),JSON.stringify(Object.entries(unis[i])[6][1]),JSON.stringify(Object.entries(unis[i])[7][1]),JSON.stringify(Object.entries(unis[i])[8][1]),JSON.stringify(Object.entries(unis[i])[9][1])] 
    let costsPrivate = [JSON.stringify(Object.entries(unis[i])[13][1]),JSON.stringify(Object.entries(unis[i])[14][1]),JSON.stringify(Object.entries(unis[i])[15][1]),JSON.stringify(Object.entries(unis[i])[16][1]),JSON.stringify(Object.entries(unis[i])[17][1])] 
    
    const uni = new University(uniName,schoolUrl,admissionRate,medianSalary,costsPublic,costsPrivate,averageSAT,averageACT)

    if(displayNullBool){
        uniListEl.innerHTML += uni.output
    }
    else{
        if (uniName != "null" && admissionRate != "null" && medianSalary != "null" && averageSAT != "null" && averageACT != "null" && schoolUrl != "null"){
            uniListEl.innerHTML += uni.output
        }
    } 
    

}

 

 
}
