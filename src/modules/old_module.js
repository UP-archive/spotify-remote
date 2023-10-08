const authUrl = 'https://accounts.spotify.com/authorize'
const client_id = '46619c34676040e69434d4545ff78ec9'
const redirect_uri = 'https://spotify.000198.xyz/'
const scope = [
  'ugc-image-upload',
  'user-read-recently-played',
  'user-top-read',
  'user-read-playback-position',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'app-remote-control',
  'streaming',
  'playlist-modify-public',
  'playlist-modify-private',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-follow-modify',
  'user-follow-read',
  'user-library-modify',
  'user-library-read',
  'user-read-email',
  'user-read-private',
]
const params = {
  response_type: 'token',
  state: Date.now().toString(16),
  show_dialog: true,
  client_id,
  scope,
  redirect_uri,
}
const queryString = Object.keys(params)
  .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  .join('&')
//?========== ========== ========== ========== ========== ========== ========== ========== ========== ==========
var access_token = window.localStorage.getItem('access_token')
var token_type = window.localStorage.getItem('token_type')
var expire_time = window.localStorage.getItem('expire_time')
if (
  !access_token ||
  `${access_token}` === 'undefined' ||
  expire_time <= Date.now()
) {
  const hashParams = {}
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1)
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2])
  }
  window.location.hash = ''
  if (hashParams.state) {
    window.localStorage.setItem('access_token', hashParams.access_token)
    window.localStorage.setItem('token_type', hashParams.token_type)
    window.localStorage.setItem(
      'expire_time',
      Date.now() + hashParams.expires_in * 1000
    )
    window.location.href = '/'
  }
  $('#login').show()
} else {
  $('#logout').show()
  var x = setInterval(function () {
    var expires_in = ((expire_time - Date.now()) / 1000).toFixed()
    $('#time').html(`Access Token Expires in : ${expires_in} sec`)
    if (expires_in < 0) {
      clearInterval(x)
      location.reload()
    }
    expires_in--
  }, 1000)
}
//?========== ========== ========== ========== ========== ========== ========== ========== ========== ==========
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function SecToMin(sec) {
  var mins = Math.floor(sec / 60)
  var secs = Math.floor(sec - mins * 60)
  if (secs < 10) {
    secs = '0' + secs
  }
  if (mins < 10) {
    mins = '0' + mins
  }
  return mins + ':' + secs
}
const currentData = (data, position) => {
  let idx = data.findIndex((s) => s.start > position / 1000)
  return idx !== -1 ? idx : data.length
}

function play(device_id) {
  $.ajax({
    url: 'https://api.spotify.com/v1/me/player',
    type: 'PUT',
    data: JSON.stringify({
      device_ids: [device_id],
      play: true,
    }),
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + access_token)
    },
    success: function (data) {
      console.log(data)
    },
  })
}
$('#login').click(function () {
  window.location.href = `${authUrl}?${queryString}`
})
$('#logout').click(function () {
  localStorage.clear()
  window.location.href = '/'
})

