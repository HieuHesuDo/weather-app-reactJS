import { useState } from "react";

const api = {
  key: "6e228cc1bc1ae17c41dad73719cd3155",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let days = [
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
      "Chủ Nhật",
    ];
    let months = [
      "tháng 1",
      "tháng 2",
      "tháng 3",
      "tháng 4",
      "tháng 5",
      "tháng 6",
      "tháng 7",
      "tháng 8",
      "tháng 9",
      "tháng 10",
      "tháng 11",
      "tháng 12",
    ];

    let day = days[d.getDay() - 1];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} năm ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.weather[0].main === "Rain"
            ? "app rain"
            : weather.weather[0].main === "Clouds"
            ? "app clouds"
            : weather.weather[0].main === "Sunny"
            ? "app sunny"
            : weather.weather[0].main === "Snow"
            ? "app snow"
            : weather.weather[0].main === "Clear"
            ? "app clear"
            : ""
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°</div>
              <div className="weather">
                {weather.weather[0].main === "Rain"
                  ? "Trời mưa"
                  : weather.weather[0].main === "Clouds"
                  ? "Có mây"
                  : weather.weather[0].main === "Sunny"
                  ? "Trời Nắng"
                  : weather.weather[0].main === "Snow"
                  ? "Tuyết rơi"
                  : weather.weather[0].main === "Clear"
                  ? "Trời quang"
                  : ""}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
