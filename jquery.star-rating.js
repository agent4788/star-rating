(function ($) {
    $.fn.starRating = function (setup) {
        let settings = $.extend(true, {
            wrapperClasses: '',
            starIconEmpty: 'far fa-star',
            starIconFull: 'fas fa-star',
            starColorEmpty: 'lightgray',
            starColorFull: '#FFC107',
            starsSize: 1.5, // em
            stars: 5,
            showInfo: false,
            titles: ["Sehr schlecht", "Schlecht", "Mittel", "Gut", "Sehr gut!"],
            inputName: 'rating',
            baseRating: 0
        }, setup || {});

        $(this).each(function (i, e) {
            return init($(e))
        });

        function getTextColor(value) {
            switch (true) {
                case value < (settings.stars / 3):
                    return 'red';
                case value < (settings.stars / 3 * 2):
                    return 'orange';
                default:
                    return 'green';
            }
        }

        function init(wrapper) {
            if (!wrapper.hasClass('js-wc-star-rating')) {

                let starWrapper = $('<div>', {
                    css: {}
                }).appendTo(wrapper);

                for (let i = 1; i <= settings.stars; i++) {

                    var inputChecked = (i <= settings.baseRating ? 'checked' : '');
                    $('<input>', {
                        type: 'radio',
                        value: i,
                        name: settings.inputName,
                        checked: inputChecked,
                        css: {
                            display: 'none'
                        }
                    }).appendTo(starWrapper);

                    var starColor = i <= settings.baseRating ? settings.starColorFull : settings.starColorEmpty;
                    var starIcon = i <= settings.baseRating ? settings.starIconFull : settings.starIconEmpty;
                    $('<i>', {
                        'data-index': i - 1,
                        title: settings.titles[i - 1] || i + " Sterne",
                        css: {
                            color: starColor,
                            margin: '2px',
                            fontSize: settings.starsSize + 'em'
                        },
                        class: starIcon
                    }).appendTo(starWrapper);

                }

                settings.wrapperClasses.split(' ').forEach(className => {
                    wrapper.addClass(className);
                });
                if (settings.showInfo) {
                    $('<strong>', {
                        html: "0",
                        class: 'js-wc-rating-value',
                        css: {
                            fontSize: "5em"
                        }
                    }).insertBefore(starWrapper);

                    $('<h4>', {
                        class: 'js-wc-label',
                        css: {
                            marginTop: 0
                        },
                        html: "Bewerte uns!"
                    }).insertBefore(starWrapper);
                }
                wrapper.css({
                })
                wrapper.addClass('js-wc-star-rating');
                events(wrapper);
            }

            function events(wrapper) {
                wrapper
                    .on('click', 'i', function (e) {
                        let index = $(e.currentTarget).data('index'),
                            value = index + 1,
                            label = settings.titles[index] || value + " Sterne";
                        // select radio
                        wrapper.find('input[type="radio"][value="' + value + '"]').prop('checked', true);
                        if (settings.showInfo) {
                            wrapper.find('.js-wc-rating-value').text(value).css('color', getTextColor(value));
                            wrapper.find('.js-wc-label').text(label).css('color', getTextColor(value));
                        }

                        // set stars
                        let allStars = wrapper
                            .find('i')
                            .css('color', settings.starColorEmpty)
                            .removeClass(settings.starIconFull)
                            .addClass(settings.starIconEmpty);

                        allStars.each(function (i, e) {
                            if (i <= index) {
                                $(e)
                                    .removeClass(settings.starIconEmpty)
                                    .addClass(settings.starIconFull)
                                    .css('color', settings.starColorFull);
                            }
                        });

                        wrapper.trigger('change', [value, index]);
                    })
            }

            return this;
        }

    };
}(jQuery));
