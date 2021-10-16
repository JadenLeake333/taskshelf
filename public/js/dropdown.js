const makeCollapse = () => {
    var collapse = document.getElementsByClassName("collapsible");
    console.log(collapse.length)
    for (let i = 0; i < collapse.length; i++) {
      collapse[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
      });
    } 
}

makeCollapse()