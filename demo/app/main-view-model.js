var Observable = require("data/observable").Observable;

function getMessage(counter) {
    if (counter <= 0) {
        localStorage.clear();
        console.log("Length", localStorage.length);
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        console.log("Length", localStorage.length);
        return counter + " taps left";
    }
}

function createViewModel() {
    var viewModel = new Observable();
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