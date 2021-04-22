showData();

function showData() {
    d3.json('samples.json').then(data=>{
        var names = data.names;
        names.forEach(name => {
            d3.select('select').append('option').text(name)
        });
    });
    createCharts();
};

function optionChanged() {
    createCharts();
};

function createCharts() {
    d3.json('samples.json').then(data=>{
        var selection = d3.select('select').node().value;
        console.log(data);

        var meta = data.metadata.filter(obj=>obj.id == selection)[0];
        var sample = data.samples.filter(obj=>obj.id == selection)[0];

        d3.select('.panel-body').html('')
        Object.entries(meta).forEach(([key,val])=>{
            d3.select('.panel-body').append('h5').text(key.toUpperCase()+': '+val)

        });

        console.log(sample);

        var data = [
            {
              x: sample.sample_values.slice(0,10).reverse(),
              y: sample.otu_ids.slice(0,10).reverse().map(x=>'OTU ' + x),
              type: 'bar',
              orientation: 'h'
            }
          ];
          
          Plotly.newPlot('bar', data);
    });
};

