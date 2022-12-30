export function GenerateAuthHeader(username, token) {
    console.log(token)
    const accessHeaderTemplate = {
        u: "username",
        t: "token",
    }

    const accessHeader = Object.create(accessHeaderTemplate);
    accessHeader.u = username
    accessHeader.t = token.token

    let stringifiedHeader = JSON.stringify(accessHeader)
    console.log(stringifiedHeader)
    return btoa(stringifiedHeader)
}

export function SimpleHash(str) {
    var hash = 0,
      i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

export function formatDuration (milliseconds) {
    var time = { y: 31536000000, d: 86400000, h: 3600000, m: 60000, s: 1000, ms: 1 },
        res = [];
  
    if (milliseconds === 0) return '0 ms';
    
    for (var key in time) {
      if (milliseconds >= time[key]) {
        var val = Math.floor(milliseconds/time[key]);
        res.push(val += '' + key);
        milliseconds = milliseconds % time[key];
      }
    }
   
    return res.length > 1 ? res.join(', ').replace(/,([^,]*)$/,' and'+'$1') : res[0]
  }