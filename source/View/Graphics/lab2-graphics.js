var nodes_center1;
var nodes_center2;
var len_data1;
var len_data2;
var len_value1_1;
var len_value1_2;
var len_value2;

var deselect_button;
var swap_button;
var restart_button;

var left_texts ;
var right_texts_backward ;
var right_texts_foward ;
var left_lines ;
var right_lines ;
var num_nodes ;

var left_nodes ;
var right_nodes ;
var left_nodes_hitboxes;
var right_nodes_hitboxes;

var foward_check;
var default_capacity;


let Graph1 = function(rsr){
    //Graph has nodes, lens, 6 buttons, and a next_text, clickboxes on nodes and lens

    // node labels?
    nodes_center1 = [
        [0, 1],
        [1, 0],
        [2, 0],
        [3, 1],
        [3, 2],
        [2, 2],
        [1, 2]
    ]
    
    
    nodes_center1.forEach(function(value, index, array) {
        array[index][0] = array[index][0] * 6;
        array[index][1] = array[index][1] * 6;
    });

    nodes_center2 = [
        [0, 1],
        [1, 0],
        [2, 0],
        [3, 1],
        [3, 2],
        [2, 2],
        [1, 2]
    ]
    nodes_center2.forEach(function(value, index, array) {
        array[index][0] = array[index][0] * 6;
        array[index][1] = array[index][1] * 6;
    });

    

    len_data1 = new Array(nodes_center1.length).fill([]).map(x => new Array(nodes_center1.length).fill(false));
    
    len_data1[0][1] = true;
    len_data1[1][2] = true;
    len_data1[2][3] = true;
    len_data1[0][6] = true;
    len_data1[6][5] = true;
    len_data1[5][4] = true;
    len_data1[4][3] = true;
    len_data1[5][3] = true;
    len_data1[2][5] = true;
    len_data1[1][5] = true;
    len_data1[1][6] = true;

    

    len_data2 = new Array(nodes_center1.length).fill([]).map(x => new Array(nodes_center1.length).fill(false));
    len_data2[0][1] = true;
    len_data2[1][2] = true;
    len_data2[2][3] = true;
    len_data2[0][6] = true;
    len_data2[6][5] = true;
    len_data2[5][4] = true;
    len_data2[4][3] = true;
    len_data2[5][3] = true;
    len_data2[2][5] = true;
    len_data2[1][5] = true;
    len_data2[1][6] = true;


    len_data2[1][0] = true;
    len_data2[2][1] = true;
    len_data2[3][2] = true;
    len_data2[6][0] = true;
    len_data2[5][6] = true;
    len_data2[4][5] = true;
    len_data2[3][4] = true;
    len_data2[3][5] = true;
    len_data2[5][2] = true;
    len_data2[5][1] = true;
    len_data2[6][1] = true;
    
    

    len_value1_1 = new Array(nodes_center1.length).fill([]).map(x => new Array(nodes_center1.length).fill(undefined));
    len_value1_1[0][1] = 0;
    len_value1_1[1][2] = 0;
    len_value1_1[2][3] = 0;
    len_value1_1[0][6] = 0;
    len_value1_1[6][5] = 0;
    len_value1_1[5][4] = 0;
    len_value1_1[4][3] = 0;
    len_value1_1[5][3] = 0;
    len_value1_1[2][5] = 0;
    len_value1_1[1][5] = 0;
    len_value1_1[1][6] = 0;


    len_value1_2 = new Array(nodes_center1.length).fill([]).map(x => new Array(nodes_center1.length).fill(undefined));
    len_value1_2[0][1] = 6;
    len_value1_2[1][2] = 3;
    len_value1_2[2][3] = 1;
    len_value1_2[0][6] = 6;
    len_value1_2[6][5] = 7;
    len_value1_2[5][4] = 5;
    len_value1_2[4][3] = 4;
    len_value1_2[5][3] = 4;
    len_value1_2[2][5] = 1;
    len_value1_2[1][5] = 3;
    len_value1_2[1][6] = 1;

    len_value2 = new Array(nodes_center1.length).fill([]).map(x => new Array(nodes_center1.length).fill(undefined));

    len_value2[0][1] = "0 / 6";
    len_value2[1][2] = "0 / 3";
    len_value2[2][3] = "0 / 1";
    len_value2[0][6] = "0 / 6";
    len_value2[6][5] = "0 / 7";
    len_value2[5][4] = "0 / 5";
    len_value2[4][3] = "0 / 4";
    len_value2[5][3] = "0 / 4";
    len_value2[2][5] = "0 / 1";
    len_value2[1][5] = "0 / 3";
    len_value2[1][6] = "0 / 1";

    
    
    
    let obtain_graphics = function(rsr){

        



        //refactor below

        
        //TODO: get rid of secondary text 
        //TODO: fix graphics to have everything I need

        text_vector_left = new Array(nodes_center1.length).fill([]).map(x => new Array(nodes_center1.length).fill(undefined));
        text_vector_right = new Array(nodes_center1.length).fill([]).map(x => new Array(nodes_center1.length).fill(undefined));

        
        text_vector_left[0][1] = [ 2, -4]
        text_vector_left[1][2] = [ 3, -1]
        text_vector_left[2][3] = [ 4, 2.5]
        text_vector_left[0][6] = [ 2, 3.5]
        text_vector_left[6][5] = [ 3, 1]
        text_vector_left[5][4] = [ 3, 1]
        text_vector_left[4][3] = [ 1, -3]
        text_vector_left[5][3] = [ 3, -2]
        text_vector_left[2][5] = [ -1, 4]
        text_vector_left[1][5] = [ 2, 7]
        text_vector_left[1][6] = [ -1, 4]

        text_vector_right[0][1] = [2, -3 ,3, -2]
        text_vector_right[1][2] = [3, -0.5 ,3, 1 ]
        text_vector_right[2][3] = [3, 2, 2, 3.5  ]
        text_vector_right[0][6] = [3, 2, 2, 3 ]
        text_vector_right[6][5] = [3, -0.5,3, 0.5]
        text_vector_right[5][4] = [3, -0.5,3, 0.5]
        text_vector_right[4][3] = [-0.5, -3,0.5, -3]
        text_vector_right[5][3] = [3, -4,3, -2]
        text_vector_right[2][5] = [0.75, 6,-0.75, 6.3]
        text_vector_right[1][5] = [3, 4,1.5, 5]
        text_vector_right[1][6] = [0.5, 7,-0.5, 7]

        

        len_texts_right1 = new Array(nodes_center1.length).fill([]).map(x => new Array(nodes_center1.length).fill(undefined));
        len_texts_right2 = new Array(nodes_center1.length).fill([]).map(x => new Array(nodes_center1.length).fill(undefined));
        len_texts_left = new Array(nodes_center1.length).fill([]).map(x => new Array(nodes_center1.length).fill(undefined));


        text_vector_left.forEach(function(row, x, arrayrow){
            row.forEach(function(item, y, array){
                if (item != undefined){
                    len_texts_left[x][y] = [item[0] + nodes_center1[x][0], item[1] + nodes_center1[x][1]]
                }
            })
        })

        
        text_vector_right.forEach(function(row,x, arrayrow){
            row.forEach(function(item, y, array){
                if (item != undefined){
                    len_texts_right1[x][y] = [item[0] + nodes_center1[x][0], item[1] + nodes_center1[x][1]]
                }
            })
        })
        

        text_vector_right.forEach(function(row,x, arrayrow){
            row.forEach(function(item, y, array){
                if (item != undefined){
                    len_texts_right2[x][y] = [item[2] + nodes_center1[x][0], item[3] + nodes_center1[x][1]]
                }
            })
        })

        

        

        buttons1 = [] 
        buttons2 = [
            "Deselect",
            "Swap",
            "Restart"
        ]
        next_graph = "Swap Graph"
        primary_text = "Click the first node to start!"
        secondary_text = ""
        next_text = ""
        
        var i= 0;
        var node_labels_data = new Array(nodes_center1.length).fill(0).map(x => "" + (++i) )

        

        let graph1 = {
            nodes_loc: nodes_center1,
            text_label_data : len_value2,
            text_loc: [],
            line_labels: len_texts_left,
            lines_valid: len_data1,
            text_label_size : "5",
            nodes_size: 3,
            lines_thickness: '2',
            nodes_labels: node_labels_data,
            label_size: '3',
            nodes_has_label: true,
            line_has_label: true,
            lines_directed: true,
            is_double: false
        }

        

        let controler1 = {
            title_text : primary_text,
            second_text : secondary_text,
            next_text : next_graph,
            ButtonTexts : buttons1
        }

        

        let data_l = {
            Graph : graph1,
            Controler : controler1
        }

        

        let graph2 = {
            nodes_loc: nodes_center2,
            text_label_data : len_value1_1,
            text_label_data2 : len_value1_2,
            text_loc: [],
            line_labels: len_texts_right1,
            line_labels2: len_texts_right2,
            lines_valid: len_data2,
            text_label_size : "5",
            nodes_size: 3,
            lines_thickness: '2',
            nodes_labels: node_labels_data,
            label_size: '3',
            nodes_has_label: true,
            line_has_label: true,
            lines_directed: true,
            is_double: true
        }

        

        let controler2 = {
            title_text : primary_text,
            second_text : secondary_text,
            next_text : next_graph,
            ButtonTexts : buttons2
        }
        let data_r = {
            Graph : graph2,
            Controler : controler2
        }

        

        return Graph_Data(ParentFrameTypeEnum.DOUBLE, FrameTypeEnum.FLOW_GRAPH, FrameTypeEnum.FLOW_GRAPH, data_l , data_r, rsr)
    }
    var graphics = obtain_graphics(rsr);
    var graphics_left = graphics.Left;
    var graphics_right = graphics.Right;
    var right_controler = graphics_right.Controler
    var right_graphic = graphics_right.Graph;
    var left_graphic = graphics_left.Graph;
    deselect_button = right_controler.ControlButtons[0];
    swap_button = right_controler.ControlButtons[1];
    restart_button = right_controler.ControlButtons[2];
    
    primary_text = right_controler.PrimaryText;
    //now for all the edges and the texts;
    left_texts = left_graphic.LineTexts;
    right_texts_backward = right_graphic.LineTexts;
    right_texts_foward = right_graphic.LineTexts2;

    left_lines = left_graphic.Lines;
    right_lines = right_graphic.Lines;
    num_nodes = 7;
    left_nodes = left_graphic.Nodes;
    right_nodes = right_graphic.Nodes;
    left_nodes_hitboxes = left_graphic.NodeHitboxes;
    right_nodes_hitboxes = right_graphic.NodeHitboxes;

    //this ds stores all the values of the capacities at start
    //if you want to get the actual len, then it is intuitive. If you want to get the actual text, then 
    //you need to use the foward numbering on the backwards texts

    default_capacity = new Array(num_nodes).fill([]).map(x => new Array(num_nodes).fill(undefined));

    foward_check[0][1] = true;
    foward_check[1][2] = true;
    foward_check[2][3] = true;
    foward_check[0][6] = true;
    foward_check[6][5] = true;
    foward_check[5][4] = true;
    foward_check[4][3] = true;
    foward_check[5][3] = true;
    foward_check[2][5] = true;
    foward_check[1][5] = true;
    foward_check[1][6] = true;


    default_capacity[0][1] = 0;
    default_capacity[1][2] = 0;
    default_capacity[2][3] = 0;
    default_capacity[0][6] = 0;
    default_capacity[6][5] = 0;
    default_capacity[5][4] = 0;
    default_capacity[4][3] = 0;
    default_capacity[5][3] = 0;
    default_capacity[2][5] = 0;
    default_capacity[1][5] = 0;
    default_capacity[1][6] = 0;

    default_capacity[0][1] = 6;
    default_capacity[1][2] = 3;
    default_capacity[2][3] = 1;
    default_capacity[0][6] = 6;
    default_capacity[6][5] = 7;
    default_capacity[5][4] = 5;
    default_capacity[4][3] = 4;
    default_capacity[5][3] = 4;
    default_capacity[2][5] = 1;
    default_capacity[1][5] = 3;
    default_capacity[1][6] = 1;

    alert("done")
}