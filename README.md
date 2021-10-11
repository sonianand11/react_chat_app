# Instruction to install

- Download the application git clone git@github.com:sonianand11/react_chat_app.git
- run following command
-  `bundle install`
-  `rake db:create db:migrate`
-  `rails s`
- Navigate to http://localhost:3000 in browser

# Instruction to run test cases
- Run following commands
-   `RAILS_ENV=test rake db:create db:migrate`
-   `RAILS_ENV=test rails s -p 5017`
-   in new terminal tab `yarn cypress open --project ./test`
-   above command will open cypress window, click to timesheets_spec.js file