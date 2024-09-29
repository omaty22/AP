const weatherform=document.querySelector(".weatherform");
const cityinput=document.querySelector(".cityinput");
const card=document.querySelector(".card");
const apikey = "83bb2b0c7cb7cd6b7bd2a0a3a1f9801e";

weatherform.addEventListener("submit",async  event => {
    event.preventDefault();
    const city = cityinput.value;    

    if(city){
        try{
            const weatherdata = await getWeatherdata(city);
            displayweatherdata(weatherdata);
        }
        catch(error){
            displayerror(error.message);
    }
    }
    else{
        displayerror("Please enter a city name");
    }
});

async function getWeatherdata(city) {
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

    const response = await fetch(apiurl);
    if(!response.ok){
        throw new Error("City not found");
    }
    else{
        const data = await response.json();
        return data;
    }
};

function displayweatherdata(data) {
    const{name:city,
        main:{temp,humidity},
        weather:[{description , id}]}=data;

    card.textContent="";
    card.style.display ="flex";

    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");
    
    citydisplay.textContent=city;
    tempdisplay.textContent=`Temperature: ${(temp -273.15).toFixed(1)}°C`;
    humiditydisplay.textContent=`Humidity: ${humidity}%`;
    weatheremoji.textContent=getweatheremoji(id);
    descdisplay.textContent=description;

    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    humiditydisplay.classList.add("humiditydisplay");
    weatheremoji.classList.add("weatheremoji");
    descdisplay.classList.add("descdisplay");

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(weatheremoji);
    card.appendChild(descdisplay);
    
};

function getweatheremoji(id) {
    if(id>=200 && id<300){
        return "⛈️";
    }
    else if(id>=300 && id<400){
        return "🌧️";
    }
    else if(id>=500 && id<600){
        return "🌧️";
    }
    else if(id>=600 && id<700){
        return "❄️";
    }
    else if(id>=700 && id<800){
        return "🌫️";
    }
    else if(id==800){
        return "☀️";
    }
    else if(id>800){
        return "☁️";
    }
    else{
        return "🤷";
    }
//switch case te kullanılabilirdi (switch(true))
};

function displayerror(message) {
    const errordisplay =document.createElement("p");
    errordisplay.textContent=message;
    errordisplay.classList.add("error");

    card.textContent="";
    card.style.display ="flex";
    card.appendChild(errordisplay);
};

