function temizleMetin(metin) {
  return metin
    .replace(/ç/g, "c").replace(/Ç/g, "C")
    .replace(/ğ/g, "g").replace(/Ğ/g, "G")
    .replace(/ı/g, "i").replace(/İ/g, "I")
    .replace(/ö/g, "o").replace(/Ö/g, "O")
    .replace(/ş/g, "s").replace(/Ş/g, "S")
    .replace(/ü/g, "u").replace(/Ü/g, "U");
}

async function getWeather() {
  const rawCity = document.getElementById('cityInput').value;
  const city = temizleMetin(rawCity.trim());
  const apiKey = 'e506483ba0c0ce4043ce571a6e4a0d74';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=tr&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("API yanıtı:", data);

    if (data.cod === 200) {
      document.getElementById('result').innerHTML = `
        <h2>${data.name} (${data.sys.country})</h2>
        <p>Sıcaklık: ${data.main.temp}°C</p>
        <p>Hava: ${data.weather[0].description}</p>
      `;
    } else {
      document.getElementById('result').innerText = 'Şehir bulunamadı.';
    }
  } catch (error) {
    console.error("Hata:", error);
    document.getElementById('result').innerText = 'Veri alınırken hata oluştu.';
  }
}