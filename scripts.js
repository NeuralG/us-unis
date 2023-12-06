fetch('https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=8MJM1h6lM4EYolu3CgqnydvwdJY5kr8I6OaigPeG')
.then(data => data.json())
.then(response => {
    console.log(response)

    let uniNames = []
    let uniPrices = []

    //20 den çok üni sorunununu çöz
    //veriyi kısıtla napıyım only woman verisini 
    //excele at
    //rank bul

    for (var i=0;i<20;i++){
        let uniName = response.results[i].school.name
        let uniPrice = response.results[i].latest.cost.attendance.academic_year

        uniNames.push(uniName)
        uniPrices.push(uniPrice)

        console.log(`School name is: ${response.results[i].school.name} and the price is ${response.results[i].latest.cost.attendance.academic_year}`)
    }
    
})