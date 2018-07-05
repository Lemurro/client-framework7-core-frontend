/**
 * Создадим маску для телефона
 *
 * @version 05.07.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
bootstrap._bindPhoneMask = function () {
    $$('.js-phone-mask').each(function () {
        var element = $$(this);

        Inputmask({
            'mask': '+7 (999) 999-99-99'
        }).mask(element);
    });
};