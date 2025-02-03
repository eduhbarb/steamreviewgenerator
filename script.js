document.querySelectorAll('.star-rating').forEach(rating => {
    // Clique: registra a nota e preenche as estrelas
    rating.addEventListener('click', event => {
        if (!event.target.classList.contains('star')) return; // garante que o clique foi numa estrela
        const stars = Array.from(rating.children);
        const clickedValue = parseInt(event.target.dataset.value);
        rating.dataset.selected = clickedValue; // armazena a nota selecionada

        stars.forEach((star, index) => {
            if (index < clickedValue) {
                star.classList.add('filled');
            } else {
                star.classList.remove('filled');
            }
        });
    });

    // Hover: preenche temporariamente as estrelas
    rating.addEventListener('mouseover', event => {
        if (!event.target.classList.contains('star')) return;
        const stars = Array.from(rating.children);
        const hoverValue = parseInt(event.target.dataset.value);
        stars.forEach((star, index) => {
            if (index < hoverValue) {
                star.classList.add('filled');
            } else {
                star.classList.remove('filled');
            }
        });
    });

    // Ao sair do hover, retorna para a seleção registrada
    rating.addEventListener('mouseout', () => {
        const stars = Array.from(rating.children);
        const selectedValue = parseInt(rating.dataset.selected) || 0;
        stars.forEach((star, index) => {
            if (index < selectedValue) {
                star.classList.add('filled');
            } else {
                star.classList.remove('filled');
            }
        });
    });

    // Inicializa o estado, caso haja um valor já armazenado
    const initialValue = parseInt(rating.dataset.selected) || 0;
    Array.from(rating.children).forEach((star, index) => {
        if (index < initialValue) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled');
        }
    });
});

document.querySelectorAll('.duration-rating').forEach(rating => {
    rating.addEventListener('click', event => {
        if (!event.target.classList.contains('duration')) return;
        const spans = Array.from(rating.children);
        const clickedValue = parseInt(event.target.dataset.value);
        rating.dataset.selected = clickedValue;

        spans.forEach((span, index) => {
            span.textContent = index < clickedValue ? '▰' : '▱';
        });
    });

    rating.addEventListener('mouseover', event => {
        if (!event.target.classList.contains('duration')) return;
        const spans = Array.from(rating.children);
        const hoverValue = parseInt(event.target.dataset.value);
        spans.forEach((span, index) => {
            span.textContent = index < hoverValue ? '▰' : '▱';
        });
    });

    rating.addEventListener('mouseout', () => {
        const spans = Array.from(rating.children);
        const selectedValue = parseInt(rating.dataset.selected) || 0;
        spans.forEach((span, index) => {
            span.textContent = index < selectedValue ? '▰' : '▱';
        });
    });

    const initialValue = parseInt(rating.dataset.selected) || 0;
    Array.from(rating.children).forEach((span, index) => {
        span.textContent = index < initialValue ? '▰' : '▱';
    });
});

function gerarReview() {
    const categorias = {
        "classificacao-geral": "🏆 Classificação Geral",
        "historia": "📖 História",
        "jogabilidade": "🎮 Jogabilidade",
        "grafico": "🎨 Gráficos",
        "som": "🎵 Design de Som",
        "rejogabilidade": "🔁 Valor de Rejogabilidade",
        "dificuldade": "😬 Dificuldade",
        "bugs": "🪲 Livre de Bugs?",
        "requisitos-pc": "🖥️ Requisitos para PC",
        "duracao": "⏳ Duração do Jogo"
    };

    let review = "[table equalcells=1]\n";
    review += "    [tr]\n";
    review += "        [th]Categoria[/th]\n";
    review += "        [th]Nota[/th]\n";
    review += "    [/tr]\n";

    const idsEstrelas = [
        "classificacao-geral",
        "historia",
        "jogabilidade",
        "grafico",
        "som",
        "rejogabilidade",
        "dificuldade",
        "bugs",
        "requisitos-pc"
    ];

    idsEstrelas.forEach(id => {
        const container = document.getElementById(id);
        let valor = parseInt(container.dataset.selected) || 0;
        let notaStr = "★".repeat(valor) + "☆".repeat(5 - valor);
        review += "    [tr]\n";
        review += `        [td]${categorias[id]}[/td]\n`;
        review += `        [td]${notaStr}[/td]\n`;
        review += "    [/tr]\n";
    });

    const duracaoContainer = document.getElementById("duracao");
    let duracaoValor = parseInt(duracaoContainer.dataset.selected) || 0;
    let notaDuracao = "▰".repeat(duracaoValor) + "▱".repeat(5 - duracaoValor);
    review += "    [tr]\n";
    review += `        [td]${categorias["duracao"]}[/td]\n`;
    review += `        [td]${notaDuracao}[/td]\n`;
    review += "    [/tr]\n";

    review += "[/table]";

    // Exibe o resultado no textarea com id "resultado"
    document.getElementById("resultado").value = review;
}

function copiarTexto() {
    const textarea = document.getElementById("resultado");
    textarea.select();
    textarea.setSelectionRange(0, 99999); // Para dispositivos móveis
    navigator.clipboard.writeText(textarea.value)
}

