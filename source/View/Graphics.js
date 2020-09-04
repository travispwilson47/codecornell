//Data reference:


//HOW THIS WORKS: You input data as to how you want your page to be (single or double) and also which
//subtype the left or right will be, and then the frame inputs the correct framing values to each of the 
//subfunctions, which will take the frame and produce the pictures and return the references that you can use 
//to manipulate everything. 

let ParentFrameTypeEnum = {
    DOUBLE : "double",
    SINGLE : "single"
}
let FrameTypeEnum = {
    MATH_GRAPH : "math",
    CONTINUOUS_GRAPH : "cont",
    GRID_GRAPH : "grid",
    CHART_GRAPH : "chart"
}

let DataChart =  {
    num_rows : 0,
    num_columns : 0,
    space : 50,
    label_rows : [],
    label_columns : [],
}

let DataGridGraph = {
    num_rows : 2,
    num_columns : 2,
    exception_array: [[]],
    is_full: true,
    nodes_size: 0,
    node_shadow_size,
    lines_thickness: '',

}

let DataContinuousGraph = {
    nodes_loc: [[]],
    text_loc: [],
    lines_valid: [[]],
    nodes_size: 0,
    lines_thickness: '',
    nodes_labels: [],
    label_size: '',
    nodes_has_label: false,
    is_directed: false,
    is_double: false
}

let ControlerData = {
    title_text : "",
    second_text : "",
    ButtonTexts : []
}

//Next graph has to be set manually because of length 
let FrameConsts = {
    SINGLE: {INFO_COR: [112.75 + 82, 0.746574], SECOND_COR: [87.75 + 82, 15.426506],
         CONTROL_X: [90, 310], CONTROL_Y : [195, 210], GRAPH_X: [70, 330], GRAPH_Y: [40, 175]},
    DOUBLE: {
        LEFT : {INFO_COR: [103.49885, 7.746574], SECOND_COR: [103.49885, 23.746574],
    CONTROL_X: [20, 190], CONTROL_Y : [190, 220], GRAPH_X: [20, 190], GRAPH_Y: [35, 180]},
        RIGHT: {INFO_COR: [295.49885, 7.746574], SECOND_COR: [295.49885, 23.746574],
            CONTROL_X: [210, 380], CONTROL_Y : [190, 220], GRAPH_X: [210, 380], GRAPH_Y: [35, 180]}}
}

//The size of the frame is between 0 and 400 on the x-axis and 0 and 227 on the y-axis.
let Graph_frame = function(FrameType, Left, Right, Left_Data, Right_Data, rsr){
    let get_graphics_left = function(FrameConsts, Left_Data, rsr){
        switch (Left) {
            case FrameTypeEnum.CONTINUOUS_GRAPH: return Graph_type_continuous(FrameConsts.DOUBLE.LEFT, Left_Data, rsr);
            case FrameTypeEnum.GRID_GRAPH: return Graph_type_grid(FrameConsts.DOUBLE.LEFT, Left_Data, rsr);
            case FrameTypeEnum.CHART_GRAPH: return Graph_chart(FrameConsts.DOUBLE.LEFT, Left_Data, rsr);
        }
    }
    let get_graphics_right = function(FrameConsts, Right_Data, rsr){
        switch (Right) {
            case FrameTypeEnum.CONTINUOUS_GRAPH: return Graph_type_continuous(FrameConsts.DOUBLE.RIGHT, Right_Data, rsr);
            case FrameTypeEnum.GRID_GRAPH: return Graph_type_grid(FrameConsts.DOUBLE.RIGHT, Right_Data, rsr);
            case FrameTypeEnum.CHART_GRAPH: return Graph_chart(FrameConsts.DOUBLE.RIGHT, Right_Data, rsr);
        }
    }
    if (FrameType = ParentFrameTypeEnum.DOUBLE){
        return {Left : get_graphics_left(FrameConsts, Left_Data, rsr), Right : get_graphics_right(FrameConsts, Right_Data, rsr)}
    } else {
        return {Data : get_graphics_left(FrameConsts, Left_Data, rsr)}
    }
}

