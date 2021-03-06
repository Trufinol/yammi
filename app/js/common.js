$(function() {
    var placeHolder = $("#root");
    var template = $('#template').html();
    Handlebars.registerHelper('if_eq', function(a, b, opts) {
        if (a == b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    });
    $.get("text.json", function(data, status, xhr) {
        var stone = Handlebars.compile(template)(data);
        placeHolder.html(stone);
        // Full-width slider
    }).done(function() {
        setTimeout(function() {
            $('.main-slider').slick({
                infinite: true,
                slidesToShow: 1,
                // centerMode: true,
                autoplay: true,
                autoplaySpeed: 5000,
                // adaptiveHeight: true
            });

            // Backpack photos slider
            $('.item-slider').slick({
                slidesToShow: 1,
            });
            $('.loading-overlay').fadeOut();
        }, 500);
        // Set order details for modal checkout page
        $('._checkout-item ._buy-btn').on('click', function() {
            var item = $(this).closest('._checkout-item');
            var itemName = item.find('._item-name').text();
            var itemPrice = item.find('._item-price').text();
            var itemImage = item.find('._item-pic')[0].src;

            var modal = $('#buy-modal');
            modal.find('._order-name').text(itemName);
            modal.find('._order-price').text(itemPrice);
            modal.find('._order-pic').attr('src', itemImage);
            UIkit.modal('#buy-modal').show()
        });

        // Sumbit handler for modal checkout page
        $('#buy-form, #contact-form').on('submit', function(e) {
            e.preventDefault();
            var th = $(this);
            if (th.find('._order-name').length > 0) {
                var inputValues = {
                    'Имя': th.find('#name').val(),
                    'Телефон': th.find('#phone').val(),
                    'Cooбщение': th.find('#comments').val(),
                    'Заказ': th.find('._order-name').text(),
                    'Цена': th.find('._order-price').text(),
                    '_language': 'ru',
                    '_subject': 'Yammi - Заказ'
                };
            } else {
                var inputValues = {
                    'Имя': th.find('#name').val(),
                    'Телефон': th.find('#phone').val(),
                    'Cooбщение': th.find('#comments').val(),
                    '_language': 'ru',
                    '_subject': 'Yammi - Сообщение'
                };
            }
            $('._loader').show();
            $.ajax({
                type: "POST",
                url: "https://formspree.io/veseliy07@gmail.com", //Change olgakravtsova08@gmail.com
                data: inputValues,
                dataType: "json"
            }).done(function() {
                UIkit.modal('#buy-modal').hide();
                th.trigger("reset");
                UIkit.notification("<div class='uk-text-center'><p><span class='uk-text-success' uk-icon='icon: happy'></span> Спасибо!</p><p>Ваша заявка успешно отправлена</p></div>");
            }).fail(function() {
                UIkit.notification("<div class='uk-text-center'><p><span class='uk-text-danger' uk-icon='icon: ban'></span> Ой!</p><p>Мы не смогли отправить вашу форму...</p><p>Попробуйте позже</p></div>");
            });
        });

        // Spinner for modal loader
        $(document).ajaxStart(function() {
            $('#loader').show();
        }).ajaxStop(function() {
            $('#loader, ._loader').hide();
        });
    });
});