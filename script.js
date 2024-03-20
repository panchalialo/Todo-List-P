console.log("Script Loaded");

// This is to keep track of the activity
var count = 0;

(() => {
    // declaring the variables that will be used
    let isdelTrue = false;
    const taskCounter = document.getElementById("taskCounter");
    const addButton = document.getElementById("addButton");
    const containerList = document.getElementById("containerList")

    
    // function to display count of activities that are still due
    function taskRemCount(){
        taskCounter.innerText = count;
    }

    // Defining addNewActivity before using it in the event listener
    const addNewActivity = () => {
        console.log("Function Ran, new activity included")

        // Fetching the input given by user
        var newevent = document.getElementById("exampleInput");
        var inputValue = newevent.value.trim(); // Trim to remove leading and trailing spaces

        // If condition will handle empty input in text field.
        if (inputValue === "") {
            console.log("Invalid Input");
        }
        else{
            // Create container for the new activity
            const activityContainer = document.createElement("div");

            const currentDate = new Date();  // Get current date and time
            const formattedTime = currentDate.toLocaleTimeString();  // Format the date as a string

            count++;
            taskRemCount();

            // To display time 
            const leftText = document.createElement("div")
            leftText.className = "leftText";
            leftText.textContent = formattedTime;

            // To display tasks need to be performed
            const middleText = document.createElement("div")
            middleText.className = "middleText";
            middleText.textContent = inputValue;

            // Adding checkbox to keep track of what activites are still due and completed
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "checkBox";

            // Adding checkbox event Listner to the checkbox
            checkbox.addEventListener("change", ()=>{
                if(checkbox.checked){
                    count--;
                    taskRemCount();
                    const image = document.createElement("img");
                    image.src = "Images\\verified.png";
                    image.alt = "Activity Completed";
                    image.className = "activityDone";
                    activityContainer.appendChild(image);
                }
                else {
                    count++;
                    taskRemCount();
                    const existingImage = activityContainer.querySelector(".activityDone");
                    if (existingImage) {
                        existingImage.remove();
                    }
                }
            })

            // Creating a button to delete activity from todo list
            const rightImage = document.createElement("img");
            rightImage.src = "Images\\icons8-bin-64.png";
            rightImage.alt = "-";
            rightImage.className = "rightImage";

            // Event listner for button
            rightImage.addEventListener("click", ()=>{
                if (isdelTrue != true){
                    isdelTrue = true
                activityContainer.classList.add('fadeOut');
                console.log("Delete event triggered");
                activityContainer.addEventListener('animationend', () => {
                    activityContainer.remove();
                    if (!checkbox.checked){
                        count--;
                        taskRemCount();
                    }
                    isdelTrue = false;
                });
            }
            })
        


            // Append elements to the container for the new activity
            activityContainer.appendChild(leftText);
            activityContainer.appendChild(middleText);
            activityContainer.appendChild(checkbox);
            activityContainer.appendChild(rightImage);

            // Set the margin-top for the new activity container
            activityContainer.style.marginTop = "50px";
            activityContainer.style.display = "flex"; 
            activityContainer.style.justifyContent = "space-between";
            activityContainer.style.alignItems = "center";

            // Set the size of the container explicitly
            // activityContainer.style.height = "50px";
            activityContainer.style.boxSizing = "border-box";  // Include border and padding in total width and height

            // Append the container for the new activity to the containerList
            
            containerList.appendChild(activityContainer);

            // Clear input field
            newevent.value = "";
        }
    };

    // trigger events for add buttons
    addButton.addEventListener("click", addNewActivity);
    document.getElementById("exampleInput").addEventListener("keydown", (event)=>{
        if (event.key === "Enter"){
            addNewActivity();
        }
    })
})();
