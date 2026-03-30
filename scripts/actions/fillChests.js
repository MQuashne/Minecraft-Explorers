//entry point: user taps on chest
//pass in; chest, gamestate, render

//Change slot css to percentages!!!

//------------
//DECLARATIOMS
//------------

/*modal
card info
action buttons
mob row
inventory
*/

//----------
//Chest fill modal
//----------


//get info about what it needs and what it already has 

//create instructions div

//show chest in card-info

//add dropdowns for item categories waiting to be filled (with none option)
//add listener to enable fill button if one of them is not none (add selected item to array and count length? or just how many aren't none  

//add fill button, only enabled if at least one dropdown doesn't say none.  Show cost.

//add back button

//-----------------
//Fill Button Listener
//-----------------

//Remove item from inventory
//add item to chest filled array
//charge one hunger
//change lastActionTaken
//update card visual to back or with cover boxes

//Check for full

//if not full, show pop up that additional fills are free with "ok" button?

//back to board

//otherwise...

//-------------
//ChestConplete
//-------------

//check win condition
//if win, do win stuff

//otherwise change chest card to back - fix render logic so those don't get a listener.
//bring mob select to the top, just copy over the crossbow logic here.
//show free stuff pop up
//back to board.