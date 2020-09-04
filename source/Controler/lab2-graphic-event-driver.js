const PART_1_EVENT_NAME = "part 1"

let nodes_function = function(hitbox,index, array){
    var node = nodes[index];
    node_hover(node, hitbox);
    node_click_handle(node, hitbox);
}

let basic = function(){

    //TODO: add in all these functions that I need /will use
    //into data ops, load in all the libraries, and replace these out.
    standard_hover(deselect_button);
    standard_hover(swap_button);
    standard_hover(restart_button);
    reset();
    left_nodes_hitboxes.forEach(nodes_function)
    right_nodes_hitboxes.forEach(nodes_function)
    
    restart_button.click( function () {reset()})
    deselect_button.click(function() {deselect()});

}

let part1 = function(rsr, canvas){
    Graph1(rsr);
    basic()
}