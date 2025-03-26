import { HEADER_CATEGORY } from "./data.js";
import { $, $$ } from "./dom.js";

const renderHeaderCategories = () => {
    const nav = $(".main-header");
    if (!nav) return;

    nav.innerHTML = "";

    HEADER_CATEGORY.forEach(category => {
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

        if (category.branch) {
            const branchBox = categoryItem.querySelector(".branch-box");
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
};


document.addEventListener("DOMContentLoaded", renderHeaderCategories);

const backToTop = $(".back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});