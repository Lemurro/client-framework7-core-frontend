/**
 * Создадим маску для кода авторизации
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro._bindCodeMask = function () {
    $$('.js-code-mask').each(function () {
        var element = $$(this);

        Inputmask({
            'mask': '9999'
        }).mask(element);
    });
};