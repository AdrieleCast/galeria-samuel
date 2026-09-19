
/* =========================================================
   GALERIA SAMUEL — SCRIPT.JS
   Adriele Fotografia

   Aqui ficam:
   - Informações do ensaio
   - Lista de fotos
   - Galeria
   - Visualização ampliada
   - Próxima / anterior
   - Navegação pelo teclado
   - Deslizar no celular
   - Download
   ========================================================= */


/* =========================================================
   1. CONFIGURAÇÕES DO ENSAIO
   =========================================================

   PARA UM NOVO CLIENTE:

   Você só precisa alterar esta parte.

   Não precisa mexer no HTML ou no CSS.
   ========================================================= */

const config = {

    /* Nome da criança */

    nome: "Samuel",


    /* Idade */

    idade: "1 ano",


    /* Texto da capa */

    textoInicial:
        "Disse Samuel: Fala, Senhor, pois teu servo está ouvindo.  1 Samuel 3:9",


    /* Mensagem final */

    mensagem:
        "Que esta seja apenas a primeira de muitas páginas de uma história cheia de amor, alegria e momentos inesquecíveis. Obrigada por me permitir registrar um pedacinho dessa história.",


    /* =====================================================
       FOTOS
       =====================================================

       Coloque as fotos dentro da pasta:

       fotos/

       Depois coloque aqui o nome de cada arquivo.

       Exemplo:

       "fotos/01.jpg",
       "fotos/02.jpg",
       "fotos/03.jpg",

       Pode usar JPG, JPEG, PNG ou WEBP.

       ===================================================== */

    fotos: [

         "fotos/samuel01.jpg",
         "fotos/samuel02.jpg",
         "fotos/samuel03.jpg",
         "fotos/samuel04.jpg",
         "fotos/samuel05.jpg",
         "fotos/samuel06.jpg",

    ]

};


/* =========================================================
   2. ELEMENTOS DO SITE
   ========================================================= */

const clientName = document.getElementById("clientName");
const clientAge = document.getElementById("clientAge");
const heroText = document.getElementById("heroText");
const messageText = document.getElementById("messageText");

const gallery = document.getElementById("gallery");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

const counter = document.getElementById("counter");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const downloadBtn = document.getElementById("downloadBtn");
const galleryBtn = document.getElementById("galleryBtn");
const downloadAllBtn =
    document.getElementById("downloadAllBtn");


/* =========================================================
   3. COLOCAR AS INFORMAÇÕES NO SITE
   ========================================================= */

clientName.textContent = config.nome;

clientAge.textContent = config.idade;

heroText.textContent = config.textoInicial;

messageText.textContent = config.mensagem;


/* Título da aba do navegador */

document.title =
    `${config.nome} • ${config.idade}`;


/* =========================================================
   4. CONTROLE DA FOTO ATUAL
   ========================================================= */

let currentIndex = 0;


/* =========================================================
   5. CRIAR A GALERIA
   ========================================================= */

/* =========================================================
   BAIXAR TODAS AS FOTOS
   ========================================================= */


/* =========================================================
   BAIXAR TODAS AS FOTOS EM UM ÚNICO ZIP
   ========================================================= */

/* =========================================================
   BAIXAR TODAS AS FOTOS EM UM ÚNICO ZIP
   ========================================================= */

/* =========================================================
   BAIXAR TODAS AS FOTOS EM UM ÚNICO ZIP
   ========================================================= */

/* =========================================================
   BAIXAR TODAS AS FOTOS
   ========================================================= */

