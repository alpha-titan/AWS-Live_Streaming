
import React, { useEffect } from "react";
import videojs from "video.js";
import Head from "next/head";

//  playback url
const defaultPlaybackUrl =
  "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8";

function IVSPlayer({ src, handleQuizEvent }) {
  useEffect(() => {
    // source stream url 
    const PLAYBACK_URL = src ?? defaultPlaybackUrl;

    // Amazon IVS  video.js  playback tech .
    window.registerIVSTech(videojs);
    // IVS 
    // IVS 
    window.registerIVSQualityPlugin(videojs);

    /**
     * instantiate 
     */
    const player = videojs(
      //  video-id
      "amazon-ivs-videojs",
     
      {
        techOrder: ["AmazonIVS"], 
        autoplay: true,
      },
      // video.js ready 
      () => {
        // playback url src  autoplay  play 
        console.log("IVS Player is READY!");
        player.src(PLAYBACK_URL);
      }
    ) 


    player.enableIVSQualityPlugin();

    /**
     * 
     * video.js  IVS Player event 
     */
    const events = player.getIVSEvents();
    const ivsPlayer = player.getIVSPlayer();

    // PLAYING 
    ivsPlayer.addEventListener(events.PlayerState.PLAYING, () => {
      console.log("IVS Player is PLAYING");
    });
    // IDLE 
    ivsPlayer.addEventListener(events.PlayerState.IDLE, () => {
      console.log("IVS Player is IDLE");
    });
    // BUFFERING 
    ivsPlayer.addEventListener(events.PlayerState.BUFFERING, () => {
      console.log("IVS Player is BUFFERING");
    });
    // ENDED 
    ivsPlayer.addEventListener(events.PlayerState.ENDED, () => {
      console.log("IVS Player is ENDED");
    });


    // ivsPlayer.addEventListener(
    //   events.PlayerEventType.TEXT_METADATA_CUE,
    //   function (cue) {
    //     console.log(cue);
    //     console.log("Timed metadata: ", cue.text);

    //     const metadata = JSON.parse(cue.text);
    //     if (metadata.type === "quiz" && handleQuizEvent) {
    //       handleQuizEvent(cue);
    //     }
    //   }
    // );

  
    // video.js 
    player.on("error", () => {
      console.log(player.error());
    });
    // IVS 
    ivsPlayer.addEventListener(events.PlayerEventType.ERROR, (payload) => {
      const { type, code, source, message } = payload;
      console.log(type, code, source, message);
      alert(message);
    });
  }, [src]);

  return (
    <>
      <Head>
        {/** IVS css */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.6.6/video-js.css"
          rel="stylesheet"
        />
      </Head>
        <div style={{width: "640px",height: "480px",margin: "15px"}} className="video-container">
        <video
          id="amazon-ivs-videojs"
          className="video-js vjs-4-3 vjs-big-play-centered"
          controls
          autoPlay
          playsInline
        ></video>
      </div>
    </>
  );
}

export default IVSPlayer;