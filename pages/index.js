// import IVSPlayer from "../components/IVSPlayer";

// import useScript from "../hooks/useScript";
import React from "react";
import ReactPlayer from "react-player";

const playBackUrl =
	"https://9ea56384b251.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.478330417250.channel.8W2kxcuNC75a.m3u8"; /** process.env.NEXT_PUBLIC_PLAYBACK_URL; */

export default function Home() {


	return (
		<div style={{ height: "80vh", width: "100%" }}>
			{/** IVS  */}
			<ReactPlayer url={playBackUrl} playing controls />
		</div>
	);
}
