$(document).ready(function() {
    $(".full-landing-image").ripples({
        resolution: 200,
        perturbance: 0.04,
    });

     // Ajouter des gouttes initiales pour voir les ondulations
    //  setInterval(function() {
    //     var $el = $('.container');
    //     var x = Math.random() * $el.outerWidth();
    //     var y = Math.random() * $el.outerHeight();
    //     var dropRadius = 20;
    //     var strength = 0.04 + Math.random() * 0.04;

    //     $el.ripples('drop', x, y, dropRadius, strength);
    // }, 400);
});