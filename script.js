let challenges = [
    {id:0, text:"What's Your Sign?"},
    {id:1, text:"Monocolor"},
    {id:2, text:"Monotype"},
    {id:3, text:"Monoletter"},
    {id:4, text:"Highest Stat"},
    {id:5, text:"Scramble"},
    {id:6, text:"Gift Challenge"},
    {id:7, text:"Love at First Sight"},
    {id:8, text:"Signature Move"},
    {id:9, text:"Rainbow Road"},
    {id:10, text:"Type Link"},
    {id:11, text:"Pick-A-Route"},
    {id:12, text:"NFE Team"},
    {id:13, text:"Stone Alone"},
	{id:14, text:"Hit the Gym"},
	{id:15, text:"The Culinary Challenge"},
	{id:16, text:"Retrograde", exclude: ["kanto", "unova"]},
	{id:17, text:"Elite Mash Up"},
	{id:18, text:"The Character Challenge"},
	{id:19, text:"The Champion Challenge"},
	{id:20, text:"Rocket Challenge", include: ["kanto", "johto"]},
	{id:21, text:"AquaMagma Challenge", include: ["hoenn"]},
	{id:22, text:"Space Nerds Challenge", include: ["sinnoh"]},
	{id:23, text:"Blood Tranfusions", include: ["unova"]},
	{id:24, text:"Flair of Flare Challenge", include: ["kalos"]},
	{id:25, text:"Hooligans and Vagabonds Challenge", include: ["alola"]},
	{id:26, text:"Raise Your Voice Challenge", include: ["galar"]},
	{id:27, text:"Unusual Sighting"},
	{id:28, text:"The Nuzlocke Challenge"},
	{id:29, text:"The Wedlocke Challenge"},
	{id:30, text:"The Wonderlocke Challenge", include: ["kalos", "alola", "galar"]},
	{id:31, text:"Solo Run"},
	{id:32, text:"Duo-Species Challenge"},
	{id:33, text:"Trio-Species Challenge"},
	{id:34, text:"The Mega Evolution Challenge", exclude: ["unova"]},
	{id:35, text:"Z-moves Challenge", include: ["alola"]},
	{id:36, text:"Your (User)Name Challenge"},
	{id:37, text:"The In-Order Challenge"},
	{id:38, text:"Sunny Days Challenge", exclude: ["kanto"]},
	{id:39, text:"Sandy Days Challenge", exclude: ["kanto"]},
	{id:40, text:"Icy Days Challenge", exclude: ["kanto"]},
	{id:41, text:"Rainy Days Challenge", exclude: ["kanto"]},
	{id:42, text:"The Likeminded Challenge", exclude: ["kanto", "johto"]},
	{id:43, text:"The Trainer Class Challenge"}
]

$(document).ready(() => {
    // Initializing all the tooltips
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(element => new bootstrap.Tooltip(element));

    // Custom exclusion select
    $('.custom-exclude').select2({
        data: challenges,
        width: '100%'
    });

    // Only show custom exclusion select if custom is checked
    $('#custom').on('click', () => {
        $('#select-wrapper').toggleClass("d-none");
    })

    $('#gen-btn').on('click', () => {
        let {err, configs} = getConfig();
        console.log(err, configs);

        if (err !== null) {
            display(err);
        }

        let card = getCard(configs);
        display(card);
    })
});

function getRegions() {
    let regions = [];

    [...$('.checkbox-wrapper input[type="checkbox"]:checked')].forEach(element => 
        regions.push(
            $(element).attr('id')
        )
    );
    
    return regions;
}

function sample(list) {
    let index = Math.floor((Math.random()*list.length));
    return list[index];
}

function getDistribution() {
    let distributionName = $('input[name="distribution"]:checked').attr('id');

    if (distributionName === "uniform") {
        return (card, options) => sample(options);
    }

    console.log(distributionName);
}

function getConfig() {
    let configs = {};
    let errs = [];

    let numberChallenges = +$('#num-challenges').val();
    if (numberChallenges < 1 || numberChallenges > 44) {
        errs.push("Number of challenges should be integer between 1 and 44.")      
    }
    configs.numberChallenges = numberChallenges;

    let regions = getRegions();
    if (regions.length === 0) {
        errs.push("Select at least one region.");
    }
    configs.regions = regions;

    configs.distribution = getDistribution();

    if (errs.length !== 0) {
        return { err: errs, configs };
    }

    return { err: null, configs };
}