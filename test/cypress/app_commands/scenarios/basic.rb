# You can setup your Rails state here
# MyModel.create name: 'something'
User.find_or_create_by(email: "user1@example.com") do |user|
  user.first_name = "User1"
  user.last_name = "User1"
  user.password = "123456"
  user.password_confirmation = "123456"
end

User.find_or_create_by(email: "user2@example.com") do |user|
  user.first_name = "User2"
  user.last_name = "User2"
  user.password = "123456"
  user.password_confirmation = "123456"
end