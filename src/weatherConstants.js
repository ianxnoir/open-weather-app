export const weatherCategories = {
    thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
    drizzleRain: [300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
    snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
    atmosphere: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
    clearCalm: [800, 951],
    clouds: [801, 802, 803, 804],
    windy: [900, 901, 902, 903, 904, 905, 906, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962],
    hail: [906],
  };
  
  export const categoryBackgrounds = {
    thunderstorm: '/images/thunderstorm.gif',
    drizzleRain: '/images/drizzle_rain.gif',
    snow: '/images/snow.gif',
    atmosphere: '/images/mist.gif',
    clearCalm: '/images/clear.gif',
    clouds: '/images/clouds.gif',
    windy: '/images/windy.gif',
    hail: '/images/hail.gif',
  };
  
  export const categoryBackgroundsUrl = {
    thunderstorm: 'url(/images/thunderstorm.gif)',
    drizzleRain: 'url(/images/drizzle_rain.gif)',
    snow: 'url(/images/snow.gif)',
    atmosphere: 'url(/images/mist.gif)',
    clearCalm: 'url(/images/clear.gif)',
    clouds: 'url(/images/clouds.gif)',
    windy: 'url(/images/windy.gif)',
    hail: 'url(/images/hail.gif)',
  };

  
  export const getWeatherCategory = (conditionCode) => {
    for (const [category, codes] of Object.entries(weatherCategories)) {
      if (codes.includes(conditionCode)) {
        return category;
      }
    }
    return 
  };
  