let ChartFunctions = {
    drawline = function(location1x, location1y, location2x, location2y, shift_x_vec, shift_y_vec){
        var path_str = "M " + location1x + "," + location1y + " " + location2x+ "," + location2y;
          rsr.path(path_str).attr({
                                id: path_str,
                                "font-family": 'Times New Roman',
                                fill: 'none',
                                stroke: "#000000",
                                "stroke-width": '1',
                                "stroke-linecap": 'butt',
                                "stroke-linejoin": 'miter',
                                "stroke-miterlimit": '10',
                                "stroke-dasharray": 'none',
                                "stroke-opacity": '1',
                                }).translate(shift_x_vec, shift_y_vec)
    },
    //chart_height is one third the size of the area
    drawTable = function(chart_width, chart_height, shift_x_vec, shift_y_vec, num_rows, num_columns, start_space, color, type,
        title, font_size, column_labels, row_labels, data){
        var shift = type == "TOP" ? chart_height / 2 : chart_height * 2;
        let delta_x = (chart_width - start_space) / (num_columns);
        let delta_y = chart_height / (num_rows + 1);
        
        let text_x = chart_width / 2
        let text_y = type == "TOP" ? chart_height / 4 : (chart_height * 7) / 4
        var title = rsr.text(text_x, text_y, title).attr("font-size", font_size)
        
        rsr.rect(0, 0 + shift, chart_width, delta_y).attr("fill", color)
            rsr.rect(0, 0 + shift, start_space, chart_height).attr("fill", color)
        var i;
        var sum_x = start_space
        
        for (i = 0; i < num_columns + 1 ;i ++){
            ChartFunctions.drawline(sum_x, 0 + shift, sum_x, chart_height + shift, shift_x_vec, shift_y_vec)
            sum_x = sum_x + delta_x
        }
        var sum_y = delta_y + shift
        for (i = 0; i < num_rows + 1; i ++){
            ChartFunctions.drawline(0, sum_y, chart_width, sum_y, shift_x_vec, shift_y_vec)
            sum_y = sum_y + delta_y
        }
        sum_y = shift
        for (i = 0; i < num_rows + 1; i ++){
            rsr.text(start_space / 2, sum_y + delta_y / 2, row_labels[i]).translate(shift_x_vec, shift_y_vec)
            sum_y = sum_y + delta_y
        }
        sum_x = start_space
        for (i = 0; i < num_columns; i ++){
            rsr.text(sum_x + delta_x / 2, shift + delta_y / 2 , column_labels[i]).translate(shift_x_vec, shift_y_vec)
            sum_x = sum_x + delta_x
        }
        sum_x = start_space
        sum_y = shift + delta_y
        
        var data_graphics = new Array(num_rows).fill(0).map(x => new Array(num_columns).fill(undefined))
        
        var j;
        for (i = 0; i < num_rows; i++){
            for (j = 0; j < num_columns; j++){
                data_graphics[i][j] = rsr.text(sum_x + delta_x / 2, sum_y + delta_y / 2 , data[i][j]).translate(shift_x_vec, shift_y_vec)
            sum_x = sum_x + delta_x
            }
            sum_x = start_space;
            sum_y = sum_y + delta_y
        }
        return {Title: title, Data: data_graphics}
    }
}

let Graph_chart = function(Frame, DataChart){
    default_entry_data = new Array(num_rows).fill([]).map(x => new Array(num_columns).fill(22))
    default_title_1 = "Table 1"
    default_title_2 = "Table 2"
    header_color = "#8E8D8A"
    font_size_title = "15"

    chart_width = Frame.GRAPH_X[1] - Frame.GRAPH_X[0]
    chart_height = Frame.GRAPH_Y[1] - Frame.GRAPH_Y[0]
    shift_x = Frame.GRAPH_X[0]
    shift_y = Frame.GRAPH_Y[0]

    var graphics1 = drawTable(chart_width, chart_height, shift_x, shift_y, DataChart.num_rows, DataChart.num_columns, DataChart.space, header_color,
         "TOP", default_title_1, font_size_title, Data.label_columns, Data.label_rows, default_entry_data)

    var graphics2 = drawTable(chart_width, chart_height, shift_x, shift_y, DataChart.num_rows, DataChart.num_columns, DataChart.space, header_color,
         "Bottom", default_title_2, font_size_title, Data.label_columns, Data.label_rows, default_entry_data)
    return {Title1: graphics1.Title, Title2 : graphics2.Title, Entries1: graphics1.Data, Entries2: graphics2.Data }  
}


