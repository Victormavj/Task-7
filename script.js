$(document).ready(function () {
    const $galleryWindow = $(".gallery-window");
    const $galleryTrack = $(".gallery-track");
    const $images = $(".gallery-track img");
    const $pagerButtons = $(".pager-button");
    const $previousButton = $(".previous");
    const $nextButton = $(".next");
    let currentPage = 0;
    let pageCount = 1;

    function updateGallery() {
        const imagesPerPage = window.innerWidth <= 600 ? 1 : 3;
        const imageCount = $images.length;
        const imageWidth = $galleryWindow.width() / imagesPerPage;
        const gap = parseFloat($galleryTrack.css("gap")) || 0;
        const pageWidth = imagesPerPage * imageWidth + (imagesPerPage - 1) * gap;

        pageCount = Math.ceil(imageCount / imagesPerPage);
        currentPage = Math.min(currentPage, pageCount - 1);
        $galleryTrack.css("transform", "translateX(-" + currentPage * pageWidth + "px)");

        $pagerButtons.each(function (index) {
            $(this).toggleClass("active", index === currentPage);
            $(this).toggle(index < pageCount);
        });

        $previousButton.prop("disabled", currentPage === 0);
        $nextButton.prop("disabled", currentPage === pageCount - 1);
        $("#pageStatus").text("Page " + (currentPage + 1) + " of " + pageCount);
    }

    $previousButton.on("click", function () {
        if (currentPage > 0) {
            currentPage -= 1;
            updateGallery();
        }
    });

    $nextButton.on("click", function () {
        if (currentPage < pageCount - 1) {
            currentPage += 1;
            updateGallery();
        }
    });

    $pagerButtons.on("click", function () {
        currentPage = Number($(this).text()) - 1;
        updateGallery();
    });

    $(window).on("resize", updateGallery);
    updateGallery();
});