window.onSpotifyPlayerAPIReady = () => {
  if (!access_token || `${access_token}` === 'undefined') return
  var keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  var modes = ['Minor', 'Major']
  var current_track = ''
  var current_features
  var current_analysis
  const player = new Spotify.Player({
    name: 'katsurai.wav',
    getOAuthToken: (cb) => {
      cb(access_token)
    },
  })
  player.on('initialization_error', (e) => console.error(e))
  player.on('authentication_error', (e) => console.error(e))
  player.on('account_error', (e) => console.error(e))
  player.on('playback_error', (e) => console.error(e))
  player.on('player_state_changed', (state) => {
    console.log('player_state_changed : ', state)
    $('#dur').attr({
      max: state.duration,
    })
    document.getElementsByTagName('title')[0].innerHTML =
      state.track_window.current_track.name + ' | Spotify Playback SDK'

    $('#current-track-context').text(
      `Playing From ${state.context.metadata.context_description}`
    )
    $('#current-track').attr(
      'src',
      state.track_window.current_track.album.images[0].url
    )
    $('#current-track-name').text(`${state.track_window.current_track.name}`)
    $('#current-track-album').text(
      `${state.track_window.current_track.album.name}`
    )
    $('#current-track-artists').text(
      `${state.track_window.current_track.artists
        .map((a) => a.name)
        .join(', ')}`
    )
    $('#current-track-time').text(
      `${SecToMin(state.position / 1000)}/${SecToMin(state.duration / 1000)}`
    )

    var repeat_icon
    switch (state.repeat_mode) {
      case 0:
        repeat_icon = 'âž¡'
        break
      case 1:
        repeat_icon = 'ðŸ”'
        break
      case 2:
        repeat_icon = 'ðŸ”‚'
        break
    }
    $('#current-track-info').text(
      `${state.paused ? 'â¸' : 'â¯'} ${
        state.shuffle ? 'ðŸ”€' : 'âž¡'
      } ${repeat_icon}`
    )
    $('#current-track-quality').text(`Quality : ${state.playback_quality}`)

    if (current_track != state.track_window.current_track.id) {
      current_track = state.track_window.current_track.id
      fetch(`https://api.spotify.com/v1/audio-features/${current_track}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      }).then((response) =>
        response.json().then((data) => {
          console.log('audio-features', data)
          current_features = data
        })
      )
      fetch(`https://api.spotify.com/v1/audio-analysis/${current_track}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      }).then((response) =>
        response.json().then((data) => {
          console.log('audio-analysis', data)
          current_analysis = data
        })
      )
    }
  })
  var t_shuffle = true,
    t_repeat = 'track'
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id)
    play(device_id)
    $('#shuffle').click(function () {
      $.ajax({
        url: `https://api.spotify.com/v1/me/player/shuffle?state=${t_shuffle}&device_id=${device_id}`,
        type: 'PUT',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + access_token)
        },
        success: function (data) {
          console.log(data)
        },
      })

      if (t_shuffle) {
        t_shuffle = false
      } else {
        t_shuffle = true
      }
    })

    $('#repeat').click(function () {
      $.ajax({
        url: `https://api.spotify.com/v1/me/player/repeat?state=${t_repeat}&device_id=${device_id}`,
        type: 'PUT',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + access_token)
        },
        success: function (data) {
          console.log(data)
        },
      })
      if (t_repeat == 'off') {
        t_repeat = 'track'
      } else if (t_repeat == 'track') {
        t_repeat = 'context'
      } else {
        t_repeat = 'off'
      }
    })

    var beat = 0
    var bar = 0
    window.setInterval(() => {
      player.getVolume().then((volume) => {
        $('#volume_bar').val(volume * 100)
      })
      player.getCurrentState().then((state) => {
        if (!state) return
        $('#dur').val(state.position)
        $('#current-track-time').text(
          `${SecToMin(state.position / 1000)}/${SecToMin(
            state.duration / 1000
          )}`
        )
        if (current_features) {
          $('#current-track-features').text(
            `ðŸ¥ ${Math.round(current_features.tempo)} (${
              current_features.time_signature
            }/4) ðŸŽ¹ ${keys[current_features.key]} ${
              modes[current_features.mode]
            } ðŸ•º ${Math.round(
              current_features.danceability * 100
            )} âš¡ ${Math.round(current_features.energy * 100)}`
          )
        }
        if (current_analysis) {
          var c_beat = currentData(current_analysis.beats, state.position)
          var c_bar = currentData(current_analysis.bars, state.position)
          var c_section = currentData(current_analysis.sections, state.position)
          var c_segment = currentData(current_analysis.segments, state.position)
          var c_tatum = currentData(current_analysis.tatums, state.position)
          var beat_room = (c_beat - 1) % current_features.time_signature
          var room = []
          if (current_features.time_signature == 4) {
            room = [
              'ðŸŸ¢ âš«ï¸ âš«ï¸ âš«ï¸',
              'ðŸŸ¢ ðŸŸ¢ âš«ï¸ âš«ï¸',
              'ðŸŸ¢ ðŸŸ¢ ðŸŸ¢ âš«ï¸',
              'ðŸŸ¢ ðŸŸ¢ ðŸŸ¢ ðŸŸ¡',
            ]
          } else if (current_features.time_signature == 3) {
            room = ['ðŸŸ¢ âš«ï¸ âš«ï¸', 'ðŸŸ¢ ðŸŸ¢ âš«ï¸', 'ðŸŸ¢ ðŸŸ¢ ðŸŸ¡']
          }
          $('#current-track-analysis').text(
            `${room[beat_room] ? room[beat_room] : 'ðŸ”µðŸ”µðŸ”µðŸ”µ'}`
          )
          if (c_bar != bar) {
            bar = c_bar
          }
          if (c_beat != beat) {
            beat = c_beat
            if (socket_is_connect) {
              var hsv = randomNum(0, 359)
              var cmd = `{"id":1,"method":"set_hsv","params":[${hsv}, 100, "smooth", 200]}` //sudden smooth
              socket.emit('cmd', cmd)

              $('#led_status').text(`Yeelight command : ${cmd}`)
              $('#led_status').css({
                'background-color': `hsl(${hsv}, 100%, 50%)`,
              })
            }
          }
        }
      })
    }, 50)
  })
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID is not ready for playback', device_id)
  })
  player.connect().then((success) => {
    if (success) {
      console.log('The Web Playback SDK successfully connected to Spotify!')
    }
  })
  $('#volume_bar').on('input change', function () {
    player.setVolume($('#volume_bar').val() / 100)
  })
  $('#dur').on('input change', () => {
    player.seek($('#dur').val())
  })
  $('#pause').click(function () {
    player.pause()
  })
  $('#resume').click(function () {
    player.resume()
  })
  $('#togglePlay').click(function () {
    player.togglePlay()
  })
  $('#previousTrack').click(function () {
    player.previousTrack()
  })
  $('#nextTrack').click(function () {
    player.nextTrack()
  })
}
//?========== ========== ========== ========== ========== ========== ========== ========== ========== ==========
