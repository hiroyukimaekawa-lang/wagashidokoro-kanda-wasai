const API_KEY = "4gZHwEuDUvng4lHBG41rzKphgjt3QjznR1qQ";
const SERVICE_ID = "kandawasai";
const ENDPOINT = "wagashi";

async function fetchWagashi() {
    // 全件を取得できるようにlimit=100を指定
    const url = `https://${SERVICE_ID}.microcms.io/api/v1/${ENDPOINT}?limit=100`;
    const response = await fetch(url, {
        headers: {
            "X-MICROCMS-API-KEY": API_KEY
        }
    });
    if (!response.ok) {
        throw new Error(`microCMS API request failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data.contents || [];
}

function renderSeasonalJyounamagashi(items) {
    const container = document.getElementById("seasonal-jyounamagashi");
    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = "<p class='microcms-empty-message'>ただいま準備中です。</p>";
        return;
    }

    const ul = document.createElement("ul");
    ul.className = "sweets-flex-grid";

    items.forEach(item => {
        const li = document.createElement("li");
        li.className = "sweets-flex-item";

        // Title
        const titleDiv = document.createElement("div");
        titleDiv.className = "sweets-flex-item-title";
        const h3 = document.createElement("h3");
        h3.textContent = item.title;
        titleDiv.appendChild(h3);

        // Image
        const imgDiv = document.createElement("div");
        imgDiv.className = "sweets-flex-item-img";
        const img = document.createElement("img");
        img.src = item.image.url;
        img.alt = item.title;
        imgDiv.appendChild(img);

        // Description
        const p = document.createElement("p");
        p.className = "microcms-desc";
        p.textContent = item.description;

        li.appendChild(titleDiv);
        li.appendChild(imgDiv);
        li.appendChild(p);

        ul.appendChild(li);
    });

    container.innerHTML = "";
    container.appendChild(ul);
}

function renderClassicWagashi(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = "<p class='microcms-empty-message'>ただいま準備中です。</p>";
        return;
    }

    const sectionDiv = document.createElement("div");
    sectionDiv.className = "sweets-classic-section";

    const ul = document.createElement("ul");
    ul.className = "sweets-classic-list";

    items.forEach(item => {
        const li = document.createElement("li");
        li.className = "sweets-classic-item";

        // Text box
        const txtBox = document.createElement("div");
        txtBox.className = "sweets-classic-item-txtbox";

        const titleDiv = document.createElement("div");
        titleDiv.className = "sweets-classic-item-title";
        const h3 = document.createElement("h3");
        h3.textContent = item.title;
        titleDiv.appendChild(h3);

        const txtDiv = document.createElement("div");
        txtDiv.className = "sweets-classic-item-txt";
        
        const p = document.createElement("p");
        p.className = "microcms-desc";
        p.textContent = item.description;
        txtDiv.appendChild(p);

        txtBox.appendChild(titleDiv);
        txtBox.appendChild(txtDiv);

        // Image box
        const imgDiv = document.createElement("div");
        imgDiv.className = "sweets-classic-item-img";
        const img = document.createElement("img");
        img.src = item.image.url;
        img.alt = item.title;
        imgDiv.appendChild(img);

        li.appendChild(txtBox);
        li.appendChild(imgDiv);

        ul.appendChild(li);
    });

    sectionDiv.appendChild(ul);
    container.innerHTML = "";
    container.appendChild(sectionDiv);
}

document.addEventListener("DOMContentLoaded", async () => {
    const containers = [
        document.getElementById("seasonal-jyounamagashi"),
        document.getElementById("standard-wagashi"),
        document.getElementById("seasonal-wagashi")
    ];

    // ローディング表示を設定
    containers.forEach(container => {
        if (container) {
            container.innerHTML = "<p class='microcms-loading-message'>商品を読み込み中...</p>";
        }
    });

    try {
        const contents = await fetchWagashi();

        // 1. orderで昇順ソート（未設定の場合は末尾）
        const sortedContents = contents.sort((a, b) => {
            const orderA = typeof a.order === 'number' ? a.order : 9999;
            const orderB = typeof b.order === 'number' ? b.order : 9999;
            return orderA - orderB;
        });

        // 2. セクションごとに商品を振り分ける（画像URLが無い場合は除外する）
        const seasonalJyounamagashiList = sortedContents.filter(
            item => item.section === "季節の上生菓子" && item.image && item.image.url
        );
        const standardWagashiList = sortedContents.filter(
            item => item.section === "定番和菓子" && item.image && item.image.url
        );
        const seasonalWagashiList = sortedContents.filter(
            item => item.section === "季節の和菓子" && item.image && item.image.url
        );

        // 3. レンダリング
        renderSeasonalJyounamagashi(seasonalJyounamagashiList);
        renderClassicWagashi("standard-wagashi", standardWagashiList);
        renderClassicWagashi("seasonal-wagashi", seasonalWagashiList);

    } catch (error) {
        console.error("Failed to render microCMS contents:", error);
        containers.forEach(container => {
            if (container) {
                container.innerHTML = "<p class='microcms-error-message'>商品の取得に失敗しました。時間をおいて再度お試しください。</p>";
            }
        });
    }
});
