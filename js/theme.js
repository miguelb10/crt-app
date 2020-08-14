(function($) {
    "use strict";

    var nav_offset_top = $("header").height() + 50;



    function navbarFixed() {
        if ($(".header_area")) {
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                if (scroll >= 10) {
                    $(".header_area").addClass("navbar_fixed");
                    $(".img_t").addClass("img_reduce");
                    $(".img_t").removeClass("img_logo");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                    $(".img_t").addClass("img_logo");
                    $(".img_t").removeClass("img_reduce");
                }
            });
        }
    }
    navbarFixed()

    $(function() {

        var menues = $(".nav li");

        menues.click(function() {
            menues.removeClass("active");
            $(this).addClass("active");
        });

    });

    $(".displayNone").click(function() {
        $('#hide-me').css('visibility', 'visible');

        if ($('#hide-me').is(":visible")) {
            $('#hide-me').css('display', 'none');
        } else {
            $('#hide-me').css('display', 'block');
        }
    });

    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    $(document).on("click", function(e) {

        var container = $("#container");

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.navbar-collapse').collapse('hide');
        }
    });


})(jQuery);

function hideBlock() {
    if (document.getElementById('content_hide_block').style.display == "none") {
        document.getElementById('content_hide_block').style.display = "block";
    } else {
        document.getElementById('content_hide_block').style.display = "none";
    }
}

$(document).ready(function() {
    $('#carouselExample1').carousel({
        interval: 1000
    });
});

$('#carouselExample1').on('slide.bs.carousel', function(e) {


    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $('.carousel-item').length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
            if (e.direction == "left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            } else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});

$(document).ready(function() {
    $('a.thumb').click(function(event) {
        event.preventDefault();
        var content = $('.modal-body');
        content.empty();
        var title = $(this).attr("title");
        $('.modal-title').html(title);
        content.html($(this).html());
        $(".modal-profile").modal({ show: true });
    });

    $('#formCorreo').on('submit', function(e) {
        e.preventDefault();
        if (validarFormulario()) {
            $.ajax({
                url: 'api/correo/correo.php',
                type: "POST",
                data: $(this).serialize(),
                async: true,
                success: function(response) {
                    var response = JSON.parse(response);
                    if (response.success == 1) {
                        $(document).ready(function() {
                            $("#ModalConf").modal("show");
                            document.getElementById("formCorreo").reset();
                        });
                    } else {
                        $(document).ready(function() {
                            $("#ModalErr").modal("show");
                        });
                    }
                }
            });
        }
    });
});

function saltarA(id, tiempo) {
    var tiempo = tiempo || 1000;
    $("html, body").animate({ scrollTop: $(id).offset().top - 55 }, tiempo);
}

function soloNumeros(e) {
    var key = window.Event ? e.which : e.keyCode
    return (key >= 48 && key <= 57)
}

function validarFormulario() {

    var txtNombre = document.getElementById('nombre').value;
    var txtCorreo = document.getElementById('correo').value;
    var numCelular = document.getElementById('celular').value;
    var numRuc = document.getElementById('ruc').value;
    var txtAsunto = document.getElementById('asunto').value;
    var txtEmpresa = document.getElementById('empresa').value;
    var txtMensaje = document.getElementById('mensaje').value;

    if (txtNombre == null || txtNombre.length == 0 || /^\s+$/.test(txtNombre)) {
        alert('ERROR: El campo nombre no debe estar vacío');
        document.getElementById("nombre").select();
        return false;
    }

    if (!(/\S+@\S+\.\S+/.test(txtCorreo))) {
        alert('ERROR: Debe escribir un correo válido');
        document.getElementById("correo").select();
        return false;
    }

    if (numCelular == null || numCelular.length == 0 || isNaN(numCelular) || numCelular.length < 9) {
        alert('ERROR: El campo celular debe contener 9 dígitos');
        document.getElementById("celular").select();
        return false;
    }

    if (numRuc == null || numRuc.length == 0 || isNaN(numRuc) || numRuc.length < 11 || numRuc.length > 11) {
        alert('ERROR: El campo RUC debe contener 11 dígitos');
        document.getElementById("ruc").select();
        return false;
    }

    if (txtAsunto == null || txtAsunto.length == 0 || /^\s+$/.test(txtAsunto)) {
        alert('ERROR: El campo asunto no debe estar vacío');
        document.getElementById("asunto").select();
        return false;
    }

    if (txtEmpresa == null || txtEmpresa.length == 0 || /^\s+$/.test(txtEmpresa)) {
        alert('ERROR: El campo empresa no debe estar vacío');
        document.getElementById("empresa").select();
        return false;
    }

    if (txtMensaje == null || txtMensaje.length == 0 || /^\s+$/.test(txtMensaje) || txtMensaje.length > 500) {
        alert('ERROR: El campo mensaje no debe estar vacío o contener mas de 500 caracteres');
        document.getElementById("mensaje").select();
        return false;
    }

    return true;
}