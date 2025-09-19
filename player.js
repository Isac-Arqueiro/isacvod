// Chave JW Player
jwplayer.key = "YOUR_JWPLAYER_KEY";

// Lista de canais
const channels = [
    {
        name: "Pluto TV",
        type: "hls",
        file: "https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f12136385bccc00070142ed/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
        image: "/play-on.png"
    },
    {
        name: "YouTube Exemplo",
        type: "youtube",
        file: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        image: "/play-on.png"
    },
    {
        name: "Vídeo MP4",
        type: "mp4",
        file: "https://www.w3schools.com/html/mov_bbb.mp4",
        image: "/play-on.png"
    }
];

// Inicializa o player
function playChannel(channel) {
    jwplayer("player").setup({
        file: channel.file,
        image: channel.image,
        width: "100%",
        aspectratio: "16:9",
        autostart: true,
        controls: true,
        preload: "auto",
        repeat: false,
        type: channel.type
    });
}

// Inicializa com o primeiro canal
playChannel(channels[0]);

// Eventos do player
jwplayer("player").on('play', () => console.log("Vídeo iniciado!"));
jwplayer("player").on('pause', () => console.log("Vídeo pausado!"));
jwplayer("player").on('complete', () => console.log("Vídeo finalizado!"));
