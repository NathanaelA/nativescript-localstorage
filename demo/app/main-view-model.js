var Observable = require("data/observable").Observable;

function getMessage(counter) {
    if (counter <= 0) {
        localStorage.clear();
        //console.log("Length", localStorage.length);
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        console.log("Length", localStorage.length);
        return counter + " taps left";
    }
}

function createViewModel() {
    var viewModel = new Observable();
    var test = localStorage.getItem("test");
    console.log("Test", test);

    localStorage.setItemObject("test", {a: 1, b: 2});
    var test = localStorage.getItem("test");
    console.log("Test2", test);
    viewModel.counter = localStorage.getItem("counter") || 42;
    viewModel.message = getMessage(viewModel.counter);

    viewModel.onTap = function() {
        this.counter--;
        localStorage.setItem("counter", this.counter);
        this.set("message", getMessage(this.counter));
    }

    return viewModel;
}

exports.createViewModel = createViewModel;