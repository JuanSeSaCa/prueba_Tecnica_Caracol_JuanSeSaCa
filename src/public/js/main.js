document.addEventListener("DOMContentLoaded", async function () {
    console.log(" Página cargada correctamente");

    //  Cargar datos desde la API (/api/data)

    let jsonData;
    try {
        const response = await fetch("/api/data");
        jsonData = await response.json();
        console.log(" Datos cargados desde la API:", jsonData);
    } catch (error) {
        console.error("⚠️ Error al cargar los datos:", error);
        return;
    }

    //  Renderizar Breadcrumbs

    const breadcrumbsContainer = document.querySelector("#breadcrumbs");
    if (breadcrumbsContainer && jsonData.breadcrumbs) {
        breadcrumbsContainer.innerHTML = jsonData.breadcrumbs
            .map(breadcrumb => `<a href="${breadcrumb.href}">${breadcrumb.body}</a>`)
            .join(" > ");
    }

    
    //  Renderizar Page Lead

    const pageLeadContainer = document.querySelector("#pageLead");
    if (pageLeadContainer && jsonData.pageLead) {
        const pageLead = jsonData.pageLead[0];
        pageLeadContainer.innerHTML = `
            <img src="${pageLead.image.src}" 
                alt="${pageLead.alt}" 
                width="${pageLead.image.width}" 
                height="${pageLead.image.height}">
        `;
    }

    
    //  Renderizar Lead con Imagen/Video
   
    const leadContainer = document.querySelector("#lead");
    if (leadContainer && jsonData.lead) {
        const lead = jsonData.lead[0];


        let content = '<div class="lead-media">';
    
    if (lead.video && lead.video.src) {
        content += `<iframe src="${lead.video.src}" frameborder="0" allowfullscreen></iframe>`;
    } else if (lead.image && lead.image.src) {
        content += `<img src="${lead.image.src}" alt="${lead.image.alt || 'Imagen sin descripción'}" width="${lead.image.width || 'auto'}" height="${lead.image.height || 'auto'}">`;
    } else {
        content += "<p>⚠️ No hay imagen y/o video disponibles.</p>";
    }

    content += "</div>";
    leadContainer.innerHTML = content;
}

    
    //  Renderizar Hot Topics
   
    const hotTopicsContainer = document.querySelector("#hotTopics");
    if (hotTopicsContainer && jsonData.hotTopics) {
        hotTopicsContainer.innerHTML = jsonData.hotTopics
            .map(topic => `<a href="${topic.url}" target="${topic.target}">${topic.title}</a>`)
            .join(" | ");
    }


    //  Renderizar Social Links

    const socialContainer = document.querySelector("#socialLinks");
    if (socialContainer && jsonData.social) {
        socialContainer.innerHTML = jsonData.social[0].items
            .map(item => `<a href="${item.href}" target="_blank">${item.socialService}</a>`)
            .join(" | ");
    }

 
    //  Renderizar Audio Player
 
    const audioPlayerContainer = document.querySelector("#audioPlayerContainer");
    if (audioPlayerContainer && jsonData.audioPlayer) {
        const audio = jsonData.audioPlayer[0];
        audioPlayerContainer.innerHTML = `
            <audio id="audioPlayer" src="${audio.audioUrl}" controls></audio>
            <button id="playButton">Reproducir</button>
        `;
    }


    // Configurar Reproductor de Audio
  
    const audioPlayer = document.querySelector("#audioPlayer");
    const playButton = document.querySelector("#playButton");

    if (audioPlayer && playButton) {
        playButton.addEventListener("click", function () {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playButton.textContent = "Pausar";
            } else {
                audioPlayer.pause();
                playButton.textContent = "Reproducir";
            }
        });
    }

    
    //  Configurar Botones de Compartir
  
    const shareButtonsContainer = document.querySelector("#shareButtons");
    if (shareButtonsContainer && jsonData.actions) {
        shareButtonsContainer.innerHTML = jsonData.actions[0].items
            .map(action => `
                <button class="share-button" data-platform="${action.body.toLowerCase()}">
                    Compartir en ${action.body}
                </button>
            `)
            .join("");
    }

    const shareButtons = document.querySelectorAll(".share-button");

    shareButtons.forEach(button => {
        button.addEventListener("click", function () {
            const platform = this.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            let shareUrl = "";

            switch (platform) {
                case "facebook":
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case "twitter":
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=¡Mira esto!`;
                    break;
                case "whatsapp":
                    shareUrl = `https://api.whatsapp.com/send?text=${url}`;
                    break;
                default:
                    console.log("⚠️ Plataforma no soportada");
            }

            if (shareUrl) {
                window.open(shareUrl, "_blank");
            }
        });
    });

    //  Configurar Carrusel de Imágenes/Videos

    let index = 0;
    const slides = document.querySelectorAll(".carousel-item");
    const totalSlides = slides.length;
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");

    function showSlide(n) {
        slides.forEach(slide => (slide.style.display = "none"));
        slides[n].style.display = "block";

        const video = slides[n].querySelector("video");
        if (video) {
            video.currentTime = 0;
            video.play();
        }
    }

    function nextSlide() {
        index = (index + 1) % totalSlides;
        showSlide(index);
    }

    function prevSlide() {
        index = (index - 1 + totalSlides) % totalSlides;
        showSlide(index);
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener("click", prevSlide);
        nextButton.addEventListener("click", nextSlide);
    }

    showSlide(index);
    // setInterval(nextSlide, 5000);
});
