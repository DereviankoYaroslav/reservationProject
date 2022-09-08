window.addEventListener('load', () => {

    //database
    let reservedSeats = {
        record1: {
            seat: 'b19',
            owner: {
                fname: 'Joe',
                lname: 'Smith'
            }
        },
        record2: {
            seat: 'b20',
            owner: {
                fname: 'Joe',
                lname: 'Smith'
            }
        },
        record3: {
            seat: 'b21',
            owner: {
                fname: 'Joe',
                lname: 'Smith'
            }
        },
        record4: {
            seat: 'b22',
            owner: {
                fname: 'Joe',
                lname: 'Smith'
            }
        },
        record5: {
            seat: 'f87',
            owner: {
                fname: 'Joe',
                lname: 'Smith'
            }
        }
    }
  
    //genegate seat cols and rows function
    function makeRows (sectionLength, rowLength, placement){
        const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'];

        let html = '';
        counter = 1;

        rows.forEach((row) => {
            switch (placement){
                case 'left':  html += `<div class="label">${row.toUpperCase()}</div>`; break;
                case 'right': counter += (rowLength-sectionLength); break;
                default: counter += (rowLength-sectionLength)/2; break;
            }

            for (let j = 0; j < sectionLength; j++){
                html += `<div class="a" id="${row + counter}">${counter}</div>`;
                counter++;
            }

            switch (placement){
                case 'left':  counter += (rowLength-sectionLength); break;
                case 'right': html += `<div class="label">${row.toUpperCase()}</div>`; break;
                default: counter += (rowLength-sectionLength)/2; break;
            }

            
        });
        document.getElementById(placement).innerHTML = html;
    }

    //genegate seat cols and rows
    makeRows(3,15,'left');
    makeRows(3,15,'right');
    makeRows(9,15,'middle');

  
    //Retreiving data from DB v1
    /* for (let i = 0; i < Object.keys(reservedSeats).length; i++){
        let mySeat = document.getElementById(Object.values(reservedSeats)[i].seat);
        mySeat.className = 'r';
        mySeat.innerHTML = 'R';
    } */

    //Retreiving data from DB v2
    for (const key in reservedSeats){
        if (reservedSeats.hasOwnProperty(key)){
            let mySeat = document.getElementById(reservedSeats[key].seat);
            mySeat.className = 'r';
            mySeat.innerHTML = 'R';
        }
    }

    //change seat to selected v1
    let pushed = [];
    let seats = document.querySelectorAll('#seating .a');
    seats.forEach(item => {
        item.addEventListener('click', () => {
            seatSelectionProcess(item.id);
        });
    });

    //change seat to selected function v1
    /* function seatSelectionProcess(item){
        item.className = 's';
        if (pushed.includes(item.id)) {
            pushed.splice(pushed.indexOf(item.id));
            item.className = 'a';
        } else {
        pushed.push(item.id);
        pushed = [...new Set(pushed)];
        }
        console.log(pushed);
    } */

    //change seat to selected v2

    //change seat to selected function v2
    function seatSelectionProcess(item){

        if(!document.getElementById(item).classList.contains('r')){
        let index = pushed.indexOf(item);
        if (index > -1){
            pushed.splice(index, 1);
            document.getElementById(item).className = 'a';
        } else {
            pushed.push(item);
            document.getElementById(item).className = 's';
        }
        manageConfirmForm();
        }
    } 

    //working with form
    let myReserve = document.getElementById('reserve');
    myReserve.addEventListener('click', (e) => {
        document.getElementById('resform').style.display = 'block';
        e.preventDefault();
    });

    document.getElementById('cancel').addEventListener('click', (e) => {
        document.getElementById('resform').style.display = 'none';
        e.preventDefault();
    });

    //0 seats situation
    function manageConfirmForm(){
        if (pushed.length == 0){
            document.getElementById('confirmres').style.display = 'none';
            document.getElementById('selectedseats').innerHTML = '<p>You need to select some seats to reserve.<br><a href="#" id="error">Close</a> this dialog box and pick at least one seat</p>';
            document.getElementById('error').addEventListener('click', (e) => {
                document.getElementById('resform').style.display = 'none';
                e.preventDefault();
            });
        } else {
            document.getElementById('confirmres').style.display = 'block';
            let selectedSeats = pushed.toString().toUpperCase().replace(/,/g, ', ').replace(/,(?=[^,]*$)/, ' and');
            document.getElementById('selectedseats').innerHTML = `You have selected seat(s): ${selectedSeats}`;
        }
    }
    
    manageConfirmForm();

    //reservation processing function
    function reservationProcess(){
        let records = Object.keys(reservedSeats).length;
        let fname = document.getElementById('fname').value;
        let lname = document.getElementById('lname').value;
        let counter = 1;
        let nextRecord = '';
        pushed.forEach((item) => {
            document.getElementById(item).className = 'r';
            document.getElementById(item).innerHTML = 'R';
            nextRecord = `record${records+counter}`;
            reservedSeats[nextRecord] = {
                seat:item,
                owner:{
                    fname:fname,
                    lname:lname
                }
            };
            counter++;
        });
    }

    //onsubmit
    let myForm = document.getElementById('confirmres');
    myForm.addEventListener('submit', (e) => {
        reservationProcess();
        e.preventDefault();
        let message = document.createElement('p');
        message.id = 'my-message';
        message.innerHTML = "RESERVATION SUCCESSFUL!";
        document.getElementById('resform').appendChild(message);
        setTimeout(function(){
            document.getElementById('resform').style.display = 'none';
            let removeElem = document.getElementById('my-message');
            removeElem.remove();
            //clean up
            pushed = [];
            manageConfirmForm();
            const fields = document.querySelectorAll('.data');
            fields.forEach((element) => {
            element.value = '';
    });
        }, 2000);
        console.log(reservedSeats);
        let myjson = JSON.stringify(reservedSeats);
    });

    
});