async function downloadAllPhotos() {

    console.log("Iniciando download das fotos...");


    /* Verificar JSZip */

    if (typeof JSZip === "undefined") {

        alert(
            "Não foi possível carregar o sistema de download."
        );

        console.error("JSZip não foi encontrado.");

        return;
    }


    /* Verificar fotos */

    if (
        !config.fotos ||
        config.fotos.length === 0
    ) {

        alert(
            "Não existem fotos para baixar."
        );

        return;
    }


    /* Botão */

    const button =
        document.getElementById("downloadAllBtn");


    if (!button) {

        console.error(
            "Botão downloadAllBtn não encontrado."
        );

        return;
    }


    /* Texto original */

    const originalText =
        button.textContent;


    try {

        /* Bloquear botão */

        button.disabled = true;


        /* Criar ZIP */

        const zip =
            new JSZip();


        /* Criar pasta */

        const folder =
            zip.folder(
                `${config.nome} - ${config.idade}`
            );


        /*
         * Percorrer as fotos
         */

        for (
            let i = 0;
            i < config.fotos.length;
            i++
        ) {

            const caminho =
                config.fotos[i];


            console.log(
                "Carregando:",
                caminho
            );


            /* Mostrar progresso */

            button.textContent =
                `Preparando ${i + 1} de ${config.fotos.length}...`;


            /*
             * Transformar o caminho em URL completa.
             *
             * Isso evita problemas com caminhos relativos.
             */

            const url =
                new URL(
                    caminho,
                    document.baseURI
                ).href;


            /*
             * Buscar a foto
             */

            const resposta =
                await fetch(url);


            /*
             * Verificar resposta
             */

            if (!resposta.ok) {

                throw new Error(
                    `Foto não encontrada: ${url}`
                );

            }


            /*
             * Transformar em Blob
             */

            const arquivo =
                await resposta.blob();


            /*
             * Descobrir nome do arquivo
             */

            let nomeArquivo =
                caminho
                    .split("/")
                    .pop();


            if (
                !nomeArquivo ||
                nomeArquivo === ""
            ) {

                nomeArquivo =
                    `foto-${i + 1}.jpg`;

            }


            /*
             * Colocar foto dentro do ZIP
             */

            folder.file(
                nomeArquivo,
                arquivo
            );

        }


        /*
         * Gerar ZIP
         */

        button.textContent =
            "Criando arquivo ZIP...";


        const zipFinal =
            await zip.generateAsync(
                {
                    type: "blob"
                },
                function (progresso) {

                    button.textContent =
                        `Criando ZIP ${Math.round(progresso.percent)}%...`;

                }
            );


        /*
         * Criar endereço temporário
         */

        const urlDownload =
            URL.createObjectURL(
                zipFinal
            );


        /*
         * Criar link
         */

        const link =
            document.createElement("a");


        link.href =
            urlDownload;


        /*
         * Nome do arquivo
         */

        const nomeZip =
            `${config.nome}_${config.idade}`
                .replace(/\s+/g, "_");


        link.download =
            `${nomeZip}.zip`;


        /*
         * Fazer download
         */

        document.body.appendChild(link);

        link.click();

        link.remove();


        /*
         * Liberar memória
         */

        setTimeout(() => {

            URL.revokeObjectURL(
                urlDownload
            );

        }, 2000);


        /*
         * Sucesso
         */

        button.textContent =
            "✓ Fotos baixadas";


        console.log(
            "ZIP criado com sucesso."
        );

    }


    catch (erro) {

        console.error(
            "ERRO AO CRIAR ZIP:",
            erro
        );


        button.textContent =
            "Erro ao baixar";


        alert(
            "Não foi possível criar o arquivo ZIP. Verifique o Console (F12)."
        );

    }


    /*
     * Restaurar botão
     */

    setTimeout(() => {

        button.textContent =
            originalText;

        button.disabled =
            false;

    }, 3000);

}




function renderGallery() {

    /* Limpa a galeria */

    gallery.innerHTML = "";


    /* -----------------------------------------------------
       Se não houver fotos cadastradas
       ----------------------------------------------------- */

    if (config.fotos.length === 0) {

        gallery.innerHTML = `

            <div class="empty">

                <strong>
                    Suas fotos aparecerão aqui.
                </strong>

                <br><br>

                Coloque as imagens dentro da pasta
                <strong>fotos</strong> e depois cadastre
                os nomes delas no arquivo
                <strong>script.js</strong>.

            </div>

        `;

        return;
    }


    /* -----------------------------------------------------
       Criar cada fotografia
       ----------------------------------------------------- */

    config.fotos.forEach((src, index) => {

        /* Criar cartão */

        const card = document.createElement("div");

        card.classList.add("photo-card");


        /* Criar imagem */

        const img = document.createElement("img");

        img.src = src;

        img.alt =
            `${config.nome} — foto ${index + 1}`;

        img.loading = "lazy";


        /* Ícone de ampliar */

        const zoom = document.createElement("span");

        zoom.classList.add("zoom");

        zoom.textContent = "⌕";


        /* Colocar imagem dentro do cartão */

        card.appendChild(img);

        card.appendChild(zoom);


        /* Ao clicar */

        card.addEventListener("click", () => {

            openPhoto(index);

        });


        /* Colocar na galeria */

        gallery.appendChild(card);

    });

}


/* =========================================================
   6. ABRIR UMA FOTO
   ========================================================= */

function openPhoto(index) {

    /* Se não houver fotos, não fazer nada */

    if (config.fotos.length === 0) {

        return;

    }


    /* -----------------------------------------------------
       Garantir que o índice nunca fique fora da lista
       ----------------------------------------------------- */

    currentIndex =
        (index + config.fotos.length)
        % config.fotos.length;


    /* -----------------------------------------------------
       Alterar a imagem
       ----------------------------------------------------- */

    lightboxImg.src =
        config.fotos[currentIndex];


    lightboxImg.alt =
        `${config.nome} — foto ${currentIndex + 1}`;


    /* -----------------------------------------------------
       Atualizar contador
       ----------------------------------------------------- */

    counter.textContent =
        `${currentIndex + 1} / ${config.fotos.length}`;


    /* -----------------------------------------------------
       Mostrar visualizador
       ----------------------------------------------------- */

    lightbox.classList.add("open");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    /* Impedir que a página role atrás da foto */

    document.body.style.overflow = "hidden";


    /* Garantir foco no visualizador */

    lightboxImg.focus?.();

}