//TODO: think about how you want to translate this
let Graph_type_grid = function(Frame, Data, rsr){
    //(rsr, x, y, type, heuristic, part_name_next, special)
    rsr.clear();

    var left_point = Frame.GRAPH_X[0]
    var right_point = Frame.GRAPH_X[1]
    var upper_point = Frame.GRAPH_Y[0]
    var lower_point = Frame.GRAPH_Y[1]
    var horizontal_delta = (right_point - left_point) / (x - 1)
    var vertical_delta = (upper_point - lower_point) / (y - 1)
    var nodes_points = [];
    var radius_circle = Data.nodes_size;
    var radius_shadow = Data.node_shadow_size;
    var i;
    var j;
    var exception_array = Data.exception_array
    for (i = 0; i < y; i ++ ){
        for (j = 0; j < x; j++){
            if (exception_array[i][j] == 1){
                nodes_points.push([left_point + (j * horizontal_delta), lower_point + (i * vertical_delta)]);
            }
        }
    }
    nodes_arr = []
    nodes_points.forEach(function (value, q, array){
        nodes_arr.push(rsr.circle(value[0], value[1], radius_circle).attr({id: 'n' + (q),parent: 'layer2',"font-family": 'Times New Roman',fill: '#e98074',"fill-opacity": '1',stroke: 'none','stroke-width':'1','stroke-opacity':'1',"stroke-width": '0.57',"stroke-miterlimit": '4',"stroke-dasharray": 'none',"stroke-opacity": '1'}).data('id', 'n' + (q)));
    })

    nodes_hitbox_arr = [];
    nodes_points.forEach(function (value, q, array){
        nodes_hitbox_arr.push(rsr.circle(value[0], value[1], radius_shadow).attr({id: 'h' + (q),parent: 'layer2',"font-family": 'Times New Roman',fill: '#e98074',"fill-opacity": '1',stroke: 'none','stroke-width':'1','stroke-opacity':'1',"stroke-width": '0.57',"stroke-miterlimit": '4',"stroke-dasharray": 'none',"stroke-opacity": '1'}).data('id', 'h' + (q)))
        nodes_hitbox_arr[q].attr("opacity", "0")
    })

    lens_arr = new Array(nodes_points.length).fill(0).map(v => new Array(nodes_points.length).fill(0));
    
    var i;
    var j;
    for (i = 0; i < nodes_points.length; i++){
        for (j = i + 1 ; j < nodes_points.length; j++){
            var id_str = "v" + (i + 1) + "-" + (j + 1);

            var location1x = nodes_points[i][0]
            var location1y = nodes_points[i][1]
            var location2x = nodes_points[j][0]
            var location2y = nodes_points[j][1]

            var path_str = "M " + location1x + "," + location1y + " " + location2x+ "," + location2y;

            lens_arr[i][j] = rsr.path(path_str).attr({
                id: id_str,
                parent: 'layer1',
                "font-family": 'Times New Roman',
                fill: 'none',
                stroke: "#000000",
                "stroke-width": '1.1',
                "stroke-linecap": 'butt',
                "stroke-linejoin": 'miter',
                "stroke-miterlimit": '10',
                "stroke-dasharray": 'none',
                "stroke-opacity": '1'
              }).data('id', id_str);
            
            
            lens_arr[i][j].attr("opacity", "0")
        }
    }
    return {Nodes: nodes_arr, NodesShadow: nodes_hitbox_arr, Lens : lens_arr}
}

