const btnCompute = document.querySelector(".btn-compute");

btnCompute.addEventListener("click", function compute(event) {
  event.preventDefault();

  const length = document.querySelector(".ipt-length").value;
  const weight = document.querySelector(".ipt-weight").value;
  if (weight < length * 0.9) {
    document.querySelector(".message").innerHTML = "Underweight";
  } else if (length < weight + weight * 0.1) {
    document.querySelector(".message").innerHTML = "Overweight";
  } else if (weight >= length * 0.9 && length + length * 0.1 >= weight) {
    document.querySelector(".message").innerHTML = "Optimal weight";
  } else {
    document.querySelector(".message").innerHTML = "something incorrect";
  }
  console.log(length, weight);
});
console.log("kjghjd");
