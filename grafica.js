google.charts.load('current', { 'packages': ['corechart'], 'language': 'es' });
google.charts.setOnLoadCallback(drawChart);
var firstClick = 0;
var secondClick = 0;
var graphData = [
    ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
        'Western', 'Random', 'Random', 'Random', 'Random', 'Random', 'Random', 'Random'],
    ['2010', 10, 24, 20, 32, 18, 150, 15, 18, 90, 2, 15, 60],
    ['2020', 16, 22, 23, 30, 16, 150, 15, 18, 90, 2, 15, 20],
    ['2020', 16, 22, 23, 30, 16, 150, 15, 18, 90, 2, 15, 20],
    ['2020', 16, 22, 23, 30, 16, 150, 15, 18, 90, 2, 15, 20],
    ['2020', 16, 22, 23, 30, 16, 150, 15, 18, 90, 2, 15, 20],
    ['2020', 16, 22, 23, 30, 16, 150, 15, 18, 90, 2, 15, 20],
    ['2020', 16, 22, 23, 30, 16, 150, 15, 18, 90, 2, 15, 20],
    ['2020', 16, 22, 23, 30, 16, 150, 15, 18, 90, 2, 15, 20],
    ['2030', 28, 19, 29, 30, 12, 150, 15, 18, 10, 2, 15, 2]
]
function drawChart() {
    var data = new google.visualization.arrayToDataTable(graphData);
    var view = new google.visualization.DataView(data);
    var columns = [];
    for (var i = 0; i < graphData[0].length; i++) {
        columns.push(i);
    }

    //Calcular el total de cada columna
    columns.push(
        {
            calc: function (dataTable, rowNum) {
                let total = 0;
                for (let index = 1; index < columns.length - 1; index++) {
                    total += dataTable.getValue(rowNum, index)
                }
                return total;
            },
            type: "number",
            role: "annotation"
        }
    )

    view.setColumns(columns);

    var options = {
        title: 'Publicaciones por fecha',
        backgroundColor: 'transparent',
        legend: {
            position: 'top',
            maxLines: 3
        },
        bar: { groupWidth: '75%' },
        isStacked: true,
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(view, options);



    google.visualization.events.addListener(chart, 'click', function () {
        var date = new Date();
        var millis = date.getTime();
        var contenido = 'Se han seleccionado ';
        if (millis - secondClick > 1000) {
            setTimeout(function () {
                if (secondClick == 0) {
                    contenido += data.getValue(chart.getSelection()[0].row, chart.getSelection()[0].column)
                        + ' ' + data.getColumnLabel(chart.getSelection()[0].column) + ' del año ' +
                        data.getValue(chart.getSelection()[0].row, 0);
                    document.getElementById('item-selected').innerHTML = contenido;
                }
            }, 125);
        }

        if (millis - firstClick < 250) {
            firstClick = 0;
            secondClick = millis;
            var pathname = window.location.pathname;
            var url = window.location.href;
            console.log('pathname', pathname)
            console.log('url', url)
            console.log(url.split(pathname)[0])
            window.open(url.split(pathname)[0] +
                '/simple-search?location=publications&query=&filter_field_1=itemtype&filter_type_1=authority&filter_value_1='
                + data.getColumnLabel(chart.getSelection()[0].column)
                + '&filtername=dateIssued&filtertype=equals&filterquery='
                + data.getValue(chart.getSelection()[0].row, 0)
                + '&rpp=10&sort_by=score&order=desc');
        } else {
            firstClick = millis;
            secondClick = 0;
        }
    });

}

$(window).resize(function () {
    drawChart();
});
