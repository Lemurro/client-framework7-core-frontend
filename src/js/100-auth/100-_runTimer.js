/**
 * Запуск таймера
 *
 * @version 05.07.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
auth._runTimer = function () {
    if (auth._timerID !== null) {
        clearInterval(auth._timerID);
    }

    auth._timerID = setInterval(function () {
        var formCode  = $$('#js-auth-' + bootstrap.settings.authType + '-check-form');
        var elemTimer = formCode.find('.js-timer__count');
        var count     = parseInt(elemTimer.text(), 10);

        if (count > 0) {
            elemTimer.text(--count);
        } else {
            clearInterval(auth._timerID);
            formCode.find('.js-timer').hide();
            formCode.find('.js-resend').show();
        }
    }, 1000);
};