let check_legal = function(flow_ds, i, j){
    return flow_ds[i - 1][j - 1] == undefined;
}
let check_positive = function(flow_ds, i, j){
    return flow_ds[i- 1][j - 1] > 0;
}
let push_flow = function(flow_ds, edge_list){
    var min = flow_ds[edge_list[0] - 1][edge_list[1] - 1];
    var i;
    var j;
    for (i = 0; i < edge_list.length - 1; i++){
        var flow = flow_ds[edge_list[i] - 1][edge_list[i + 1] - 1];
        if (flow < min){
            min = flow;
        }
    }
    for (i = 0; i < edge_list.length - 1; i++){
        var flow = flow_ds[edge_list[i] - 1][edge_list[i + 1] - 1]-=min;
        var flow = flow_ds[edge_list[i + 1] - 1][edge_list[i] - 1]+=min;
    }
    
    return min;
}