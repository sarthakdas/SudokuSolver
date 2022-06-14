const Handler = Object.create(null);
import solver from "./solver.js";

Handler.solve = function (request_object) {
    return Promise.resolve({
        "type": request_object.solver,
        "sudoku": solver.solve(request_object.sudoku)
    });
};

export default Object.freeze(Handler);