/* =========================================================
   7. FECHAR FOTO
   ========================================================= */

function closeLightbox() {

    lightbox.classList.remove("open");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    /* Liberar rolagem da página */

    document.body.style.overflow = "";


    /* Limpar imagem */

    lightboxImg.src = "";

}


/* =========================================================
   8. PRÓXIMA FOTO
   ========================================================= */

function nextPhoto() {

    openPhoto(
        currentIndex + 1
    );

}


/* =========================================================
   9. FOTO ANTERIOR
   ========================================================= */

function previousPhoto() {

    openPhoto(
        currentIndex - 1
    );

}


/* =========================================================
   10. BOTÃO FECHAR
   ========================================================= */

closeBtn.addEventListener(
    "click",
    closeLightbox
);


/* =========================================================
   11. BOTÃO PRÓXIMA
   ========================================================= */

nextBtn.addEventListener(
    "click",
    nextPhoto
);


/* =========================================================
   12. BOTÃO ANTERIOR
   ========================================================= */

prevBtn.addEventListener(
    "click",
    previousPhoto
);


/* =========================================================
   13. CLICAR FORA DA FOTO PARA FECHAR
   ========================================================= */

lightbox.addEventListener(
    "click",
    function (event) {

        /*
           Se clicar no fundo escuro,
           fecha a foto.

           Se clicar na própria foto ou nos botões,
           não fecha.
        */

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   14. TECLADO
   =========================================================

   ← = foto anterior
   → = próxima foto
   ESC = fechar
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        /* Só funciona quando o visualizador está aberto */

        if (
            !lightbox.classList.contains("open")
        ) {

            return;

        }


        /* ESC */

        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }


        /* Seta direita */

        if (
            event.key === "ArrowRight"
        ) {

            nextPhoto();

        }


        /* Seta esquerda */

        if (
            event.key === "ArrowLeft"
        ) {

            previousPhoto();

        }

    }
);


/* =========================================================
   15. DESLIZAR NO CELULAR
   ========================================================= */

let touchStartX = 0;

let touchStartY = 0;


/* Quando começa o toque */

lightbox.addEventListener(
    "touchstart",
    function (event) {

        const touch =
            event.changedTouches[0];


        touchStartX =
            touch.screenX;


        touchStartY =
            touch.screenY;

    },
    {
        passive: true
    }
);


/* Quando termina o toque */

lightbox.addEventListener(
    "touchend",
    function (event) {

        const touch =
            event.changedTouches[0];


        const deltaX =
            touch.screenX - touchStartX;


        const deltaY =
            touch.screenY - touchStartY;


        /*
           Só consideramos como deslize
           se o movimento horizontal for
           suficientemente grande.
        */

        if (

            Math.abs(deltaX) > 55 &&

            Math.abs(deltaX) >
            Math.abs(deltaY)

        ) {

            /* Deslizou para esquerda */

            if (deltaX < 0) {

                nextPhoto();

            }


            /* Deslizou para direita */

            else {

                previousPhoto();

            }

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   16. DOWNLOAD DA FOTO
   ========================================================= */

function downloadCurrentPhoto() {

    /* Verificar se existe foto */

    if (
        !config.fotos.length
    ) {

        return;

    }


    /* Caminho da foto */

    const src =
        config.fotos[currentIndex];


    /* Pegar nome do arquivo */

    const fileName =
        src.split("/").pop()
        || `foto-${currentIndex + 1}.jpg`;


    /* Criar link temporário */

    const link =
        document.createElement("a");


    link.href = src;

    link.download = fileName;


    /* Adicionar temporariamente à página */

    document.body.appendChild(link);


    /* Clicar automaticamente */

    link.click();


    /* Remover link */

    link.remove();

}


/* Botão de download */

downloadBtn.addEventListener(
    "click",
    downloadCurrentPhoto
);



/* =========================================================
   17. VOLTAR PARA A GALERIA
   ========================================================= */

galleryBtn.addEventListener(
    "click",
    function () {

        /* Fechar foto */

        closeLightbox();


        /* Ir para a seção da galeria */

        document
            .getElementById("galeria")
            .scrollIntoView({
                behavior: "smooth"
            });

    }

    
);


/* =========================================================
   CONTADOR DE FOTOS
   ========================================================= */

function atualizarContadorFotos() {

    const contador =
        document.getElementById("photoCount");

    if (!contador) return;


    const quantidade =
        config.fotos.length;


    if (quantidade === 1) {

        contador.textContent =
            "1 fotografia para guardar esse momento";

    } else {

        contador.textContent =
            `${quantidade} fotografias para guardar esse momento`;

    }

}


/* Atualizar contador */

atualizarContadorFotos();

/* =========================================================
   18. INICIAR GALERIA
   ========================================================= */

renderGallery();
