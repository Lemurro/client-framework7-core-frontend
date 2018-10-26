/**
 * Загрузочный скрипт приложения
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */

var app;
var $$;
var mainView;

window.onload = function () {
    if (modeCordova) {
        document.addEventListener('deviceready', lemurro.init);
        document.addEventListener('offline', lemurro.internet.offline);
        document.addEventListener('online', lemurro.internet.online);
    } else {
        lemurro.init();
    }
};

/**
 * Объект главного скрипта
 *
 * @type {object}
 */
var lemurro = {};

/**
 * ИД сессии
 *
 * @type {string}
 */
lemurro.sessionID = '';

/**
 * Настройки приложения
 *
 * @type {object}
 */
lemurro.settings = {};

/**
 * Настройки framework7
 *
 * @type {object}
 */
lemurro.f7settings = {};
/**
 * Инициализация
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.init = function () {
    if (window.overrideSettings === undefined) {
        window.overrideSettings = {};
    }

    if (window.overrideF7Settings === undefined) {
        window.overrideF7Settings = {};
    }

    lemurro.settings = Object.assign({
        versionAPI   : 1,
        authType     : 'email',
        pageAfterAuth: '/home',
        marketiOS    : 'https://itunes.apple.com/us/app/lemurro/id0000000000?l=ru&ls=1&mt=8',
        marketAndroid: 'market://details?id=ru.bestion.lemurro',
        onLoad       : function (data) {
            var template = Template7.compile($$('#js-tpl-user__info').html());

            $$('#js-user_info').html(template(data));
        }
    }, window.overrideSettings);

    lemurro.f7settings = Object.assign({
        id     : 'ru.bestion.lemurro',
        name   : 'Lemurro',
        version: '0.1.0',
        theme  : 'md',
        root   : '#app',
        panel  : {
            swipe: 'both'
        },
        touch  : {
            fastClicks: false
        },
        on     : {
            pageInit: function (event) {
                app.panel.close();
                lemurro._initPage(event.name);
            }
        },
        routes : [
            {
                path: '/about',
                url : './pages/about.html'
            }, {
                path: '/home',
                url : './pages/home.html'
            }
        ]
    }, window.overrideF7Settings);

    lemurro._bindJSerrors();

    app      = new Framework7(lemurro.f7settings);
    $$       = Dom7;
    mainView = app.views.create('.view-main');

    $$('#js-api-version').text(lemurro.settings.versionAPI);

    lemurro._showLoginScreen();

    app.request.setup({
        cache      : false,
        crossDomain: true,
        timeout    : 20000,
        beforeSend : function (xhr) {
            if (xhr.requestUrl.substr(0, pathServerAPI.length) === pathServerAPI) {
                xhr.requestParameters.dataType = 'json';
                xhr.setRequestHeader('X-SESSION-ID', lemurro.sessionID);
            }
        },
        error      : function (xhr, status) {
            app.preloader.hide();

            var message = 'Неизвестная ошибка';

            switch (status) {
                case 'timeout'    :
                    message = 'Время ожидания истекло';
                    break;

                case 'parsererror':
                    message = 'Ошибка парсера';
                    break;

                case 'abort'      :
                    message = 'Запрос был отменён';
                    break;

                case 'error'      :
                    message = 'Произошла ошибка сервера';
                    break;
            }

            app.dialog.alert(message, 'Ошибка запроса');
        }
    });

    lemurro._run();
};
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
/**
 * Внешние ссылки откроем в браузере
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro._bindExternalLink = function () {
    $$(document).on('click', 'a[target="_blank"]', function (e) {
        window.open($$(this).attr('href'), '_system');
        e.preventDefault();

        return false;
    });
};
/**
 * Событие отправки javascript-ошибки при возникновении
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro._bindJSerrors = function () {
    /**
     * Отправка javascript-ошибки
     *
     * @param {string} msg
     * @param {string} file
     * @param {string} line
     * @param {string} col
     * @param {string} err
     *
     * @version 05.07.2018
     * @author  Дмитрий Щербаков <atomcms@ya.ru>
     */
    function sendError(msg, file, line, col, err) {
        var errString = 'JSON not found';
        if (window.JSON) {
            errString = JSON.stringify(err);
        }

        if (typeof(msg) === 'object') {
            file      = msg.filename;
            line      = msg.lineno;
            col       = msg.colno;
            errString = msg.error.stack;
            msg       = msg.message;
        }

        new Image().src = pathServerAPI + 'jserrors?msg=' + encodeURIComponent(msg) + '&file=' + encodeURIComponent(file) + '&line=' + encodeURIComponent(line) + '&col=' + encodeURIComponent(col) + '&err=' + encodeURIComponent(errString);
    }

    if (window.addEventListener) {
        window.addEventListener('error', sendError, false);
    } else if (window.attachEvent) {
        window.attachEvent('onerror', sendError);
    } else {
        window.onerror = sendError;
    }
};
/**
 * Создадим маску для телефона
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro._bindPhoneMask = function () {
    $$('.js-phone-mask').each(function () {
        var element = $$(this);

        Inputmask({
            'mask': '+7 (999) 999-99-99'
        }).mask(element);
    });
};
/**
 * Покажем popover
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro._bindShowPopover = function () {
    $$('body').on('click', '.js-show-popover', function () {
        app.dialog.alert($$(this).attr('data-popover'), '');
    });
};
/**
 * Определим загруженную страницу и запустим ее init() если он есть
 *
 * @param {string} pageName Имя страницы
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro._initPage = function (pageName) {
    app.preloader.show();
    app.request.get(pathServerAPI + 'user', {}, function (result) {
        app.preloader.hide();

        if (result.hasOwnProperty('errors')) {
            lemurro.showErrors(result.errors);
        } else {
            lemurro.settings.onLoad(result.data);

            var pageScript = window[pageName];

            if (pageScript !== undefined) {
                if (pageScript.hasOwnProperty('init')) {
                    pageScript.init();
                }
            }
        }
    });
};
/**
 * Запуск приложения
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro._run = function () {
    app.preloader.show();
    app.request.get(pathServerAPI, {}, function (result) {
        app.preloader.hide();

        if (result.hasOwnProperty('errors')) {
            lemurro.showErrors(result.errors);
        } else {
            if (modeCordova && parseInt(result.data.version[device.platform.toLowerCase()], 10) > lemurro.settings.versionAPI) {
                var popup = $$('#js-popup');

                popup.find('.popup__title').html('&nbsp;');
                popup.find('.popup__content').html(
                    '<div class="text-align-center">' +
                    '<h1><i class="fas fa-thumbs-up font-100"></i></h1>' +
                    '<h1>Ура, вышла новая версия приложения!</h1>' +
                    '<h3>Чтобы продолжить, обновите приложение из магазина.</h3>' +
                    '<p><a href="javascript:lemurro.update();" class="button button-raised button-fill">Обновить</a></p>' +
                    '</div>'
                );
                popup.find('.close-popup').hide();

                app.popup.open(popup);
            } else {
                lemurro._bindShowPopover();
                lemurro._bindPhoneMask();
                lemurro._bindCodeMask();
                lemurro._bindExternalLink();

                localforage.getItem('sessionID', function (err, value) {
                    lemurro.sessionID = value;

                    if (lemurro.sessionID !== null) {
                        lemurro.auth.check();
                    }
                });
            }
        }
    });
};
/**
 * Покажем форму входа
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro._showLoginScreen = function () {
    $$('#js-login-screen .js-auth-form').hide();
    $$('#js-auth-' + lemurro.settings.authType + '-get-form').show();
    app.loginScreen.open('#js-login-screen');
};
/**
 * Отображение ошибок
 *
 * @param errors array Массив ошибок
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.showErrors = function (errors) {
    if (errors.length === 1 && errors[0].status === '401 Unauthorized') {
        lemurro._showLoginScreen();
    } else {
        for (var i in errors) {
            var item  = errors[i];
            var title = '';

            switch (item.code) {
                case 'danger':
                    title = 'Критическая ошибка';
                    break;

                case 'warning':
                    title = 'Внимание!';
                    break;

                case 'info':
                    title = 'Информация';
                    break;
            }

            app.dialog.alert(item.title, title);
        }
    }
};
/**
 * Запускаем обновление приложения
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.update = function () {
    var market = 'market' + device.platform;

    if (modeCordova && lemurro.settings.hasOwnProperty(market)) {
        window.open(lemurro.settings[market], '_system');
        e.preventDefault();
    } else {
        app.dialog.alert('Здесь должна быть ссылка на магазин "' + device.platform + '"', 'Магазин');
    }

    return false;
};
/**
 * Проверка сессии при запуске приложения
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */

