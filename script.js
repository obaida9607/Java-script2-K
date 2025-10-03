
const select = document.getElementById("region");
const knapp = document.getElementById("hamta");
const resultat = document.getElementById("resultat");


knapp.addEventListener("click", function() {
  const region = select.value; 
  const url = "https://restcountries.com/v3.1/region/" + region;

  resultat.innerHTML = "<p>Laddar...</p>";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      resultat.innerHTML = ""; 

      
      for (let i = 0; i < data.length; i++) {
        const land = data[i];

        
        const div = document.createElement("div");
        div.className = "flaggkort";

        div.innerHTML = `
          <img src="${land.flags.png}" alt="flagga">
          <div class="info">
            <p><b>Land:</b> ${land.name.common}</p>
            <p><b>Huvudstad:</b> ${land.capital ? land.capital[0] : "Ingen huvudstad"}</p>
            <p><b>Invånare:</b> ${land.population.toLocaleString()}</p>
          </div>
        `;

        
        div.addEventListener("click", function() {
          const info = div.querySelector(".info");
          if (info.style.display === "block") {
            info.style.display = "none";
          } else {
            info.style.display = "block";
          }
        });

        resultat.appendChild(div);
      }
    })
    .catch(err => {
      resultat.innerHTML = "<p>Kunde inte hämta data</p>";
      console.log(err);
    });
});
