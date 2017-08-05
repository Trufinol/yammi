$(function() {

    // Full-width slider
    $('.main-slider').owlCarousel({
        loop: true,
        autoWidth:true,
        margin: 10,
        items: 1,
        responsive: false,
    });

    // Backpack photos slider
    $('.item-slider').owlCarousel({
        loop: true,
        autoWidth:true,
        items: 1,
        responsive: false,
        nav:true,
        loop:false,
        pagination: false
    });

    $('._checkout-item ._buy-btn').on('click', function(e) {
        var item = $(this).parent('._checkout-item');
        var itemSize = item.find('._item-size.uk-active').text();
        var itemColor = item.find('._item-color').text();
        var itemPrice = item.find('._item-price').data().price;
        console.log(itemSize, itemColor, itemPrice);
        UIkit.modal('#buy-modal').show()
        // _order-pic
        // _order-name
        // _order-type
        // _order-price
    });
});