/**
 * Объект элемента
 *
 * @type {object}
 */
lemurro.auth = {};

/**
 * ИД таймера
 *
 * @type {int|null}
 *
 * @public
 */
lemurro.auth._timerID = null;
/**
 * Запуск таймера
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.auth._runTimer = function () {
    if (lemurro.auth._timerID !== null) {
        clearInterval(lemurro.auth._timerID);
    }

    lemurro.auth._timerID = setInterval(function () {
        var formCode  = $$('#js-auth-' + lemurro.settings.authType + '-check-form');
        var elemTimer = formCode.find('.js-timer__count');
        var count     = parseInt(elemTimer.text(), 10);

        if (count > 0) {
            elemTimer.text(--count);
        } else {
            clearInterval(lemurro.auth._timerID);
            formCode.find('.js-timer').hide();
            formCode.find('.js-resend').show();
        }
    }, 1000);
};
/**
 * Проверка сессии
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.auth.check = function () {
    app.preloader.show();
    app.request.get(pathServerAPI + 'auth/check', {}, function (result) {
        app.preloader.hide();

        if (result.hasOwnProperty('errors')) {
            localforage.clear();
            lemurro.sessionID = '';
        } else {
            app.loginScreen.close('#js-login-screen');
            app.router.navigate(lemurro.settings.pageAfterAuth);
        }
    });
};
/**
 * Проверка введенного кода
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.auth.checkCode = function () {
    var deviceInfo = {
        uuid        : 'q1w2e3r4t5y6u7i8o9p0',
        platform    : 'TestOS',
        version     : '1.0',
        manufacturer: 'Samsung',
        model       : 'Galaxy S8'
    };

    if (modeCordova) {
        deviceInfo = {
            uuid        : device.uuid,
            platform    : device.platform,
            version     : device.version,
            manufacturer: device.manufacturer,
            model       : device.model
        };
    }

    app.preloader.show();
    app.request.post(pathServerAPI + 'auth/code', {
        'auth_id'    : $$('#js-auth-' + lemurro.settings.authType + '-get-form').find('input[name="auth_id"]').val(),
        'auth_code'  : $$('#js-auth-' + lemurro.settings.authType + '-check-form').find('input[name="auth_code"]').val(),
        'device_info': deviceInfo
    }, function (result) {
        app.preloader.hide();

        if (result.hasOwnProperty('errors')) {
            lemurro.showErrors(result.errors);
        } else {
            localforage.setItem('sessionID', result.data.session, function () {
                Deferred.next(function () {
                    lemurro.sessionID = result.data.session;
                }).next(function () {
                    app.loginScreen.close('#js-login-screen');
                    app.router.navigate(lemurro.settings.pageAfterAuth);
                });
            });
        }
    });
};
/**
 * Получение кода
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.auth.getCode = function () {
    app.preloader.show();
    app.request.get(pathServerAPI + 'auth/code', {
        'auth_id': $$('#js-auth-' + lemurro.settings.authType + '-get-form').find('input[name="auth_id"]').val()
    }, function (result) {
        app.preloader.hide();

        if (result.hasOwnProperty('errors')) {
            lemurro.showErrors(result.errors);
        } else {
            var formCode = $$('#js-auth-' + lemurro.settings.authType + '-check-form');

            formCode.find('.js-timer').show();
            formCode.find('.js-timer__count').text('60');
            formCode.find('.js-resend').hide();

            lemurro.auth._runTimer();

            $$('#js-auth-' + lemurro.settings.authType + '-get-form').hide();
            formCode.show();
        }
    });
};
/**
 * Хелперы
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */

