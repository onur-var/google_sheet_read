function populateTable(data) {
    const tbody = document.querySelector("#catalog-table tbody");
    const thead = document.querySelector("#catalog-table thead");
    tbody.innerHTML = '';
    thead.innerHTML = '';

    const headers = ["Malzeme ismi", "Part number", "Kategori", "Uçak Tipi", "Resim"];
    const filterRow = document.createElement('tr');
    const headerRow = document.createElement('tr');

    headers.forEach((header, index) => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);

        const filterCell = document.createElement('td');

        // Arama kutusu
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Ara...';
        searchInput.style.width = '100%';
        searchInput.style.marginBottom = '4px';

        // Select kutusu
        const filterInput = document.createElement('select');
        filterInput.innerHTML = '<option value="">Tümü</option>'; // Varsayılan "Tümü"

        // Filtre seçenekleri dolduruluyor
        const uniqueValues = [...new Set(data.slice(1).map(row => row[index] || ''))];
        uniqueValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            filterInput.appendChild(option);
        });

        // Arama kutusuyla select filtreleme
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            Array.from(filterInput.options).forEach(option => {
                if (option.value === '') return; // "Tümü" her zaman görünür
                option.style.display = option.textContent.toLowerCase().includes(searchTerm) ? '' : 'none';
            });
        });

        // Seçim değişince tabloyu filtrele
        filterInput.addEventListener('change', () => filterTable(data));

        filterCell.appendChild(searchInput);
        filterCell.appendChild(filterInput);
        filterRow.appendChild(filterCell);
    });

    thead.appendChild(headerRow);
    thead.appendChild(filterRow);

    // Veriler
    data.slice(1).forEach(row => {
        const tr = document.createElement('tr');
        row.forEach((cell, index) => {
            const td = document.createElement('td');

            if (index === 4) {
                const fileId = cell.split('/')[5];
                const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}`;
                const originalUrl = `https://drive.google.com/file/d/${fileId}/view`;

                const link = document.createElement('a');
                link.href = originalUrl;
                link.target = '_blank';

                const img = document.createElement('img');
                img.src = thumbnailUrl;
                img.alt = 'Catalog Image';
                img.style.width = '100px';
                link.appendChild(img);

                td.appendChild(link);
            } else {
                td.textContent = cell;
            }

            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}
