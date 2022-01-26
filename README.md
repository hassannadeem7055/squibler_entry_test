# squibler_entry_test

#   Requirements
1. Django ver 4+
2. Python3
3. MongoDB ver 5+
4. Node ver 16+
5. Angular

#   Steps to run
1. To run Angular frontend, go to "task" folder and run "ng serve"
2. To run Django backend, go to "backend" folder and run "python3 manage.py runserver"
3. Please make sure "mongod" (MongoDB) is running as a service
4. All development was done in linux

#   The frontend
1. To create Sections, type section name into the text field and click "createsection" button
2. To update section, click on section you wish to update, type the new name in text field and click update
3. To delete a section, click on the section you wish to delete, and then click deletesection button
4. To create subsection of a section, click on section, type name for new section into text field, and press create section.

#   Note
Backend uses DJANGO with MongoDB as the database. The reason for choosing MongoDB was the hierarchical nature of data.
