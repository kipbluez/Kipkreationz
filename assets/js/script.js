const TELEGRAM_USER = 'KipBluez';

const backupdata = `{
  "groups": [
    {
      "name": "Produtos Físicos (Fursuit)",
      "items": [
        {
          "name": "Cabeça de Fursuit",
          "price": "R$ 700,00",
          "image": "assets/images/fursuit-head.png",
          "telegram_text": "estou interessado na cabeça de fursuit por 700 reais"
        },
        {
          "name": "Patas de Fursuit",
          "price": "R$ 150,00",
          "image": "assets/images/fursuit-paws.png",
          "telegram_text": "estou interessado nas patas por 150 reais"
        },
        {
          "name": "Caudas de Fursuit",
          "price": "R$ 80,00 a R$ 200,00",
          "image": "assets/images/fursuit-tail.png",
          "telegram_text": "estou interessado nas caudas de fursuit"
        }
      ]
    },
    {
      "name": "Serviços Digitais (Arte)",
      "items": [
        {
          "name": "Comissão YCH",
          "price": "R$ 30,00",
          "image": "assets/images/ych.png",
          "telegram_text": "estou interessado na comissão YCH por 30 reais"
        },
        {
          "name": "Comissão Refsheet",
          "price": "R$ 60,00",
          "image": "assets/images/refsheet.png",
          "telegram_text": "estou interessado na comissão refsheet por 60 reais"
        }
      ]
    }
  ]
}`;

fetch('assets/data/products.json')
    .then(r => {
        if (!r.ok) throw new Error('Fetch falhou');
        return r.json();
    })
    .then(data => renderProducts(data))
    .catch(err => {
        console.warn('Usando dados de backup', err);
        renderProducts(JSON.parse(backupdata));
    });

function renderProducts(data) {
    const container = document.getElementById('product-groups');
    container.innerHTML = '';

    data.groups.forEach(group => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group';

        const title = document.createElement('h3');
        title.textContent = group.name;
        groupDiv.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'product-grid';

        group.items.forEach(item => {
            const link = document.createElement('a');
            link.className = 'product-card';
            link.target = '_blank';

            const text = encodeURIComponent(item.telegram_text);
            link.href = `https://t.me/${TELEGRAM_USER}?text=${text}`;

            link.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="info">
                    <h4>${item.name}</h4>
                    <p class="price">${item.price}</p>
                    <span class="cta">Clique para falar no Telegram</span>
                </div>
            `;

            grid.appendChild(link);
        });

        groupDiv.appendChild(grid);
        container.appendChild(groupDiv);
    });
}