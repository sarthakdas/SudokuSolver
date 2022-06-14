import fc from "fast-check";
import solver from "../solver.js";
import property from "./property.js";

// This test intentionally has a bug in it that you should fix.
// There is also a jslint error which should give a hint.

const arb_row = fc.set( fc.integer({min: 1, max: 9}),
                        {minLength: 9, maxLength: 9});
const arb_row_dup = fc.int8Array( fc.integer({min: 1, max: 9}),
                        {minLength: 9, maxLength: 9});
// const describe = (x) => x

describe("solver.rowGood function", function () {

    property(
        "all rows must add up to 45",
        [arb_row],
        function(arb_row){
            // return((arb_sodoku.reduce((a, b) => a + b, 0) === 45) &&
            //  (solver.rowsGood(arb_row)))
            let addUP = null;
            let total = arb_row.reduce((a, b) => a + b, 0);


            if(total === 45){
                addUP = true;
            }else{
                addUP = false;
            }


            let checker = solver.rowsGood([arb_row]);

            if(addUP === checker){
                return true;
            }else{
                return false;
            }


        }
    );

});

const arb_2x2Array = fc.set( fc.set(fc.integer({min: 1, max: 9}),
                {minLength: 9, maxLength: 9}), {minLength: 9, maxLength: 9});

describe("solver.transpose function", function() {

    property(
        "transpose it twice will result should result in the same item",
        [arb_2x2Array],
        function(arb_2x2Array){
            if ((arb_2x2Array).toString() ===
            (solver.transpose(solver.transpose(arb_2x2Array))).toString()){
                return true;
            }else{
                return false;
            }
        }
    );
});

describe("solver.boardValid function", function() {

    property(
        "the total numbers on the board must add up to 45*9",
        [arb_2x2Array],
        function(arb_2x2Array){
            const arrSum = (array) =>
                array.reduce((sum, num) => sum +
                (Array.isArray(num) ? arrSum(num) : num * 1),0
            );
            if((arrSum === (45*9)) && (solver.validBoard(arb_2x2Array))){
                return true;
            }
        }
    );
});
