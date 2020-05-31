import React, { Component } from 'react';
import Hls from 'hls.js';

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
    this.state = {};
  }

  componentDidMount = () => {
    const audio = this.player.current;
    // const streamURL =
    //   ' https://kukufm.s.llnwi.net/audio/998ea6fb-31fa-4e80-b6e0-3562e3d5f187.m3u8';
    // const streamURL =
    //   'https://kukufm.s.llnwi.net/audio/998ea6fb-31fa-4e80-b6e0-3562e3d5f187.m4a';
    const streamURL =
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

    let playType = streamURL.split('.');

    if (
      playType[playType.length - 1] == 'm3u8' ||
      playType[playType.length - 1] == 'm3u'
    ) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(streamURL);
        hls.attachMedia(audio);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log(audio.src, 'audio src');
          audio.play();
        });
      } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
        audio.src = streamURL;
        //this.setState({ playLink: streamURL });
        audio.addEventListener('loadedmetadata', () => {
          audio.play();
        });
      }
    } else {
      console.log(playType[playType.length - 1]);
      console.log(streamURL, 'audio src');
      audio.src = streamURL;
      if (audio.autoplay) {
        audio.play();
      }
      //this.setState({ playLink: streamURL });
    }
  };

  render() {
    console.log(this.player, 'player');
    return <audio ref={this.player} autoPlay={false} controls={true} />;
  }
}
