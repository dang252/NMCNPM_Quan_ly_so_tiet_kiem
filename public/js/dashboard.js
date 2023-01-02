$(".sidebarButton").click(function(){
    $(".sidebar").css({"min-width": "100%", "display": "flex"})
    $(".mainDashboard").hide();
    $(".profilebar").hide();

})

$(".sidebarHide").click(function(){
    $(".sidebar").removeAttr('style');
    $(".mainDashboard").removeAttr('style');
    $(".profilebar").removeAttr('style');
})