let ContinuousFunctions = {
    tranform_algorithm = function(minx, miny, maxx, maxy, framex1, framey1, framex2, framey2, locations){
        var c_shift = function (minx, miny, framex, framey){
            var deltaX = framex - minx;
            var deltaY = framey - miny;
            return {X: deltaX, Y: deltaY}
        }
        var c_streach = function (minx, miny, maxx, maxy, framex1, framey1, framex2, framey2){
            var factorX = (maxx - minx) / (framex1 - framex2)
            var factorY = (maxy - miny) / (framey1 - framey2)
            return {X: factorX, Y: factorY}
        }
        var factor_v = c_streach(minx, miny, maxx, maxy, framex1, framey1, framex2, framey2)
        var shift_v = c_shift(minx, miny, framex1, framey1)
        var shift = function(point){
            point[0] = shift_v.X + point[0]
            point[1] = shift_v.Y + point[1]
        }
        var streach = function(point){
            var new_point = [0, 0]
            new_point[0] = (1 / factor_v.X ) * point[0]
            new_point[1] = (1 / factor_v.Y) * point[1]
            return new_point;
        }
        return locations.map(shift).map(streach)
    },
    //TODO: SET ME
    //TODO: Make a layer
    make_nodes = function(nodes_loc, nodes_size){
        var nodes = new Array(nodes_loc.size).fill(undefined)
        var i = 0;
        nodes_loc.forEach(element => {
            nodes[i++] = rsr.circle(element[0], element[1], nodes_size).attr({parent: 'layer1',fill: '#e98074',"fill-opacity": '1',stroke: 'none','stroke-width':'1','stroke-opacity':'1',"stroke-width": '0.79',"stroke-miterlimit": '4',"stroke-dasharray": 'none',"stroke-opacity": '1'})
        })
        return nodes;
    },
    make_node_texts = function(nodes_loc, nodes_labels){
        nodes_texts = new Array(nodes_loc.size).fill(0)
        nodes_labels.forEach(function(value, index, array){
            nodes_texts[index] = rsr.text(nodes_loc[index][0], nodes_loc[index][1], value + "").attr({parent: 'layer1',"font-style": 'normal',"font-weight": 'normal',"font-size": label_size,"line-height": '1.25',"font-family": 'sans-serif',"letter-spacing": '0px',"word-spacing": '0px',fill: normal_stroke_color,"fill-opacity": '1',stroke: 'none','stroke-width':'1','stroke-opacity':'1',"stroke-width": '0.26'});
        })
        return nodes_texts;
    },

    //By default lower to higher is valid if not directed, if not either is valid.
    //This is not enforced, this must be a property of the data
    make_lines = function(double, directed, thickness, nodes_loc){
        var lines = new Array(nodes_loc.length).fill(0).map(x => new Array(nodes_loc.length).fill(undefined))
        var i;
        var j;
        if (double){
            for (i = 0; i < nodes_loc.length; i++){
                for (j = i + 1; j < nodes_loc.length; j++){
                    if (lines_valid[i][j] == true){
                        var location1x = nodes_loc[i][0]
                        var location1y = nodes_loc[i][1]
                        var location2x = nodes_loc[j][0]
                        var location2y = nodes_loc[j][1]

                        var vectorx = location2x - location1x;
                        var vectory = location2y - location1y;
                        var length = Math.sqrt( vectorx * vectorx + vectory * vectory)
                        function rotate_vec(x, y){
                            xprime = x * Math.cos(Math.PI / 2) - y * Math.sin(Math.PI / 2)
                            yprime = x * Math.sin(Math.PI / 2) + y * Math.cos(Math.PI / 2)
                            return {X : xprime, Y : yprime}
                        }
                        var vector = rotate_vec(vectorx / length, vectory / length)

                        //sets a particular (arbitrary) direction for one side of matrix symmetry line
                        if (i > j){
                            location1x = location1x + vector.X
                            location2x = location2x + vector.X
                            location2y = location2y + vector.Y
                            location1y = location1y + vector.Y
                        } else {
                            location1x = location1x - vector.X
                            location2x = location2x - vector.X
                            location2y = location2y - vector.Y
                            location1y = location1y - vector.Y
                        }

                        var path_str = "M " + location1x + "," + location1y + " " + location2x+ "," + location2y;

                        lines[i][j] = rsr.path(path_str).attr({
                            id: id_str,
                            parent: 'layer1',
                            "font-family": 'Times New Roman',
                            fill: 'none',
                            stroke: "#000000",
                            "stroke-width": thickness,
                            "stroke-linecap": 'butt',
                            "stroke-linejoin": 'miter',
                            "stroke-miterlimit": '10',
                            "stroke-dasharray": 'none',
                            "stroke-opacity": '1',
                            "arrow-end": "classic" 
                            })
                    }
                }
            }
        } else
            for (i = 0; i < nodes_loc.length; i++){
                for (j = 0; j < nodes_loc.length; j++){
                    if (lines_valid[i][j] == true){
                        var location1x = nodes_loc[i][0]
                        var location1y = nodes_loc[i][1]
                        var location2x = nodes_loc[j][0]
                        var location2y = nodes_loc[j][1]

                        var path_str = "M " + location1x + "," + location1y + " " + location2x+ "," + location2y;
                        
                        if (directed){
                            lines[i][j] = rsr.path(path_str).attr({
                                id: id_str,
                                parent: 'layer1',
                                "font-family": 'Times New Roman',
                                fill: 'none',
                                stroke: "#000000",
                                "stroke-width": thickness,
                                "stroke-linecap": 'butt',
                                "stroke-linejoin": 'miter',
                                "stroke-miterlimit": '10',
                                "stroke-dasharray": 'none',
                                "stroke-opacity": '1',
                                "arrow-end": "classic" // differing line
                                })
                        } else{
                            lines[i][j] = rsr.path(path_str).attr({
                                id: id_str,
                                parent: 'layer1',
                                "font-family": 'Times New Roman',
                                fill: 'none',
                                stroke: "#000000",
                                "stroke-width": thickness,
                                "stroke-linecap": 'butt',
                                "stroke-linejoin": 'miter',
                                "stroke-miterlimit": '10',
                                "stroke-dasharray": 'none',
                                "stroke-opacity": '1'
                                })
                        }
                    }
                }
            }
        return lines;
    }
}

