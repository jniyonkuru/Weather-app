
const searchBox=document.querySelector('.search input');
const searchButton=document.querySelector('.search button');
const weatherIcon=document.querySelector('.weather-icon');
    async function getWeatherData(){
        const apiUrl='https://api.weatherapi.com/v1/forecast.json?';
        const apiKey='414893b50f314024b8540738232907';
        const response=  await fetch(apiUrl+`key=${apiKey}`+`&q=${searchBox.value}&days=7`);
        document.querySelector('.loader').style.display='none';
        if(response.status==400){
            document.querySelector('.message').style.display='block';
            document.querySelector('.weather').style.display='none';
        }else{
           document.querySelector('.card').style.display='block';
           document.querySelector('.weather').style.display='flex';
           document.querySelector('.message').style.display='none';
           const data= await response.json();
           console.log(data);
           const currentData={};
           currentData.name=data.location.name;
           currentData.tempC= Math.round(data.current.temp_c);
           currentData.tempF=data.current.temp_f;
           currentData.humidity=data.current.humidity;
           currentData.windSpeed=data.current.wind_kph;
           currentData.country=data.location.country;
           currentData.text=data.current.condition.text;
           document.querySelector('.location').innerHTML=`${currentData.country},${currentData.name}`
           document.querySelector('.temp').innerHTML=currentData.tempC+'°C';
           document.querySelector('.condition').innerHTML=currentData.text;
           document.querySelector('.humidity').innerHTML=currentData.humidity+'%';
           document.querySelector('.wind').innerHTML=currentData.windSpeed+' kph';
           if(currentData.text=='Partly cloudy'){
            weatherIcon.src='./images/clouds.png';
           
           }else if(currentData.text=='Sunny'){
               weatherIcon.src='./images/clear.png';
           }else if(currentData.text=='Overcast'){
               weatherIcon.src='./images/drizzle.png';
           
           }else if(currentData.text=='Rainy'){
               weatherIcon.src='./images/rain.png';
           }else if(currentData.text=='Light rain'){
            weatherIcon.src='./images/rain.png';
           }
           
           };
        }
        searchButton.addEventListener('click',(e)=>{
            document.querySelector('.search').style.display='none';
            document.querySelector('.card').style.display='none';
            document.querySelector('.loader').style.display='block';    
             let  time=setTimeout(getWeatherData,2000);
           });
        




