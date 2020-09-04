var flow_ds;
var path;

let node_hover = function(node, hitbox){
    hitbox.hover(function(){
        select_node_visual(node);
    },
    function(){
        deselect_node_visual(node);
    })
}

let node_click_handle = function(node, hitbox){
    hitbox.click(function(){
        node_clicked(node);
    })
}

let deselect = function(){
    path = [1];
    select_only_source_visual(right_nodes)
}

let init = function(){
    default_capacity.foreach(function(value,index, array){
        element.foreach(function(value1, index1, array1){
            flow_ds[index][index1] = value1;
        })
    })
    //text event reset
    //all texts restart.
    //lens and nodes visual reset

}
foward_check;

let reset = function(){
    init()
}

let node_clicked = function(Node){
    var node_val = parseInt(node.data("id"));
    if (!check_legal(flow_ds, path[path.length - 1], node_val)){
        //text event
    } else if (!check_positive(flow_ds, path[path.length - 1], node_val)) {
        //
    } else {
        if (node_val == num_nodes){
            path_complete();
        }
    }
}

let path_complete = function(){
    var pushed = push_flow(flow_ds, path)
    path = [1];
    //text event with flow ammount;
    //highlight only source;
}