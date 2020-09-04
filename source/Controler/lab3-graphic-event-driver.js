const PART_1_EVENT_NAME = "part 1"
const PART_2A_EVENT_NAME = "part 2a"
const PART_2B_EVENT_NAME = "part 2b"
const PART_3_EVENT_NAME = "part 3"

function basic(){
    restart.click(function (){
        restart_clicked();
    })
    back.click(function (){
        back_clicked();
    })
}

function part2(rsr, canvas, x, y, norm, next_part_name){
    Graph_Grid(rsr, x, y, norm, mode_heur_type_enum.FURTHEST_INSERTION, next_part_name);
    basic();

    nearest_neighbor_g.click(function (){
        nn_clicked()
    })
    random_insertion_g.click(function (){
        ri_clicked()
    })
    nearest_insertion_g.click(function (){
        ni_clicked()
    })
    furthest_insertion_g.click(function (){
        fi_clicked()
    })
    augment.click(function(){
        restart_clicked();
        brenda_mode = false;
    })
    insert.click(function(){
        restart_clicked();
        brenda_mode = true;
    })
}
function part2a(rsr, canvas){
    part2(rsr, canvas, 6, 8, metric_type_enum.MANHATTAN, "Part 2b: 9 x 9 Grid");
    next_part.click(function (){
        restart_clicked()
        canvas.dispatchEvent(new CustomEvent(PART_2B_EVENT_NAME, {
            detail : null
        }));
    })
}
function part2b(rsr, canvas){
    part2(rsr, canvas, 9, 9, metric_type_enum.EUCLIDIAN, "Part 3: Two opt")
    next_part.click(function (){
        restart_clicked()
        canvas.dispatchEvent(new CustomEvent(PART_3_EVENT_NAME, {
            detail : null
        }));
    })
}

function part3(rsr, canvas){
    Graph_two_opt(rsr);

    basic();

    optimize.click(function (){
        if (is_end){
            toss = mode_heur_type_enum.TWOOPT;
            text_event(text_event_type_enum.TWOOPTSTART);
            is_end = false;
        }
    })

    next_part.click(function (){
        restart_clicked()
        canvas.dispatchEvent(new CustomEvent(PART_1_EVENT_NAME, {
            detail : null
        }));
    })
}

function part1(rsr, canvas){
    //instructxt.attr("text", "part 3");
    Graph_Beyonce(rsr)

    nodes_hitbox_arr.forEach(element => {
        element.click(function (){
            node_clicked(element);
        })
    });

    basic();
    next_part.click(function (){
        restart_clicked()
        canvas.dispatchEvent(new CustomEvent(PART_2A_EVENT_NAME, {
            detail : {norm : metric_type_enum.EUCLIDIAN, x : 9, y : 9 }
        }));
    })
}