/**
 * Объект элемента
 *
 * @type {object}
 */
lemurro.helper = {};
/**
 * Покажем подтверждение
 *
 * @param {string}   title              Заголовок
 * @param {string}   content            HTML-Содержимое
 * @param {string}   confirmButtonText  Текст кнопки "OK"
 * @param {string}   cancelButtonText   Текст кнопки "Cancel"
 * @param {function} callbackOpen       Функция при открытии формы
 * @param {function} callbackPreConfirm Функция перед вызовом callbackConfirm
 * @param {function} callbackConfirm    Функция при нажатии confirmButton
 * @param {function} callbackCancel     Функция при нажатии cancelButton
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.helper.showConfirm = function (title, content, confirmButtonText, cancelButtonText, callbackOpen, callbackPreConfirm, callbackConfirm, callbackCancel) {
    swal({
        title             : title,
        html              : content,
        type              : '',
        allowOutsideClick : false,
        showCancelButton  : true,
        confirmButtonColor: '#2196f3',
        confirmButtonText : confirmButtonText,
        cancelButtonText  : cancelButtonText,
        onOpen            : callbackOpen,
        preConfirm        : callbackPreConfirm
    }).then(function () {
        callbackConfirm();
    }, function (dismiss) {
        // dismiss can be 'cancel', 'overlay', 'close', and 'timer'
        if (dismiss !== '' && callbackCancel !== null) {
            callbackCancel();
        }
    });
};
/**
 * Покажем всплывающее окно
 *
 * @param title   string Заголовок окна
 * @param content string HTML-Содержимое
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.helper.showPopup = function (title, content) {
    var popup = $$('#js-popup');

    popup.find('.popup__title').html(title);
    popup.find('.popup__content').html(content);

    app.popup.open(popup);
};
/**
 * Проверка интернета
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */

/**
 * Объект элемента
 *
 * @type {object}
 */
lemurro.internet = {};
/**
 * Пропал интернет
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.internet.offline = function () {
    app.dialog.preloader('Пропал интернет,<br>надо вернуть.');
};
/**
 * Появился интернет
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.internet.online = function () {
    app.dialog.close();
};