/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
**/

var search = function(nums, target){
    let start = 0;
    let end = nums.length - 1;
    while (start <= end ) {
        let mid = Math.floor((start + end) /2);
        if (nums[mid] == target) {
            return mid; // Target found
        } else if (nums[mid] < target) {
            start = mid + 1; //  Search in the right half
        } else {
            end = mid -1; //  Search in the left half
        }
    }
    return -1 //  Target not found
}

search([-1, 0,  3, 5,  9], 9); // 4
