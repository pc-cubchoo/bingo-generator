$(() => {
    // Initializing all the tooltips
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(element => new bootstrap.Tooltip(element));
})