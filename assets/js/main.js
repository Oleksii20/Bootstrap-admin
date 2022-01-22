$(document).ready(function(){


    //editable input button
    $('.edit-btn, .save-btn').on('click', function(e){
        e.preventDefault();
        const $wrapp = $(this).closest('.edit-input');
        const $input = $wrapp.find('.editable-input');
        $wrapp.toggleClass('is-readonly is-editing');
        const isReadonly  = $wrapp.hasClass('is-readonly');
        $wrapp.find('.editable-input').prop('disabled', isReadonly);
        if (!isReadonly) {
            const temp = $input.val();
            $input.focus().val('').val(temp);
        }
    });

    $('.edit-id').on('click', function(){
        const $wrapp = $(this).parent().next('.edit-input-wrapp ').find('.edit-input');
        const $input = $wrapp.find('.editable-input');
        $wrapp.toggleClass('is-readonly is-editing');
        const isReadonly  = $wrapp.hasClass('is-readonly');
        $wrapp.find('.editable-input').prop('disabled', isReadonly);
        if (!isReadonly) {
            const temp = $input.val();
            $input.focus().val('').val(temp);
        }
        $(this).find('i').toggleClass('show');
    });

    //numbers only
    function numberOnlyInput(selector){
        if ($(selector).length) {
            $(selector).keypress(function (e) {
                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                    return false;
                }
            });
        }
    };


    //resize input
    $.fn.textWidth = function(text, font) {
        if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
        $.fn.textWidth.fakeEl.text(text || this.val() || this.text() || this.attr('placeholder')).css('font', font || this.css('font'));
        return $.fn.textWidth.fakeEl.width();
    };

    var targetElem = $('.width-dynamic');

    targetElem.on('input', function() {
        var inputWidth = $(this).textWidth() + 10;
        $(this).css({
            width: inputWidth
        })
    }).trigger('input');

    function inputWidth(elem, minW, maxW) {
        elem = $(this);
    };

    inputWidth(targetElem);
    

    //adaptive sidebar
    const sidebar = $('.sidebar');
    $('.open-sidebar').on('click', function(e){
        e.preventDefault();
        sidebar.addClass('show')
    });
    $(document).mouseup(function(e){
        if (!sidebar.is(e.target) && sidebar.has(e.target).length === 0) {
            sidebar.removeClass('show');
        }
    });

    //date plugin init
    function dateInputInit() {
        if ($('.date-control').length) {
            $('.date-control').each(function() {
                $(this).datetimepicker({
                    uiLibrary: 'bootstrap4',
                    modal: true,
                    footer: true,
                    format: 'yyyy.mm.dd HH:MM'
                });
            })
        }
    }
    dateInputInit();

    //date plugin init in modals
    $('.modal').on('show.bs.modal', function () {
        dateInputInit();  
    });

    //additionalPaymentGeneratorModal events
    $('#additionalPaymentGeneratorModal').on('show.bs.modal', function () {
        numberOnlyInput('.number');
    });

    //color massage pick
    $('.color-massage__box a').on('click', function(e) {
        e.preventDefault();
        let color = $(this).css('background-color');
        $(this).closest('.modal-body').find('.colored-message').css({
            'background-color': color,
            'color': '#fff'
        });
    });


    //add date input on button click
    function addCustomDateInput(id = 'customDefault') {
        const customDateInput = `<div class="col-lg-4 custom-date-input mb-3">
            <div class="form-group date-group date-group-custom">
                <label>
                    <span type="text" class="editable-input custom-label" placeholder="Label" contenteditable>Custom ddl:</span>
                </label>
                <input type="text" class="form-control date-control border-right-0" id=${id} placeholder="Select date" readonly>
                <span class="hours-count red ml-1">-2 hrs</span>
            </div>
        </div>`;
        $(customDateInput).appendTo($('.dates-widget-body .row'));
        dateInputInit();
    };

    $('.add-custom-input').on('click', function() {
        $(this).toggleClass('delete');
        if(!$(this).hasClass('delete')){
            $('.dates-widget-body .row').find('.custom-date-input').remove();
        } else {
            addCustomDateInput();
            const $inputLabel = $('.dates-widget-body .row').find('.custom-date-input .custom-label');
            const temp = $inputLabel.val() + ':';
            $inputLabel.focus().val('').val(temp);
        }
    });

    //topic edit options
    $('.topic-text input').on('click', function() {
        $(this).removeAttr('readonly');
    });
    $('.topic-text input').on('focusout', function() {
        $(this).attr('readonly', true);
    });

    //files collapse options
    $('.files-collapse-action').on('click', function() {
        $(this).closest('.widget-header').toggleClass('closed');
    });

    //dropzone
    var $fileInput = $('.file-input');
    var $droparea = $('.file-drop-area');

    // highlight drag area
    $fileInput.on('dragenter focus click', function() {
        $droparea.addClass('is-active');
    });

    // back to normal state
    $fileInput.on('dragleave blur drop', function() {
        $droparea.removeClass('is-active');
    });

    // change inner text
    $fileInput.on('change', function() {
        var filesCount = $(this)[0].files.length;
        var $textContainer = $(this).prev();

        if (filesCount === 1) {
        // if single file is selected, show file name
        var fileName = $(this).val().split('\\').pop();
        $textContainer.text(fileName);
        } else {
        // otherwise show number of files
        $textContainer.text(filesCount + ' files selected');
        }
    });


    //notification edit
    $('.notification-controls .del').on('click', function() {
        $(this).closest('.widget').remove();
    });

    $('.notification-controls .edit').on('click', function() {
        const notificationText = $(this).closest('.widget').find('.notification-text span').text();
        const notificationColor = $(this).closest('.widget').css('background-color');
        $('#setReminderModal .colored-message').text(notificationText).css({
            'background-color': notificationColor,
            'color': '#fff'
        });
    });

    $('.set-reminder-action').on('click', function() {
        $('#setReminderModal .colored-message').text('').removeAttr('style');
    });

    //note delete
    $('.widget-note__header .del').on('click', function() {
        $(this).closest('.widget-note').remove();
    });

    //file delete
    $('.upload-item__del').on('click', function(e) {
        e.preventDefault();
        $(this).closest('.upload-item').remove();
    });

    //toggle active badge
    $('.icon-all__box').on('click', 'li img', function () {
        $('.icon-all__box li img').each(function() {
            $(this).removeClass('active');
        });
        $(this).addClass('active')
    });

    //sidebar active toggle
    $('.sidebar').on('click', '.list-group-item', function (e) {
        e.preventDefault();
        $('.sidebar .list-group-item').each(function() {
            $(this).removeClass('active');
        });
        $(this).addClass('active')
    });
    
});