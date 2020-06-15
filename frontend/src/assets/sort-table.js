$('th').on('click', function() {
    var column = $(this).data('column')
    var order = $(this).data('order')
    console.log('Column was clicked!', column, order);
})