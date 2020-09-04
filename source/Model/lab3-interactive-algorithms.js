//Heuristics
const extreme_type_enum = {"MIN": "min", "MAX" : "max"};
var last_index = 0;

function opt2(distance_map, visited){
    var i;
    var j;
    for (i = 0; i < visited.length - 1 ; i++){
        var pair1a = visited[i] 
        var pair1b = visited[i + 1]
        var distance1 = distance_map(pair1a, pair1b)
        for (j = i + 2; j < visited.length - 1; j++){
                var pair2a = visited[j] 
                var pair2b = visited[j + 1]
                var distance2 = distance_map(pair2a, pair2b)
                var distance3 = distance_map(pair1a, pair2a)
                var distance4 = distance_map(pair1b, pair2b)
                if (distance1 + distance2 > distance3 + distance4){
                    var section1 = visited.slice(0, i + 1)
                    var section2 = visited.slice(i + 1, j + 1);
                    var section3 = visited.slice(j + 1, visited.length);
                    visited =  section1.concat(section2.reverse(), section3);
                    return {"visited" : visited, "old_index" : i, "new_index" : j}
                }
        }
        if (i > 0 && i != visited.length - 2){
            var pair2a = visited[visited.length - 1] 
            var pair2b = visited[0]
            var distance2 = distance_map(pair2a, pair2b)
            var distance3 = distance_map(pair1a, pair2a)
            var distance4 = distance_map(pair1b, pair2b)
            if (distance1 + distance2 > distance3 + distance4){
                var section1 = visited.slice(0, i + 1)
                var section2 = visited.slice(i + 1, j + 1);
                var section3 = visited.slice(j + 1, visited.length);
                visited = section1.concat(section2.reverse())
                return {"visited" : visited, "old_index" : i, "new_index" : -1}
            }
        }
    }
    return {"visited" : visited, "old_index" : -2, "new_index" : -2}
}
function undo_alg(){
    unvisited.splice(last_index, 0, visited[visited.length - 1])
    visited.splice(visited.length - 1, 1);
}
function get_one(){
    return 1;
}

function get_random_int(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function random_tour(visited, unvisited){
    var index  = get_random_int(unvisited.length);
    var value = unvisited[index]
    last_index = index
    unvisited.splice(index, 1);
    visited.push(value);
    return value;
}

function nearest_neihbor(distance_map, visited, unvisited){
    var recent_node = visited[visited.length -1];
    var min_value = distance_map(recent_node, unvisited[0])
    var min = unvisited[0]
    var min_index = 0;
    unvisited.forEach(function (element, index, array) {
        var distance = distance_map(recent_node, element);
        if (distance < min_value){
            min_value = distance;
            min = element
            min_index = index
        }
    });
    last_index = min_index
    unvisited.splice(min_index, 1)
    visited.push(min);
    return min;
}

function extreme_insertion(distance_map, visited, unvisited, type){
    var i;
    var j;
    var extreme_value = distance_map(visited[0], unvisited[0])
    var extreme = unvisited[0]
    var extreme_index = 0;
    for (i =0 ;  i < visited.length; i ++){
        for (j =0; j < unvisited.length; j ++){
            var distance = distance_map( unvisited[j], visited[i]);
            var cond = type == extreme_type_enum.MIN ? distance < extreme_value : distance > extreme_value
            if (cond){
                extreme_value = distance;
                extreme = unvisited[j];
                extreme_index = j;
            }
        }
    }
    last_index = extreme_index
    unvisited.splice(extreme_index, 1)
    visited.push(extreme);
    return extreme;
}

function nearest_insertion(distance_map, visited, unvisited){
    return extreme_insertion(distance_map, visited, unvisited, extreme_type_enum.MIN)
}

function furthest_insertion(distance_map, visited, unvisited){
    return extreme_insertion(distance_map, visited, unvisited, extreme_type_enum.MAX)
}

function nearest_insertion_place(distance_map, visited, unvisited){
    var node_last = visited[visited.length - 1];
    visited.pop();
    var min_distance_sum = distance_map(node_last, visited[0]) + distance_map(visited[visited.length - 1], node_last)
    var prev_distance = 0;
    var min_distance_index = -1;
    var i;
    for (i = 0; i < visited.length - 1; i++){
        var val = distance_map(visited[i], node_last) + distance_map(visited[i + 1], node_last)
        var val2 = distance_map(visited[i], visited[i + 1]);
        if (val < min_distance_sum) {
            min_distance_sum = val;
            min_distance_index = i;
            prev_distance = val2;
        }
    }
    if (min_distance_index == -1){
        visited.push(node_last);
        min_distance_sum = distance_map(visited[visited.length - 1], visited[visited.length - 2])
    } else{
        visited.splice(min_distance_index, 0, node_last);
        min_distance_sum = min_distance_sum - prev_distance;
    }
    return min_distance_sum;

}

module.exports = {opt2}