//References, no point in putting this here except for this reason
//since JS is dynamically typed

let Graph_type_continuous = function(Frame, Data){
    //Send texts and nodes

    let ApplyTransform = function(Frame, locations){
        min_x = Data.locations[0][0]
        min_y = Data.locations[0][1]
        locations.forEach(element => {
        if (element[0] < min_x){
            min_x = element[0]
        }
        if (element[1] < min_y){
            min_y = element[1]
        }
        })
        min_x = Data.locations[0][0]
        min_y = Data.locations[0][1]
        locations.forEach(element => {
            if (element[0] > max_x){
                max_x = element[0]
            }
            if (element[1] > max_y){
                max_y = element[1]
            }
        })
        //function(minx, miny, maxx, maxy, framex1, framey1, framex2, framey2, locations)
        var new_locations = ContinuousFunctions.tranform_algorithm(min_x, min_y,max_x, max_y
        , Frame.GRAPH_X[0], Frame.GRAPH_Y[0], Frame.GRAPH_X[1], Frame.GRAPH_Y[1], locations)
        return new_locations;
    }
    var new_nodes_loc = ApplyTransform(Frame, Data.nodes_loc)

    nodes = ContinuousFunctions.make_nodes(new_nodes_loc, nodes_size)
    node_texts = Data.nodes_has_label ? ContinuousFunctions.make_node_texts(new_nodes_loc, nodes_labels) : undefined
    lines = ContinuousFunctions.make_lines(Data.is_double, Data.lines_directed, Data.lines_thickness, nodes_loc)

    return {Nodes : nodes, Labels : node_texts, Lines : lines}
}


let Controler_type = function(Frame, Data){
    //Next graph has to be et manually because of length 
    //8 spots for a controler on a single, 6 on a double
    var instructxt = rsr.text(Frame.INFO_COR[0], Frame.INFO_COR[1], Data.title_text).attr("font-size", "15")
    var costtxt = rsr.txt(Frame.SECOND_COR[0], Frame.SECOND_COR[1], Data.second_text).attr("font-size", "12")
    
    var Buttons = new Array(ButtonTexts.lengt).fill(0)
    var num_row1_buttons = Math.ceil(Data.ButtonTexts.length / 2)
    var num_row2_buttons = Math.floor(Data.ButtonTexts.length / 2)
    var i;
    var total = Frame.CONTROL_X[0]
    var delta = (Frame.CONTROL_X[1] - Frame.CONTROL_X[0]) / num_row1_buttons
    var shift = delta / 2;
    var q = 0;
    for (i = 0; i < num_row1_buttons ; i ++){
        Buttons[q] = rsr.text(total + shift, Frame.CONTROL_Y[0], Data.ButtonTexts[q])
        q++
        total += delta;
    }
    total = Frame.CONTROL_X[0]
    delta = (Frame.CONTROL_X[1] - Frame.CONTROL_X[0]) / num_row2_buttons
    shift = delta / 2
    for (i = 0; i < num_row2_buttons; i++){
        Buttons[q] = rsr.text(total + shift, Frame.CONTROL_Y[1], Data.ButtonTexts[q])
        q++
        total += delta;
    }
    return {ControlButtons : Buttons, PrimaryText : instructxt, SecondaryText : costtxt}
}
// Graph_type_math(Frame){

// }


