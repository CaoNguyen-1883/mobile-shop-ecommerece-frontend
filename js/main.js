import { HEADER_CATEGORY, MOBILEPHONES, BRANDS } from "./data.js";
import { $, $$, createElement } from "./dom.js";


const renderHeaderCategories = () => {
    const nav = $(".header-categories");

    if(!nav) return;

    nav.innerHtml = "";

    HEADER_CATEGORY.forEach(category =>{
        const categoryItem = document.createElement("div");
        categoryItem.classList.add("category-item");

        categoryItem.innerHTML = `
            <a href="${category.url}" class="category-link">
                <i class="fa-solid ${category.icon}"></i>
                <span>${category.name}</span>
            </a>
            ${category.branch ? `<div class="branch-box"></div>` : ""}
        `;

        nav.appendChild(categoryItem);

        if(category.branch){
            const branchBox = $(".branch-box", categoryItem);
            category.branch.forEach(branchName => {
                const branchItem = document.createElement("div");
                branchItem.classList.add("branch-item");
                branchItem.textContent = branchName;
                branchBox.appendChild(branchItem);
            });

            categoryItem.addEventListener("mouseenter", () => {
                branchBox.style.display = "block";
            });
            categoryItem.addEventListener("mouseleave", () => {
                branchBox.style.display = "none";
            });
        }
    });
}

const renderMobilePhones = () => {
    const container = $("#categoryPage > div.container-productbox > ul");

    if (!container) return;

    container.innerHTML = MOBILEPHONES.map(product => `
        <li class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}"/>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-versions">Versions: ${product.versions ? product.versions.join(", ") : "N/A"}</p>
                <p class="product-price">
                    <span class="price-old">${product.price}</span>
                    <span class="price-sale">${product.salePrice}</span>
                </p>
                <p class="product-rating">Rating: ${product.rating} ⭐</p>
                <p class="product-sold">Sold: ${product.sold} $</p>
            </div>
        </li>
    `).join("");
}

const renderBranchFilter = () => {
    const branchList = $("#branch-list");
    if(!branchList) return;

    branchList.innerHTML = BRANDS.map(brand => `
        <li class="branch-item">${brand.name}</li>
    `).join("");
}


const backToTop = $(".back-to-top");

window.addEventListener("scroll", () => {
    if(window.scrollY > 300){
        console.log("hello")
        backToTop.style.display = "block";
    } else{
        backToTop.style.display = "none";
    }
})

backToTop.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth"})
});

document.addEventListener("DOMContentLoaded",() =>{
    renderHeaderCategories(),
    renderBranchFilter(),
    renderMobilePhones()
})