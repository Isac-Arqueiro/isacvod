// Chave JW Player
jwplayer.key = "YOUR_JWPLAYER_KEY";

// Lista de canais
const channels = [
    {
        id: "pluto",
        name: "Pluto TV",
        type: "hls",
        file: "https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f12136385bccc00070142ed/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
        image: "/play-on.png"
    },
    {
        id: "youtube",
        name: "YouTube Exemplo",
        type: "youtube",
        file: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        image: "/play-on.png"
    },
    {
        id: "mp4",
        name: "Vídeo MP4",
        type: "mp4",
        file: "https://www.w3schools.com/html/mov_bbb.mp4",
        image: "/play-on.png"
    }
];

// Carrega favoritos do localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Renderiza canais
function renderChannels(filter = "") {
    const container = document.getElementById("channel-list");
    container.innerHTML = "";
    channels
        .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
        .forEach(c => {
            const div = document.createElement("div");
            div.classList.add("channel");
            if (favorites.includes(c.id)) div.classList.add("favorite");
            div.innerHTML = `
                <img src="${c.image}" alt="${c.name}">
                <div class="channel-name">${c.name}</div>
            `;
            div.onclick = () => playChannel(c);
            div.ondblclick = () => toggleFavorite(c.id, div);
            container.appendChild(div);
        });
}

// Inicializa player
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

// Alterna favorito
function toggleFavorite(id, element) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(f => f !== id);
        element.classList.remove("favorite");
    } else {
        favorites.push(id);
        element.classList.add("favorite");
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Busca de canais
document.getElementById("search").addEventListener("input", e => {
    renderChannels(e.target.value);
});

// Inicializa
renderChannels();
playChannel(channels[0]);

// Eventos do player
jwplayer("player").on('play', () => console.log("Vídeo iniciado!"));
jwplayer("player").on('pause', () => console.log("Vídeo pausado!"));
jwplayer("player").on('complete', () => console.log("Vídeo finalizado!"));
