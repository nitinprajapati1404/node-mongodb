## QUICKSTART
Postman setup has been classfied in following steps
1. Pre-Requisite
2. steps

1. Pre-Requisite
    - Step 1 : Need to create student A
    - Step 2 : Need to create student B
    - Step 3 : Need to create Dean A
    - Step 4 : Need to create Dean B
    - Step 5 : Generate Sessions Of Deans
    - NOTE : if want remove all sessions then you can call removeAllSessions after that you need to call again step 5 :

2. All Required Steps to Perform
    Step 1 : Login with Student A
    Step 2 : Check availability of Session for Student A With Dean A
    Step 3 : Book Slot For Student A With Daan A
    Step 4 : Check availability of Session WIth Dean B for Student A
    Step 5 : Book Slot For Student B With Daan A
    Step 6 : Login Dean A
    Sept 7 : Check Booked Sessions of Dean A
    Step 8 : Login Student B
    Step 9 : Check availability of Session WIth Dean B for Student B
    Step 10 : Book Slot For Student B With Daan B
    Step 11 : Login Dean B
    Sept 12 : Check Booked Sessions of Dean B
    Sept 13 : Update Manual 
    Sept 14 : Check Booked Sessions of Dean B Copy

DO let me know if any more understanding needed

P.S. all required info are managed through Postman Enviorement Variables!
ex. URL = http://localhost:5351/api/v1/
and AuthToken, DEANA, DEANB etc are managed dynamically and used in next respect request!

Kindly please create one Enviorement and set URL according your server!!

