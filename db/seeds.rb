


# Demo User

User.create!({username: "Coleman", password: "password"})
User.create!({username: "Coliath", password: "password"})

# Demo Resource

Resource.create!({
  title: "Eloquent JavaScript",
  sub_title: "A Modern Intoduction to Programming",
  author_name: "Marijn Haverbeke",
  description: "Eloquent JavaScript is a book providing an introduction to the JavaScript programming language and programming in general.",
  topic: "Computer Science",
  user_id: 1
})

# Demo Resource Sections

s1 = Section.create!({
  resource_id: 1,
  title: "Introduction",
  body: "This is the content that would be in the introduction chapter.",
  user_id: 1
})

s2 = Section.create!({
  resource_id: 1,
  title: "Basic JavaScript: values, variables, and control flow",
  body: "This is some more content that will be in this chapter.",
  user_id: 1,
  prev_section_id: s1.id
})

s1.next_section_id = s2.id
s1.save!

s3 = Section.create!({
  resource_id: 1,
  title: "Functions",
  body: "Here is some awesome information about JS functions.",
  user_id: 1,
  prev_section_id: s2.id
})

s2.next_section_id = s3.id
s2.save!

n1 = Note.new({
  section_text: "content that will",
  body: "Im pretty sure this will be on the exam",
  private: true
})

n1.user_id = 2
n1.section_id = 2
n1.resource_id = 1
n1.save!



