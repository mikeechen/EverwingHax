const rp = require('request-promise');

const options = {
  uri: 'https://wintermute-151001.appspot.com/game/state/everwing/default/1281334205327861',
  json: true
};

async function doDathing() {
  try {
    const data = await rp(options);
    const state = JSON.parse(data.state);
    const tokenOptions = {
      uri: 'https://wintermute-151001.appspot.com/game/session/everwing/1281334205327861',
      json: true
    };

    state.instances = state.instances.map(elm => {
      if (elm.modelID === 'Currency:coin') {
        elm.value = 999999;
      }

      if (elm.modelID === 'Currency:trophy') {
        elm.value = 99999;
      }

      if (elm.modelID.indexOf('sidekick') > 0) {
        elm.stats.maturity = 3;
        elm.stats.xp = 239400;
      }

      // if (elm.modelID === 'Item:player') {
      //   // console.log(elm);
      //   // console.log(new Date(elm.createdTime));
      //   elm.stats.xp = 500000;
      //   elm.stats.lastClaimedLevel = 32;
      // }
      //
      // if (elm.modelID === 'Item:jade') {
      //   elm.state = 'idle';
      //   elm.stats.level = 50;
      // }
      return elm;
    });
    console.log(state);

    const token = (await rp(tokenOptions)).token;

    console.log(token);

    data.state = JSON.stringify(state);

    data.timestamp = Math.round(await rp('https://wintermute-151001.appspot.com/game/time'));
    data.server_timestamp = Math.round(await rp('https://wintermute-151001.appspot.com/game/time'));

    const postOp = {
      method: 'POST',
      uri: 'https://wintermute-151001.appspot.com/game/action',
      headers: {
        "Host": "wintermute-151001.appspot.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json;charset=utf-8",
        "x-wintermute-session": token,
        "Connection": "keep-alive"
      },
      body: data,
      json: true
    }

    console.log(data);

    const posted = await rp(postOp);

    console.log(posted);
  } catch (e) {
    console.log(e);
  }
}

doDathing();

// rp(options)
//   .then(data => {
//     const state = JSON.parse(data.state);
//     state.instances = state.instances.map(elm =>{
//       if (elm.modelID === 'Currency:coin') {
//         elm.value = 400000;
//       }
//       return elm;
//     });
//     console.log(state);
//
//     let token = '';
//     const tokenop = {
//       uri: 'https://wintermute-151001.appspot.com/game/session/everwing/1281334205327861',
//       json: true
//     };
//
//     rp(tokenop)
//       .then(dat => {
//         token = dat.token;
//       });
//
//     data.state = JSON.stringify(state);
//     // user_data['timestamp'] = round(float(get('https://wintermute-151001.appspot.com/game/time').content),
//     //                                  ndigits=0)
//     //   user_data['server_timestamp'] = round(
//     //       float(get('https://wintermute-151001.appspot.com/game/time').content), ndigits=0)
//
//     rp('https://wintermute-151001.appspot.com/game/time')
//       .then(time => {
//         console.log(time);
//         data.timestamp = Math.round(time);
//       });
//
//     rp('https://wintermute-151001.appspot.com/game/time')
//       .then(time => {
//         console.log(time);
//         data.server_timestamp = Math.round(time)
//       });
//
//
//     const postOp = {
//       uri: 'https://wintermute-151001.appspot.com/game/action',
//       headers: {
//         "Host": "wintermute-151001.appspot.com",
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0",
//         "Accept": "application/json, text/plain, */*",
//         "Accept-Language": "en-US,en;q=0.5",
//         "Accept-Encoding": "gzip, deflate, br",
//         "Content-Type": "application/json;charset=utf-8",
//         "x-wintermute-session": token,
//         "Connection": "keep-alive"
//       },
//       data: data
//     }
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });
