alert("Click part 2a to go to next part (depending on your screen, you might have to scroll down)")
var visited;
var opt_mode = 0;
var unvisited;
var is_start = true;
var is_end = false;
var next_node;
var nodes_in = [];
var total_cost = 0;
var old_index;
var new_index;

var cache;

function nn_clicked(){  
    change_heur(mode_heur_type_enum.NEAREST_NEIGHBOR)
    restart_ops()
}
function ri_clicked(){
    change_heur(mode_heur_type_enum.RANDOM)
    restart_ops()
}
function ni_clicked(){
    change_heur(mode_heur_type_enum.NEAREST_INSERTION)
    restart_ops()
}
function fi_clicked(){
    change_heur(mode_heur_type_enum.FURTHEST_INSERTION)
    restart_ops()
}

function node_clicked(node){
    manual(get_node_hitbox_id(node));
}
function foward_clicked(){
    if (mode == mode_type_enum.BEYONCE){
    } else if(toss == mode_heur_type_enum.TWOOPT){
        opt();
    } else{
        automatic()
    }
}

function restart_clicked(){
    restart_ops();
}

function start_automatic(){
    is_start = false;
    is_end = false;
    visited = [1];
    unvisited = new Array(num_nodes).fill(0);
    unvisited.forEach(function (value, index, array) {
        array[index] = index + 1
    });
    unvisited.splice(0, 1)
    accept(1);
}
function start_automatic_2(){
    is_start = false;
    is_end = false;
    visited = [1, 2];
    unvisited = new Array(num_nodes).fill(0);
    unvisited.forEach(function (value, index, array) {
        array[index] = index + 1
    });
    unvisited.splice(0, 1)
    accept(1);
    unvisited.splice(0, 1)
    accept(2);
}

function back_clicked(){
    if (is_end){
        return
    }
    if (nodes_in.length > 2 || (nodes_in.length > 1 && toss == mode_heur_type_enum.NEAREST_INSERTION
        || toss == mode_heur_type_enum.MANUAL || toss == mode_heur_type_enum.RANDOM)){
            total_cost -= distance_map(nodes_in[nodes_in.length - 2], nodes_in[nodes_in.length - 1]);
            total_cost -= distance_map(nodes_in[nodes_in.length - 1], nodes_in[0])
            total_cost += distance_map(nodes_in[nodes_in.length - 2], nodes_in[0])
            change_cost_graphic(total_cost);
            lens_and_nodes_graphics(nodes_in, len_function_type_enum.UNSELECT);
            nodes_in.pop();
            lens_and_nodes_graphics(nodes_in, len_function_type_enum.SELECT);
            text_event(text_event_type_enum.BACK)
            undo_alg()
    }
}

function automatic(){
    if (!is_end){
        if (is_start){
            if (toss == mode_heur_type_enum.NEAREST_INSERTION){
                start_automatic_2();
            } else{
                start_automatic();
            }
        }
        var mode_heur = toss;
        if (mode_heur == mode_heur_type_enum.RANDOM){
            next_node = random_tour(visited, unvisited);
        } else if (mode_heur == mode_heur_type_enum.NEAREST_INSERTION){
            next_node = nearest_insertion(distance_map, visited, unvisited)
        } else if (mode_heur == mode_heur_type_enum.FURTHEST_INSERTION){
            next_node = furthest_insertion(distance_map, visited, unvisited)
        } else if (mode_heur == mode_heur_type_enum.NEAREST_NEIGHBOR){
            next_node = nearest_neihbor(distance_map, visited, unvisited)
        }
        accept(next_node);
    }
}
function manual(node){
    if (!is_element_in_set(node, nodes_in)){
        accept(node);
    } else{
        reject(node);   
    }
}
function opt(){
    if (opt_mode == 0){
        cache = visited.slice();
        var ret = opt2(distance_map, visited);
        //visited = ret.visited;
        old_index = ret.old_index;
        new_index = ret.new_index;
        highlight_opt(old_index, new_index, visited);
        visited = ret.visited
        opt_mode = 1;
    } else {
        unhighlight_opt(old_index, new_index, cache)
        var flag = true;
        visited.forEach(function(value, index, array){
            if (value != cache[index]){
                flag = false;
            }
        })
        if (flag){
            text_event(text_event_type_enum.TWOOPT)
        }
        opt_set_ops();
        opt_mode = 0;
    }
}
//set things to be the new graphic, but you still can't interact
function opt_set_ops(){
    lens_and_nodes_graphics(nodes_in, len_function_type_enum.UNSELECT);
    nodes_in = []
    total_cost = 0
    visited.forEach(element => {
        nodes_in.push(element)
    })
    var i;
    for (i = 0; i < nodes_in.length - 1; i++){
        total_cost += distance_map(nodes_in[i], nodes_in[i + 1]);
    }
    change_cost_graphic(total_cost)
    lens_and_nodes_graphics(nodes_in, len_function_type_enum.SELECT)

}
function restart_ops(){
    opt_mode = 0;
    brenda_mode = false;
    lens_and_nodes_graphics(nodes_in, len_function_type_enum.UNSELECT);
    is_start = true;
    is_end = false;
    nodes_in = [];
    total_cost = 0;
    change_cost_graphic(total_cost)
    text_event(text_event_type_enum.NEW);
}
function accept(node){
    nodes_in.push(node)
    if (nodes_in.length > 1){
        if (brenda_mode){
            total_cost += nearest_insertion_place(distance_map, visited, unvisited);
            lens_and_nodes_graphics(nodes_in, len_function_type_enum.UNSELECT);
            nodes_in = visited.slice();
        } else{
            total_cost += distance_map(nodes_in[nodes_in.length - 2], nodes_in[nodes_in.length - 1]);
        }
        total_cost -= distance_map(nodes_in[0], nodes_in[nodes_in.length - 2])
        total_cost += distance_map(nodes_in[0], nodes_in[nodes_in.length - 1])
        change_cost_graphic(total_cost);
    }

    if (nodes_in.length == num_nodes){
        text_event(text_event_type_enum.FINISH)
        is_end = true;
    } else {
        text_event(text_event_type_enum.ACCEPT)
    }
    lens_and_nodes_graphics(nodes_in, len_function_type_enum.SELECT);
}
function reject(node){
    reject_animation(node, nodes_in)
    text_event(text_event_type_enum.REJECT)
}


