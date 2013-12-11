


# Demo User

User.create!({username: "Coleman", password: "password"})
User.create!({username: "Coliath", password: "password"})

# Demo Resource

r1 = Resource.new({
  title: "Eloquent JavaScript",
  sub_title: "A Modern Intoduction to Programming",
  author_name: "Marijn Haverbeke",
  description: "Eloquent JavaScript is a book providing an introduction to the JavaScript programming language and programming in general.",
  topic: "Computer Science"
})

r1.user_id = 1
r1.save!

# Demo Resource Sections

s1 = Section.new({
  resource_id: 1,
  title: "Introduction",
  body: "This is the content that would be in the introduction chapter."
})
s1.user_id = 1
s1.save!

s2 = Section.new({
  resource_id: 1,
  title: "Basic JavaScript: values, variables, and control flow",
  body: "This is some more content that will be in this chapter.",
  prev_section_id: s1.id
})
s2.user_id = 1
s2.save!

s1.next_section_id = s2.id
s1.save!

s3 = Section.new({
  resource_id: 1,
  title: "Functions",
  body: "Here is some awesome information about JS functions.",
  prev_section_id: s2.id
})
s3.user_id = 1
s3.save!

s2.next_section_id = s3.id
s2.save!

n1 = Note.new({
  section_text: "content that will",
  body: "Im pretty sure this will be on the exam",
  private: true,
  section_id: 2,
  resource_id: 1
})
n1.user_id = 2
n1.save!



