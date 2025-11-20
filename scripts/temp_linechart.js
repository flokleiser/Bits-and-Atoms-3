const width = 940
const height = 400
const marginTop = 20
const marginRight = 20
const marginBottom = 30
const marginLeft = 70


//ranges of the plot
const x = d3.scaleLinear()
    .range([marginLeft, width - marginRight])

const y = d3.scaleLinear()
    .domain([35, 41])
    // .domain([0, d3.max(data, d => d.temperature)])
    .range([height - marginBottom, marginTop])


//svg generator
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)


//parsing the data?
d3.json("../datasets/temp.json").then(data => {
    data.forEach(d => {
        d.minute = parseInt(d.time.split(":")[0], 10)
        d.temperature = +d.temperature
    })

    x.domain(d3.extent(data, d => d.minute))


    //line generator
    const line = d3.line()
        .x(d => x(d.minute))
        .y(d => y(d.temperature))

    //x axis
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x))

    //y axis
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y))
        //this makes lines
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))

        .call(g => g.append("text")
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("Temp"));


    //makes the line
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("d", line)

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height)
        .attr("text-anchor", "middle")
        .text("Time")

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .text("Temp")
})

container.append(svg.node())
