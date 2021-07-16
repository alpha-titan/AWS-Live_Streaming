import IVSPlayer from "../components/IVSPlayer";

import useScript from "../hooks/useScript";



const playBackUrl =
	"https://9ea56384b251.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.478330417250.channel.8W2kxcuNC75a.m3u8"; /** process.env.NEXT_PUBLIC_PLAYBACK_URL; */

export default function Home() {


	// Load IVS tech
	const { loading, error } = useScript({
		src: "https://player.live-video.net/1.2.0/amazon-ivs-videojs-tech.min.js",
	});
	// Load IVS quality plugin
	const { loading: loadingPlugin, error: pluginError } = useScript({
		src: "https://player.live-video.net/1.2.0/amazon-ivs-quality-plugin.min.js",
	});

	if (loading || loadingPlugin) {
		return "loading ivs videojs tech and plugins...";
	}

	if (error || pluginError) {
		return "Error!";
	}

	return (
		<div style={{ height: "80vh", width: "100%" }}>
			{/** IVS  */}
			<IVSPlayer src={playBackUrl} />
		</div>
	);
}
