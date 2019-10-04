/*

 Sorting algoritms visualizer by Håvard Hjelmeseth

 */

var svg = d3.select("svg"); // Select svg

// Dimensions of svg element
var margin = 30;
var width = document.getElementById('svg').clientWidth - 2 * margin;
var height = svg.attr("height") - 2 * margin;

// Create scale on the y axis
var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

var yAxis = svg.append("g")
    .attr("transform", "translate(" + margin + ", " + margin + ")")
    .call(d3.axisLeft(yScale));

// Create a group that contains the rectangles
var rectangleGroup = svg.append("g")
    .attr("id", "rectangleGroup")
    .attr("transform", "translate(" + margin + ", " + margin + ")");



data = []; // Array containing heights of rectangles
var sorting = false; // Boolean to hinder sorting while already sorting

/*
UI FUNCTIONS
*/

// Draws rectangles from an array containing heights, calculates width automatically based on size of svg and length of array
function drawRectangles(array) {
    svg.select("#rectangleGroup").selectAll("rect").remove()
    for (i = 0; i < array.length; i++) {
        rectangleGroup.append("rect")
            .attr("class", "box")
            .attr("width", (width - 20) / array.length)
            .attr("height", array[i] * (height / 100))
            .attr("x", 10 + i * (width / array.length))
            .attr("y", height - (array[i] * (height / 100)))
            .attr("fill", "#6c757e")
            .attr("style", "stroke: black; stroke-width: 1;")
    }
}

// Disables buttons while sorting
function disableButtons() {
    var buttons = document.getElementsByTagName('button');
    for (var i = 0; i < 2; i++) { //Replace 2 with buttons.length eventually
        buttons[i].classList.add("disabled");
        buttons[i].disabled = true;
    }
}

// Enables buttons after sorting
function enableButtons() {
    var buttons = document.getElementsByTagName('button');
    for (var i = 0; i < 2; i++) { //Replace 2 with buttons.length eventually
        buttons[i].classList.remove("disabled");
        buttons[i].disabled = false;
    }
}

/*
GENERATOR FUNCTIONS
*/

//Generates a random array of size "size"
function generateArray(size) {
    arr = []
    for (i = 0; i < size; i++) {
        arr.push(Math.random() * 100)
    }
    return arr
}

// Generates new data and draws it
function drawData() {
    data = generateArray(80)
    drawRectangles(data)
}


/*
SORTING FUNCTIONS
*/

// Bubblesort
function* bubbleSort(array) { // Generator function
    var did_swap = false;
    var step = 0;
    do {
        did_swap = false;
        for (var i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                did_swap = true;
                step++;

                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                drawRectangles(array);
                yield did_swap;
            }
        }
    } while (did_swap);
    // Runs after sorting is finished
    sorting = false
    enableButtons();
}

function start_bubbleSort(option) {
    var sort = bubbleSort(data);

    function animate() {
        requestAnimationFrame(animate);
        sort.next();
    }
    animate(data);
}

// Mergesort



/*
HANDLE BUTTON PRESSES
*/

function handleBubblesort() {
    if (sorting === false) {
        sorting = true
        disableButtons();
        start_bubbleSort();
    }
}