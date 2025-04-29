    document.addEventListener("DOMContentLoaded", () => {
        const API_KEY = "473936e942a74fc2b9f172810252804"; 
        const city = "Panevezys";
    
        const cityElem = document.querySelector("h1");
        const dateElem = document.querySelector(".topHead p");
        const conditionImage = document.querySelector(".bigImage img");
        const tempElem = document.querySelector(".leftHead span");
        const detailsElem = document.querySelector("header > div:last-of-type");
        const cards = document.querySelectorAll(".card");
    
        async function fetchWeather(city) {
            try {
                const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`);
                if (!res.ok) throw new Error("Tinklo klaida arba blogas API raktas");
    
                const data = await res.json();
    
                
                const location = `${data.location.name}, ${data.location.region}`;
                const condition = data.current.condition.text;
                const tempC = Math.round(data.current.temp_c);
                const icon = "https:" + data.current.condition.icon;
                const humidity = data.current.humidity;
                const wind = `${data.current.wind_mph}mph ${data.current.wind_dir}`;
                const precip = data.current.precip_in > 0 ? `${Math.round(data.current.precip_in * 10)}%` : "0%";
    
                cityElem.textContent = location;
    
                const today = new Date(data.location.localtime);
                const options = { weekday: 'long', month: 'long', day: 'numeric' };
                const dateFormatted = today.toLocaleDateString('en-US', options);
    
                dateElem.innerHTML = `${dateFormatted}<br>${condition}`;
                conditionImage.src = icon;
                conditionImage.alt = condition;
                tempElem.innerHTML = `${tempC}<sup>&deg;C</sup>`;
    
                detailsElem.innerHTML = `
                    Precipitation: ${precip}<br>
                    Humidity: ${humidity}%<br>
                    Wind: ${wind}<br>
                    Pollen Count: 36
                `;
    
                data.forecast.forecastday.forEach((day, index) => {
                    if (index >= cards.length) return;
    
                    const card = cards[index];
                    const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' });
                    const iconURL = "https:" + day.day.condition.icon;
                    const maxTemp = Math.round(day.day.maxtemp_c);
                    const minTemp = Math.round(day.day.mintemp_c);
    
                    card.children[0].textContent = index === 0 ? "Today" : dayName;
                    card.querySelector("img").src = iconURL;
                    card.querySelector("img").alt = day.day.condition.text;
                    card.querySelector(".dayTemp").innerHTML = `${maxTemp}&deg;`;
                    card.querySelector(".nightTemp").innerHTML = `${minTemp}&deg;`;
                    card.children[3].textContent = `Pollen 36`; 
                });
    
            } catch (error) {
                console.error("Nepavyko gauti orų duomenų:", error);
            }
        }
    
        fetchWeather(city);
    });
    