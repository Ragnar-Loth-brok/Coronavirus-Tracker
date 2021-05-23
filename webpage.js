const UI = {
    cssEffects: function(){
        const search = document.querySelector('.banner button');
        const bg = document.querySelector('.banner .background');
        const banner = document.querySelector('.banner');
        const input = document.querySelector('.banner input')

        search.addEventListener('click', ()=>{

            search.setAttribute('class', 'clicked');
            input.setAttribute('class', 'growInput');


            setTimeout(()=>{
            bg.setAttribute('class','background active');
            
            banner.style.boxShadow = '0 0px 50px -5px #aaa';
            }, 500);
        })

        input.addEventListener('input', e => {
            e.preventDefault();

            if(e.target.value.length > 2) fetchInfo.filterData(e.target.value.trim());

        })
    } 
} 


UI.cssEffects();


const fetchInfo = {
    getData: async function(){

        try{
            const jsonData = await fetch('https://api.covid19api.com/summary')
            const jsData = await jsonData.json();

            console.log(jsData);

            return jsData;
        } catch(error){
            return false;
        }
        
    },

    filterData: function(country){

        country = country.toLowerCase();
        let match = false;

        this.getData().then((jsdata) => {

            if(jsdata){
                jsdata.Countries.forEach((eachOne) =>{

                    if (eachOne.Country.toLowerCase().includes(country)) {
                        match = true;
                        return this.updateData(eachOne);
                    }

                })
                
                if(!match){
                    console.log('Result Not Found');
            }
        }
    })    
        

    },

    updateData: function(data){

        const totalCases = document.querySelector('.tC');
        const totalRecover = document.querySelector('.tR');
        const newCases = document.querySelector('.nC');
        const totalDeath = document.querySelector('.tD');
        const countryName = document.querySelector('.cName');


        totalCases.innerHTML = data.TotalConfirmed;
        totalRecover.innerHTML = data.TotalRecovered;
        newCases.innerHTML = data.NewConfirmed;
        totalDeath.innerHTML = data.TotalDeaths;
        countryName.innerHTML = data.Country;
    }


}
