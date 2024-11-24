document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".tabs li");
    const tabContents = document.querySelectorAll(".tab-item");

    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const targetTab = this.getAttribute("data-tab");
            tabContents.forEach(content => {
                if (content.id === targetTab) {
                    content.classList.add("active");
                } else {
                    content.classList.remove("active");
                }
            });
        });
    });
});
